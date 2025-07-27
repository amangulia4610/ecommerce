import mongoose from 'mongoose';
import OrderModel from './models/order.model.js';
import ProductModel from './models/product.model.js';
import UserModel from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const testOrderCreation = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Find a test user and products
    const testUser = await UserModel.findOne();
    const testProducts = await ProductModel.find().limit(3);
    
    if (!testUser || testProducts.length === 0) {
      console.log('No test user or products found. Please ensure you have users and products in your database.');
      return;
    }
    
    console.log(`Creating test order for user: ${testUser.name}`);
    console.log(`Using products: ${testProducts.map(p => p.name).join(', ')}`);
    
    // Create a test order with multiple items
    const orderItems = testProducts.map((product, index) => ({
      productId: product._id,
      product_details: {
        name: product.name,
        image: product.image,
        price: product.price
      },
      quantity: index + 1, // 1, 2, 3 quantities
      price: product.price,
      subTotal: product.price * (index + 1)
    }));
    
    const totalAmount = orderItems.reduce((sum, item) => sum + item.subTotal, 0);
    
    const testOrder = new OrderModel({
      userId: testUser._id,
      orderId: `TEST-${Date.now()}`,
      items: orderItems,
      subTotalAmt: totalAmount,
      totalAmt: totalAmount,
      payment_method: 'COD',
      delivery_status: 'Placed'
    });
    
    const savedOrder = await testOrder.save();
    console.log('Test order created successfully:');
    console.log(`Order ID: ${savedOrder.orderId}`);
    console.log(`Total Items: ${savedOrder.items.length}`);
    console.log(`Total Amount: ${savedOrder.totalAmt}`);
    
    // Fetch the order with populated data
    const populatedOrder = await OrderModel.findById(savedOrder._id)
      .populate('items.productId', 'name price')
      .populate('userId', 'name email');
    
    console.log('\nPopulated order data:');
    console.log(`User: ${populatedOrder.userId.name} (${populatedOrder.userId.email})`);
    console.log('Items:');
    populatedOrder.items.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.productId.name} - Qty: ${item.quantity} - Subtotal: ${item.subTotal}`);
    });
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    mongoose.disconnect();
  }
};

testOrderCreation();
