import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Old order schema for migration
const oldOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'user' },
  orderId: { type: String, required: true, unique: true },
  productId: { type: mongoose.Schema.ObjectId, ref: "product" },
  product_details: {
    name: String,
    image: Array,
  },
  paymentId: { type: String, default: "" },
  payment_status: { type: String, default: "pending" },
  delivery_status: { type: String, enum: ['Placed', 'In Transit', 'Delivered'], default: 'Placed' },
  payment_method: { type: String, enum: ['COD', 'Online'], default: 'COD' },
  quantity: { type: Number, default: 1 },
  delivery_address: { type: mongoose.Schema.ObjectId, ref: 'address' },
  subTotalAmt: { type: Number, default: 0 },
  totalAmt: { type: Number, default: 0 },
  invoice_receipt: { type: String, default: "" }
}, { timestamps: true });

// New order schema
const newOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'user' },
  orderId: { type: String, required: true, unique: true },
  items: [{
    productId: { type: mongoose.Schema.ObjectId, ref: "product", required: true },
    product_details: {
      name: String,
      image: Array,
      price: Number
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    subTotal: { type: Number, required: true }
  }],
  paymentId: { type: String, default: "" },
  payment_status: { type: String, default: "pending" },
  delivery_status: { type: String, enum: ['Placed', 'In Transit', 'Delivered'], default: 'Placed' },
  payment_method: { type: String, enum: ['COD', 'Online'], default: 'COD' },
  delivery_address: { type: mongoose.Schema.ObjectId, ref: 'address' },
  subTotalAmt: { type: Number, default: 0 },
  totalAmt: { type: Number, default: 0 },
  invoice_receipt: { type: String, default: "" }
}, { timestamps: true });

const migrateOrders = async () => {
  try {
    await connectDB();
    
    console.log('Starting order migration...');
    
    // Get the orders collection
    const ordersCollection = mongoose.connection.db.collection('orders');
    
    // Find all existing orders
    const existingOrders = await ordersCollection.find({}).toArray();
    
    console.log(`Found ${existingOrders.length} existing orders to migrate`);
    
    if (existingOrders.length === 0) {
      console.log('No orders to migrate. Exiting...');
      process.exit(0);
    }
    
    // Group orders by userId, orderId, and creation time to identify orders that should be combined
    const orderGroups = {};
    
    for (const order of existingOrders) {
      // If order already has 'items' field, skip it (already migrated)
      if (order.items) {
        console.log(`Order ${order.orderId} already migrated, skipping...`);
        continue;
      }
      
      const key = `${order.userId}_${order.orderId}`;
      
      if (!orderGroups[key]) {
        orderGroups[key] = [];
      }
      
      orderGroups[key].push(order);
    }
    
    console.log(`Found ${Object.keys(orderGroups).length} unique orders to process`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (const [key, orders] of Object.entries(orderGroups)) {
      try {
        if (orders.length === 0) continue;
        
        // Use the first order as the base
        const baseOrder = orders[0];
        
        // Create items array from all orders in this group
        const items = orders.map(order => ({
          productId: order.productId,
          product_details: {
            name: order.product_details?.name || '',
            image: order.product_details?.image || [],
            price: order.subTotalAmt && order.quantity ? (order.subTotalAmt / order.quantity) : 0
          },
          quantity: order.quantity || 1,
          price: order.subTotalAmt && order.quantity ? (order.subTotalAmt / order.quantity) : 0,
          subTotal: order.subTotalAmt || 0
        }));
        
        // Calculate totals
        const totalAmt = items.reduce((sum, item) => sum + (item.subTotal || 0), 0);
        const subTotalAmt = totalAmt;
        
        // Create the new order document
        const newOrder = {
          ...baseOrder,
          items,
          subTotalAmt,
          totalAmt,
          // Remove old fields
          productId: undefined,
          product_details: undefined,
          quantity: undefined
        };
        
        // Remove undefined fields
        Object.keys(newOrder).forEach(key => {
          if (newOrder[key] === undefined) {
            delete newOrder[key];
          }
        });
        
        // Update the order in database
        await ordersCollection.replaceOne(
          { _id: baseOrder._id },
          newOrder
        );
        
        // Delete additional orders if there were multiple
        if (orders.length > 1) {
          const additionalOrderIds = orders.slice(1).map(order => order._id);
          await ordersCollection.deleteMany({
            _id: { $in: additionalOrderIds }
          });
          console.log(`Combined ${orders.length} separate orders into one order: ${baseOrder.orderId}`);
        }
        
        migratedCount++;
        
      } catch (error) {
        console.error(`Error migrating order group ${key}:`, error);
        skippedCount++;
      }
    }
    
    console.log(`Migration completed!`);
    console.log(`- Migrated: ${migratedCount} orders`);
    console.log(`- Skipped: ${skippedCount} orders`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Run migration
migrateOrders();
