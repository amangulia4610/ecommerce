import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CategoryModel from './server/models/category.model.js';

dotenv.config();

// Predefined categories for the ecommerce store
const categories = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop"
  },
  {
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
  },
  {
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
  },
  {
    name: "Tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"
  },
  {
    name: "Smartwatches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop"
  },
  {
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop"
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop"
  },
  {
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
  },
  {
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop"
  },
  {
    name: "Decor",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop"
  },
  {
    name: "Appliances",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"
  },
  {
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
  },
  {
    name: "Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
  },
  {
    name: "Outdoor Gear",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop"
  },
  {
    name: "Books & Media",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"
  },
  {
    name: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop"
  },
  {
    name: "Games",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=400&fit=crop"
  },
  {
    name: "Beauty & Health",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
  }
];

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

async function setupCategories() {
  try {
    await connectDB();
    
    // Clear existing categories (optional)
    // await CategoryModel.deleteMany({});
    
    // Insert categories
    const result = await CategoryModel.insertMany(categories);
    console.log(`✅ Successfully created ${result.length} categories!`);
    
    // Display categories with their IDs
    console.log('\n📁 Categories created:');
    result.forEach(category => {
      console.log(`- ${category.name} (ID: ${category._id})`);
    });
    
  } catch (error) {
    if (error.code === 11000) {
      console.log('📁 Categories already exist, fetching existing ones...');
      const existingCategories = await CategoryModel.find({});
      console.log('\n📁 Existing categories:');
      existingCategories.forEach(category => {
        console.log(`- ${category.name} (ID: ${category._id})`);
      });
    } else {
      console.error('❌ Error setting up categories:', error);
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

setupCategories();
