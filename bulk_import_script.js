import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from './server/models/product.model.js';
import CategoryModel from './server/models/category.model.js';
import fs from 'fs/promises';

dotenv.config();

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

// Get category IDs by names (helper function)
async function getCategoryIdsByNames(categoryNames) {
  const categories = await CategoryModel.find({
    name: { $in: categoryNames }
  });
  return categories.map(cat => cat._id);
}

// Create categories if they don't exist
async function ensureCategoriesExist(categoryNames) {
  const existingCategories = await CategoryModel.find({
    name: { $in: categoryNames }
  });
  
  const existingNames = existingCategories.map(cat => cat.name);
  const missingNames = categoryNames.filter(name => !existingNames.includes(name));
  
  if (missingNames.length > 0) {
    console.log(`📁 Creating missing categories: ${missingNames.join(', ')}`);
    
    for (const name of missingNames) {
      await CategoryModel.create({
        name: name,
        image: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop` // Default category image
      });
    }
  }
  
  return await CategoryModel.find({
    name: { $in: categoryNames }
  });
}

// Bulk import products
async function bulkImportProducts() {
  try {
    await connectDB();
    
    // Read the products data
    const productsData = JSON.parse(
      await fs.readFile('./bulk_products_data.json', 'utf8')
    );
    
    console.log(`📦 Found ${productsData.length} products to import`);
    
    // Collect all unique category names
    const allCategoryNames = [...new Set(
      productsData.flatMap(product => product.categories || [])
    )];
    
    // Ensure all categories exist
    if (allCategoryNames.length > 0) {
      await ensureCategoriesExist(allCategoryNames);
    }
    
    // Process each product
    const processedProducts = [];
    
    for (const productData of productsData) {
      try {
        // Convert category names to ObjectIds if provided as names
        let categoryIds = [];
        if (productData.categories && Array.isArray(productData.categories)) {
          categoryIds = await getCategoryIdsByNames(productData.categories);
        } else if (productData.category && Array.isArray(productData.category)) {
          // If already ObjectIds, use them directly
          categoryIds = productData.category;
        }
        
        const processedProduct = {
          name: productData.name,
          image: productData.image || [],
          category: categoryIds,
          unit: productData.unit || 'piece',
          stock: productData.stock || 0,
          price: productData.price || 0,
          discount: productData.discount || 0,
          description: productData.description || '',
          more_details: productData.more_details || {},
          publish: productData.publish !== undefined ? productData.publish : true
        };
        
        processedProducts.push(processedProduct);
        
      } catch (productError) {
        console.error(`❌ Error processing product "${productData.name}":`, productError.message);
      }
    }
    
    // Insert all products
    if (processedProducts.length > 0) {
      const result = await ProductModel.insertMany(processedProducts);
      console.log(`✅ Successfully imported ${result.length} products!`);
      
      // Display summary
      console.log('\n📊 Import Summary:');
      result.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
      });
    } else {
      console.log('❌ No valid products to import');
    }
    
  } catch (error) {
    console.error('❌ Bulk import failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Execute the import
bulkImportProducts();
