# AI Web Scraping Prompt for Product Data

## Instructions for AI Tool:
Please search the web and find products in the following categories, then format them according to the JSON structure below. 

## Categories to Search:
- Electronics (smartphones, laptops, tablets, smartwatches)
- Fashion (clothing, shoes, accessories)
- Home & Garden (furniture, decor, appliances)
- Sports & Outdoors (fitness equipment, outdoor gear)
- Books & Media (books, movies, games)

## Required JSON Format:
```json
[
  {
    "name": "Product Name Here",
    "image": [
      "https://image-url-1.jpg",
      "https://image-url-2.jpg"
    ],
    "categories": [
      "Electronics",
      "Smartphones"
    ],
    "unit": "piece",
    "stock": 50,
    "price": 299.99,
    "discount": 10,
    "description": "Brief product description (2-3 sentences)",
    "more_details": {
      "brand": "Brand Name",
      "model": "Model Number",
      "key_feature_1": "Value",
      "key_feature_2": "Value",
      "specifications": "Technical specs if applicable"
    },
    "publish": true
  }
]
```

## Guidelines:
1. **Name**: Use actual product names from real websites
2. **Images**: Find high-quality product images (preferably from Unsplash or similar)
3. **Categories**: Use logical category names (Electronics, Fashion, Home, etc.)
4. **Stock**: Random numbers between 10-100
5. **Price**: Use realistic market prices
6. **Discount**: Random percentage between 0-25%
7. **Description**: Write compelling product descriptions
8. **More Details**: Include relevant specifications for each product type

## Example Categories to Create:
- "Electronics"
- "Smartphones" 
- "Laptops"
- "Fashion"
- "Clothing"
- "Shoes"
- "Home & Garden"
- "Furniture"
- "Sports"
- "Books"

Please generate 20-50 products across these categories with realistic data.
