import mongoose from 'mongoose';
import ProductModel from './server/models/product.model.js';
import CategoryModel from './server/models/category.model.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.log('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Product data to upload
const productData = [
  {
    "name": "Fitbit Charge 6",
    "image": ["https://placehold.co/600x600/4CAF50/ffffff?text=Fitbit+Charge+6", "https://placehold.co/600x600/8BC34A/ffffff?text=Charge+6+Display"],
    "categories": ["Wearable Technology", "Fitness Bands"],
    "unit": "piece",
    "stock": 250,
    "price": 159.95,
    "discount": 15,
    "description": "A market-leading fitness tracker with a slim design, AMOLED touchscreen, and 7-day battery life. It integrates Google Maps, Google Wallet, and YouTube Music controls.",
    "more_details": {
      "brand": "Fitbit (owned by Google)",
      "model": "Charge 6",
      "key_feature_1": "Built-in GPS and 40+ exercise modes",
      "key_feature_2": "ECG app and EDA sensor for stress tracking",
      "specifications": "7-day battery life, SpO2 and skin temperature monitoring, Heart Rate broadcast to gym equipment."
    },
    "publish": true
  },
  {
    "name": "Garmin Vivosmart 5",
    "image": ["https://placehold.co/600x600/2196F3/ffffff?text=Vivosmart+5", "https://placehold.co/600x600/64B5F6/ffffff?text=Vivosmart+Side"],
    "categories": ["Wearable Technology", "Fitness Bands"],
    "unit": "piece",
    "stock": 180,
    "price": 149.99,
    "discount": 10,
    "description": "A slim, lightweight band-style tracker with a focus on comprehensive health metrics. It features a brighter, 66% larger OLED screen than its predecessor, a 7-day battery life, and tracks steps, heart rate, stress, blood oxygen (Pulse Ox), and sleep stages.",
    "more_details": {
      "brand": "Garmin",
      "model": "Vivosmart 5",
      "key_feature_1": "Body Battery™ energy monitoring",
      "key_feature_2": "Pulse Ox blood oxygen sensor",
      "specifications": "7-day battery life, tracks steps, heart rate, stress, and sleep stages. Uses connected GPS."
    },
    "publish": true
  },
  {
    "name": "Whoop 4.0",
    "image": ["https://placehold.co/600x600/1a1a1a/ffffff?text=Whoop+4.0", "https://placehold.co/600x600/333333/ffffff?text=Whoop+Band"],
    "categories": ["Wearable Technology", "Fitness Bands", "Subscription Service"],
    "unit": "piece",
    "stock": 120,
    "price": 239.00,
    "discount": 0,
    "description": "A screenless, minimalist tracker designed for 24/7 wear, focusing on recovery, strain, and sleep. It provides in-depth analysis and coaching through its app.",
    "more_details": {
      "brand": "Whoop",
      "model": "4.0",
      "key_feature_1": "Subscription-based deep data analysis",
      "key_feature_2": "Screenless design for non-intrusive wear",
      "specifications": "Focuses on recovery, strain, and sleep metrics. Includes slide-on battery pack for continuous charging."
    },
    "publish": true
  },
  {
    "name": "Fitbit Inspire 3",
    "image": ["https://placehold.co/600x600/FF5722/ffffff?text=Inspire+3", "https://placehold.co/600x600/FF8A65/ffffff?text=Inspire+Side"],
    "categories": ["Wearable Technology", "Fitness Bands"],
    "unit": "piece",
    "stock": 300,
    "price": 99.95,
    "discount": 20,
    "description": "An entry-level tracker ideal for beginners. It features a color AMOLED touchscreen, 10-day battery life, and tracks essential metrics like activity, sleep, and heart rate.",
    "more_details": {
      "brand": "Fitbit (owned by Google)",
      "model": "Inspire 3",
      "key_feature_1": "10-day battery life",
      "key_feature_2": "SpO2 and skin temperature sensors",
      "specifications": "Color AMOLED touchscreen, connected GPS, tracks activity, sleep, and heart rate."
    },
    "publish": true
  },
  {
    "name": "Amazfit Band 7",
    "image": ["https://placehold.co/600x600/E91E63/ffffff?text=Amazfit+Band+7", "https://placehold.co/600x600/F06292/ffffff?text=Amazfit+Display"],
    "categories": ["Wearable Technology", "Fitness Bands"],
    "unit": "piece",
    "stock": 450,
    "price": 49.99,
    "discount": 5,
    "description": "A budget-friendly option with an impressive feature set for its price. It boasts a large 1.47-inch AMOLED display, 12-28 day battery life, 5 ATM water resistance, and built-in Amazon Alexa.",
    "more_details": {
      "brand": "Amazfit",
      "model": "Band 7",
      "key_feature_1": "Built-in Amazon Alexa",
      "key_feature_2": "120+ sports modes",
      "specifications": "1.47-inch AMOLED display, 12-28 day battery life, 5 ATM water resistance, tracks HR, SpO2, stress, and sleep."
    },
    "publish": true
  },
  {
    "name": "Xiaomi Smart Band 8",
    "image": ["https://placehold.co/600x600/FF9800/ffffff?text=Xiaomi+Band+8", "https://placehold.co/600x600/FFB74D/ffffff?text=Xiaomi+Pebble"],
    "categories": ["Wearable Technology", "Fitness Bands"],
    "unit": "piece",
    "stock": 600,
    "price": 45.00,
    "discount": 10,
    "description": "An extremely popular budget tracker, the Smart Band 8 features a 1.62-inch AMOLED display, up to 16-day battery life (typical use), and over 150 sports modes.",
    "more_details": {
      "brand": "Xiaomi",
      "model": "Smart Band 8",
      "key_feature_1": "Pebble Mode for detailed running metrics",
      "key_feature_2": "150+ sports modes",
      "specifications": "1.62-inch AMOLED display, 16-day battery life, all-day heart rate, SpO2, and sleep monitoring."
    },
    "publish": true
  },
  {
    "name": "Oura Ring Gen 3",
    "image": ["https://placehold.co/600x600/795548/ffffff?text=Oura+Ring", "https://placehold.co/600x600/A1887F/ffffff?text=Oura+Top"],
    "categories": ["Wearable Technology", "Smart Rings", "Subscription Service"],
    "unit": "piece",
    "stock": 110,
    "price": 299.00,
    "discount": 0,
    "description": "A unique, screenless smart ring that excels at sleep and recovery tracking. It's designed for users who want health insights without the distractions of a wrist-worn screen.",
    "more_details": {
      "brand": "Oura",
      "model": "Gen 3",
      "key_feature_1": "Advanced sleep and recovery tracking",
      "key_feature_2": "Screenless, discreet design",
      "specifications": "Tracks sleep stages, readiness, activity levels, and body temperature. Requires subscription for full features."
    },
    "publish": true
  },
  {
    "name": "Samsung Galaxy Fit3",
    "image": ["https://placehold.co/600x600/673AB7/ffffff?text=Galaxy+Fit3", "https://placehold.co/600x600/9575CD/ffffff?text=Fit3+Screen"],
    "categories": ["Wearable Technology", "Fitness Bands"],
    "unit": "piece",
    "stock": 280,
    "price": 59.22,
    "discount": 0,
    "description": "Positioned as a direct competitor to the Fitbit Inspire 3, but for Android users. It features a large touchscreen, up to two weeks of battery life, and tracks over 100 workout types.",
    "more_details": {
      "brand": "Samsung",
      "model": "Galaxy Fit3",
      "key_feature_1": "Android only",
      "key_feature_2": "Tracks over 100 workout types",
      "specifications": "Large touchscreen, up to two weeks of battery life, impressive sleep tracking and workout insights."
    },
    "publish": true
  },
  {
    "name": "Garmin Forerunner 965",
    "image": ["https://placehold.co/600x600/00BCD4/ffffff?text=Forerunner+965", "https://placehold.co/600x600/4DD0E1/ffffff?text=Forerunner+Face"],
    "categories": ["Wearable Technology", "Smartwatches", "Fitness Bands"],
    "unit": "piece",
    "stock": 90,
    "price": 599.99,
    "discount": 5,
    "description": "A high-end fitness tracker disguised as a smartwatch, aimed at serious athletes and data enthusiasts. It features a brilliant AMOLED display, exceptional battery life, and provides a wealth of advanced training metrics.",
    "more_details": {
      "brand": "Garmin",
      "model": "Forerunner 965",
      "key_feature_1": "Advanced training metrics (Training Readiness, HRV Status)",
      "key_feature_2": "Brilliant AMOLED display",
      "specifications": "Top-tier GPS and heart rate accuracy, exceptional battery life, running dynamics."
    },
    "publish": false
  },
  {
    "name": "Garmin Forerunner 165",
    "image": ["https://placehold.co/600x600/8BC34A/ffffff?text=Forerunner+165", "https://placehold.co/600x600/AED581/ffffff?text=Forerunner+Side"],
    "categories": ["Wearable Technology", "Smartwatches", "Fitness Bands"],
    "unit": "piece",
    "stock": 150,
    "price": 249.99,
    "discount": 10,
    "description": "An entry-level running watch that offers a suite of powerful features for runners, including VO2 max, performance insights, and Body Battery energy monitoring.",
    "more_details": {
      "brand": "Garmin",
      "model": "Forerunner 165",
      "key_feature_1": "VO2 max and performance insights",
      "key_feature_2": "Pace guidance and coaching features",
      "specifications": "Body Battery energy monitoring, designed for runners."
    },
    "publish": true
  },
  {
    "name": "Apple Watch Series 9/10",
    "image": ["https://placehold.co/600x600/9E9E9E/ffffff?text=Apple+Watch+9", "https://placehold.co/600x600/BDBDBD/000000?text=Watch+Face"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 350,
    "price": 399.00,
    "discount": 5,
    "description": "The market-leading smartwatch, offering a seamless experience for iPhone users. It features a bright display, a fast processor, and a comprehensive suite of health sensors, including ECG, blood oxygen, and temperature sensing for cycle tracking.",
    "more_details": {
      "brand": "Apple",
      "model": "Series 9/10",
      "key_feature_1": "ECG and blood oxygen sensors",
      "key_feature_2": "Crash Detection safety feature",
      "specifications": "Temperature sensing, fast processor, seamless iPhone integration. Series 10 may add sleep apnea detection."
    },
    "publish": true
  },
  {
    "name": "Apple Watch Ultra 2",
    "image": ["https://placehold.co/600x600/607D8B/ffffff?text=Watch+Ultra+2", "https://placehold.co/600x600/90A4AE/ffffff?text=Ultra+2+Side"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 120,
    "price": 799.00,
    "discount": 0,
    "description": "Apple's premium, rugged smartwatch designed for adventure and endurance sports. It features a larger, brighter display, extended battery life (36 hours), and a durable titanium case.",
    "more_details": {
      "brand": "Apple",
      "model": "Watch Ultra 2",
      "key_feature_1": "Rugged titanium case",
      "key_feature_2": "Depth gauge for diving and emergency siren",
      "specifications": "36-hour battery life, larger/brighter display, all health features of Series 9."
    },
    "publish": true
  },
  {
    "name": "Samsung Galaxy Watch 7",
    "image": ["https://placehold.co/600x600/000000/ffffff?text=Galaxy+Watch+7", "https://placehold.co/600x600/424242/ffffff?text=Galaxy+Side"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 310,
    "price": 299.00,
    "discount": 10,
    "description": "The top smartwatch choice for Android users, running on Wear OS. It offers advanced health features such as ECG, blood pressure monitoring, and a body composition sensor.",
    "more_details": {
      "brand": "Samsung",
      "model": "Galaxy Watch 7",
      "key_feature_1": "Body composition sensor",
      "key_feature_2": "AI-powered wellness features and sleep apnea detection",
      "specifications": "Runs on Wear OS, features ECG and blood pressure monitoring. Some features require a Samsung phone."
    },
    "publish": true
  },
  {
    "name": "Google Pixel Watch 3",
    "image": ["https://placehold.co/600x600/4285F4/ffffff?text=Pixel+Watch+3", "https://placehold.co/600x600/8AB4F8/ffffff?text=Pixel+Watch+Face"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 180,
    "price": 400.00,
    "discount": 0,
    "description": "A sleek smartwatch that deeply integrates Google's software with Fitbit's health tracking capabilities. It features an improved battery life of up to 36 hours, a brighter display, and advanced metrics like a daily Readiness score.",
    "more_details": {
      "brand": "Google",
      "model": "Pixel Watch 3",
      "key_feature_1": "Deep Fitbit integration",
      "key_feature_2": "Loss of Pulse Detection safety feature",
      "specifications": "Up to 36-hour battery life, brighter display, daily Readiness score, Cardio Load."
    },
    "publish": true
  },
  {
    "name": "Garmin Venu 3",
    "image": ["https://placehold.co/600x600/3F51B5/ffffff?text=Venu+3", "https://placehold.co/600x600/7986CB/ffffff?text=Venu+3+Screen"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 200,
    "price": 449.99,
    "discount": 10,
    "description": "A fitness-centric smartwatch with a vibrant AMOLED display and an impressive battery life of up to 14 days. It is known for its highly accurate GPS and heart rate sensors.",
    "more_details": {
      "brand": "Garmin",
      "model": "Venu 3",
      "key_feature_1": "Up to 14-day battery life",
      "key_feature_2": "Automatic nap detection and sleep coaching",
      "specifications": "Vibrant AMOLED display, accurate GPS/HR sensors, on-device calls and voice assistant support."
    },
    "publish": true
  },
  {
    "name": "Garmin Forerunner 265",
    "image": ["https://placehold.co/600x600/CDDC39/000000?text=Forerunner+265", "https://placehold.co/600x600/DCE775/000000?text=FR+265+Face"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 160,
    "price": 449.99,
    "discount": 10,
    "description": "A specialized running watch featuring a bright AMOLED screen. It provides advanced workout metrics, highly accurate GPS with SatIQ technology, and Garmin's best training tools like Training Readiness.",
    "more_details": {
      "brand": "Garmin",
      "model": "Forerunner 265",
      "key_feature_1": "Specialized running watch",
      "key_feature_2": "Training Readiness score",
      "specifications": "Bright AMOLED screen, advanced workout metrics, highly accurate GPS with SatIQ technology."
    },
    "publish": true
  },
  {
    "name": "Withings ScanWatch Light",
    "image": ["https://placehold.co/600x600/BDBDBD/000000?text=ScanWatch+Light", "https://placehold.co/600x600/EEEEEE/000000?text=ScanWatch+Face"],
    "categories": ["Wearable Technology", "Smartwatches", "Hybrid"],
    "unit": "piece",
    "stock": 95,
    "price": 249.95,
    "discount": 0,
    "description": "A hybrid smartwatch that combines a classic analog watch design with a small OLED screen for notifications and health data. Its standout feature is an exceptional 30-day battery life.",
    "more_details": {
      "brand": "Withings",
      "model": "ScanWatch Light",
      "key_feature_1": "30-day battery life",
      "key_feature_2": "Hybrid analog watch design",
      "specifications": "Tracks heart rate, activity, sleep (with breathing disturbance detection), and menstrual cycles."
    },
    "publish": true
  },
  {
    "name": "Fitbit Versa 4",
    "image": ["https://placehold.co/600x600/F44336/ffffff?text=Versa+4", "https://placehold.co/600x600/E57373/ffffff?text=Versa+4+Side"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 220,
    "price": 199.95,
    "discount": 20,
    "description": "A fitness-oriented smartwatch with a larger screen than the Charge series. It includes built-in GPS, over 40 exercise modes, and tracks sleep, SpO2, and stress.",
    "more_details": {
      "brand": "Fitbit (owned by Google)",
      "model": "Versa 4",
      "key_feature_1": "Built-in GPS",
      "key_feature_2": "Leverages strong Fitbit app ecosystem",
      "specifications": "Over 40 exercise modes, tracks sleep, SpO2, and stress. No third-party app store."
    },
    "publish": false
  },
  {
    "name": "Amazfit Active 2",
    "image": ["https://placehold.co/600x600/3F51B5/ffffff?text=Amazfit+Active+2", "https://placehold.co/600x600/7986CB/ffffff?text=Active+2+Screen"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 350,
    "price": 99.00,
    "discount": 10,
    "description": "A budget-friendly smartwatch with a strong focus on fitness. It offers an extensive list of over 160 workout modes, onboard GPS, and support for offline maps.",
    "more_details": {
      "brand": "Amazfit",
      "model": "Active 2",
      "key_feature_1": "Over 160 workout modes",
      "key_feature_2": "Onboard GPS and offline maps support",
      "specifications": "Reliable sleep and wellness monitoring tools. High value for the price."
    },
    "publish": true
  },
  {
    "name": "Apple Watch SE (2nd Gen)",
    "image": ["https://placehold.co/600x600/757575/ffffff?text=Apple+Watch+SE", "https://placehold.co/600x600/A0A0A0/000000?text=Watch+SE+Face"],
    "categories": ["Wearable Technology", "Smartwatches"],
    "unit": "piece",
    "stock": 400,
    "price": 279.00,
    "discount": 15,
    "description": "Apple's entry-level smartwatch, providing the core Apple Watch experience and access to a vast app ecosystem. It includes essential health features such as heart rate monitoring, sleep tracking, and crash detection.",
    "more_details": {
      "brand": "Apple",
      "model": "Watch SE (2nd Gen)",
      "key_feature_1": "Core Apple Watch experience on a budget",
      "key_feature_2": "Crash detection safety feature",
      "specifications": "Heart rate monitoring, sleep tracking. Lacks ECG and blood oxygen sensors."
    },
    "publish": true
  },
  {
    "name": "Dexcom G7",
    "image": ["https://placehold.co/600x600/FF5722/ffffff?text=Dexcom+G7", "https://placehold.co/600x600/FF8A65/ffffff?text=G7+Sensor"],
    "categories": ["Health Devices", "Continuous Glucose Monitors"],
    "unit": "30-day supply",
    "stock": 90,
    "price": 172.52,
    "discount": 0,
    "description": "A leading CGM known for its high accuracy. The G7 is significantly smaller than its predecessor, features a rapid 30-minute warm-up, and has a 10-day sensor life with a 12-hour grace period.",
    "more_details": {
      "brand": "Dexcom",
      "model": "G7",
      "key_feature_1": "Real-time glucose data to smartphone",
      "key_feature_2": "Predictive alerts for high/low glucose",
      "specifications": "10-day sensor life with a 12-hour grace period. Can integrate with insulin pump systems."
    },
    "publish": true
  },
  {
    "name": "Freestyle Libre 3",
    "image": ["https://placehold.co/600x600/795548/ffffff?text=Libre+3", "https://placehold.co/600x600/A1887F/ffffff?text=Libre+Sensor"],
    "categories": ["Health Devices", "Continuous Glucose Monitors"],
    "unit": "30-day supply",
    "stock": 150,
    "price": 75.34,
    "discount": 0,
    "description": "This CGM is notable for its small and discreet design, comparable to the size of two stacked pennies. It offers a 14-day wear time and streams glucose readings to a smartphone app every minute without the need for manual scanning.",
    "more_details": {
      "brand": "Abbott",
      "model": "Freestyle Libre 3",
      "key_feature_1": "Extremely small and discreet sensor",
      "key_feature_2": "14-day wear time",
      "specifications": "Streams glucose readings every minute. Considered a budget-friendly CGM option."
    },
    "publish": true
  },
  {
    "name": "Medtronic Guardian 4",
    "image": ["https://placehold.co/600x600/009688/ffffff?text=Guardian+4", "https://placehold.co/600x600/4DB6AC/ffffff?text=Guardian+Sensor"],
    "categories": ["Health Devices", "Continuous Glucose Monitors"],
    "unit": "Box of 5 sensors",
    "stock": 70,
    "price": 249.99,
    "discount": 0,
    "description": "Designed for seamless integration with the MiniMed 780G insulin pump, enabling automated insulin delivery. It features predictive alerts to help prevent glucose fluctuations and has a sensor lifespan of up to 7 days.",
    "more_details": {
      "brand": "Medtronic",
      "model": "Guardian 4",
      "key_feature_1": "Integrates with MiniMed 780G pump",
      "key_feature_2": "Predictive alerts",
      "specifications": "Enables automated insulin delivery. 7-day sensor life. Transmitter is a separate cost."
    },
    "publish": true
  },
  {
    "name": "Eversense E3 (365)",
    "image": ["https://placehold.co/600x600/FFEB3B/000000?text=Eversense+E3", "https://placehold.co/600x600/FFF176/000000?text=Eversense+Implant"],
    "categories": ["Health Devices", "Continuous Glucose Monitors", "Subscription Service"],
    "unit": "Annual System",
    "stock": 40,
    "price": 199.00,
    "discount": 0,
    "description": "A unique long-term CGM system featuring a sensor that is implanted under the skin by a healthcare professional and lasts for up to 6 months. A removable smart transmitter is worn over the sensor.",
    "more_details": {
      "brand": "Ascensia Diabetes Care",
      "model": "Eversense E3",
      "key_feature_1": "6-month implantable sensor",
      "key_feature_2": "On-body vibration alerts",
      "specifications": "Requires professional implantation. Removable transmitter sends data every 5 minutes."
    },
    "publish": true
  },
  {
    "name": "Signos CGM Plans",
    "image": ["https://placehold.co/600x600/9C27B0/ffffff?text=Signos", "https://placehold.co/600x600/BA68C8/ffffff?text=Signos+App"],
    "categories": ["Health Services", "Continuous Glucose Monitors", "Subscription Service"],
    "unit": "Monthly Subscription",
    "stock": 200,
    "price": 229.00,
    "discount": 10,
    "description": "A wellness service that leverages CGM technology (typically Dexcom devices) specifically for weight management. The program combines real-time glucose data with an AI-powered app.",
    "more_details": {
      "brand": "Signos",
      "model": "CGM Plan",
      "key_feature_1": "AI-powered nutrition and exercise recommendations",
      "key_feature_2": "Focus on weight management",
      "specifications": "Uses Dexcom CGMs. Integrates with devices like Apple Watch."
    },
    "publish": true
  },
  {
    "name": "Nutrisense CGM Plan",
    "image": ["https://placehold.co/600x600/4CAF50/ffffff?text=Nutrisense", "https://placehold.co/600x600/81C784/ffffff?text=Nutrisense+App"],
    "categories": ["Health Services", "Continuous Glucose Monitors", "Subscription Service"],
    "unit": "Monthly Subscription",
    "stock": 180,
    "price": 225.00,
    "discount": 5,
    "description": "A service focused on metabolic health that provides a CGM (usually a FreeStyle Libre) and pairs it with one-on-one support from a registered nutritionist.",
    "more_details": {
      "brand": "Nutrisense",
      "model": "CGM Plan",
      "key_feature_1": "One-on-one support from a registered nutritionist",
      "key_feature_2": "Focus on metabolic health",
      "specifications": "Uses FreeStyle Libre CGMs. App allows logging of meals and activities."
    },
    "publish": true
  },
  {
    "name": "Levels Health CGM Program",
    "image": ["https://placehold.co/600x600/03A9F4/ffffff?text=Levels", "https://placehold.co/600x600/4FC3F7/ffffff?text=Levels+App"],
    "categories": ["Health Services", "Continuous Glucose Monitors", "Subscription Service"],
    "unit": "Monthly Subscription",
    "stock": 250,
    "price": 199.00,
    "discount": 0,
    "description": "A program aimed at optimizing metabolic health for the general wellness consumer. The Levels app provides real-time feedback on how diet, exercise, and stress affect blood sugar.",
    "more_details": {
      "brand": "Levels",
      "model": "CGM Program",
      "key_feature_1": "Real-time feedback on lifestyle choices",
      "key_feature_2": "Bring-your-own-CGM option",
      "specifications": "Integrates with Apple HealthKit. Uses Dexcom or FreeStyle Libre CGMs."
    },
    "publish": true
  },
  {
    "name": "Omnipod 5 System",
    "image": ["https://placehold.co/600x600/FF9800/ffffff?text=Omnipod+5", "https://placehold.co/600x600/FFB74D/ffffff?text=Omnipod+Pod"],
    "categories": ["Health Devices", "Insulin Pumps", "Continuous Glucose Monitors"],
    "unit": "Box of 5 pods",
    "stock": 100,
    "price": 325.00,
    "discount": 5,
    "description": "A unique automated insulin delivery (AID) system that combines a tubeless, wearable insulin pump (the \"Pod\") with an integrated Dexcom G6 CGM.",
    "more_details": {
      "brand": "Insulet",
      "model": "Omnipod 5",
      "key_feature_1": "Tubeless, wearable insulin pump",
      "key_feature_2": "Automated insulin delivery",
      "specifications": "Integrates with Dexcom G6 CGM. Algorithm automatically adjusts insulin delivery. Each pod worn for 3 days."
    },
    "publish": true
  },
  {
    "name": "Dexcom G6",
    "image": ["https://placehold.co/600x600/F44336/ffffff?text=Dexcom+G6", "https://placehold.co/600x600/E57373/ffffff?text=G6+Sensor"],
    "categories": ["Health Devices", "Continuous Glucose Monitors"],
    "unit": "3-pack of sensors",
    "stock": 120,
    "price": 340.00,
    "discount": 10,
    "description": "The predecessor to the G7, the Dexcom G6 is a highly trusted and widely used CGM system. It features a 10-day sensor, real-time data streaming, and predictive alerts.",
    "more_details": {
      "brand": "Dexcom",
      "model": "G6",
      "key_feature_1": "Highly trusted and reliable",
      "key_feature_2": "Integrates with multiple insulin pump systems",
      "specifications": "10-day sensor, real-time data streaming, predictive alerts."
    },
    "publish": false
  },
  {
    "name": "Freestyle Libre 2",
    "image": ["https://placehold.co/600x600/9C27B0/ffffff?text=Libre+2", "https://placehold.co/600x600/BA68C8/ffffff?text=Libre+2+Sensor"],
    "categories": ["Health Devices", "Continuous Glucose Monitors"],
    "unit": "Sensor",
    "stock": 200,
    "price": 103.00,
    "discount": 5,
    "description": "An earlier version of the Libre system that requires users to manually scan the sensor with a reader or smartphone to get a glucose reading. It offers optional alarms for high and low glucose levels.",
    "more_details": {
      "brand": "Abbott",
      "model": "Freestyle Libre 2",
      "key_feature_1": "Manual scan for readings",
      "key_feature_2": "Affordable and accessible option",
      "specifications": "Optional alarms for high and low glucose. Not continuous streaming like Libre 3."
    },
    "publish": true
  },
  {
    "name": "Transparent Labs 100% Grass-Fed Whey Protein Isolate",
    "image": ["https://placehold.co/600x600/607D8B/ffffff?text=Transparent+Labs", "https://placehold.co/600x600/90A4AE/ffffff?text=Whey+Isolate"],
    "categories": ["Nutrition", "Supplements", "Protein Powders"],
    "unit": "30-serving container",
    "stock": 200,
    "price": 59.99,
    "discount": 5,
    "description": "A premium whey protein isolate sourced from grass-fed American cows, offering a high 28 grams of protein per serving with minimal carbs and fat.",
    "more_details": {
      "brand": "Transparent Labs",
      "model": "100% Grass-Fed Whey Isolate",
      "key_feature_1": "28g of protein per serving",
      "key_feature_2": "Third-party tested and Informed Choice certified",
      "specifications": "Free from artificial sweeteners, colors, and preservatives. Sourced from grass-fed cows."
    },
    "publish": true
  },
  {
    "name": "Optimum Nutrition Gold Standard 100% Whey",
    "image": ["https://placehold.co/600x600/FFC107/000000?text=Gold+Standard", "https://placehold.co/600x600/FFD54F/000000?text=100%+Whey"],
    "categories": ["Nutrition", "Supplements", "Protein Powders"],
    "unit": "5 lb tub",
    "stock": 500,
    "price": 79.99,
    "discount": 10,
    "description": "A widely popular and trusted protein powder that combines whey protein isolate, concentrate, and hydrolyzed whey peptides. Each serving provides 24 grams of protein and 5.5 grams of naturally occurring BCAAs.",
    "more_details": {
      "brand": "Optimum Nutrition",
      "model": "Gold Standard 100% Whey",
      "key_feature_1": "24g of protein & 5.5g of BCAAs per serving",
      "key_feature_2": "Informed Choice certified",
      "specifications": "Blend of whey isolate, concentrate, and hydrolyzed peptides. Known for extensive flavor range."
    },
    "publish": true
  },
  {
    "name": "Orgain Organic Plant-Based Protein Powder",
    "image": ["https://placehold.co/600x600/8BC34A/ffffff?text=Orgain", "https://placehold.co/600x600/AED581/ffffff?text=Orgain+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders", "Vegan"],
    "unit": "2.03 lbs container",
    "stock": 400,
    "price": 37.99,
    "discount": 15,
    "description": "A leading plant-based protein powder made from a blend of organic pea, brown rice, and chia seed proteins. It delivers 21 grams of protein per serving and is praised for its smooth, non-gritty texture.",
    "more_details": {
      "brand": "Orgain",
      "model": "Organic Plant-Based Protein",
      "key_feature_1": "Smooth, non-gritty texture",
      "key_feature_2": "USDA Organic and vegan",
      "specifications": "21g of protein per serving from organic pea, brown rice, and chia seed blend."
    },
    "publish": true
  },
  {
    "name": "Dymatize ISO100 Hydrolyzed Whey Isolate",
    "image": ["https://placehold.co/600x600/2196F3/ffffff?text=Dymatize+ISO100", "https://placehold.co/600x600/64B5F6/ffffff?text=ISO100+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders"],
    "unit": "20-serving container",
    "stock": 300,
    "price": 33.43,
    "discount": 5,
    "description": "This powder uses hydrolyzed whey protein isolate for rapid absorption, making it a popular choice for post-workout recovery. Each serving contains 25 grams of protein with minimal carbs and fat.",
    "more_details": {
      "brand": "Dymatize",
      "model": "ISO100",
      "key_feature_1": "Hydrolyzed for rapid absorption",
      "key_feature_2": "Unique flavors like Fruity Pebbles",
      "specifications": "25g of protein, 120 calories per serving. Ideal for post-workout."
    },
    "publish": true
  },
  {
    "name": "Thorne Whey Protein Isolate",
    "image": ["https://placehold.co/600x600/9575CD/ffffff?text=Thorne+Whey", "https://placehold.co/600x600/B39DDB/ffffff?text=Thorne+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders"],
    "unit": "30-serving container",
    "stock": 150,
    "price": 61.75,
    "discount": 0,
    "description": "A premium whey protein isolate that is NSF Certified for Sport, ensuring it is free of banned substances and making it a trusted choice for professional athletes.",
    "more_details": {
      "brand": "Thorne",
      "model": "Whey Protein Isolate",
      "key_feature_1": "NSF Certified for Sport",
      "key_feature_2": "Low-calorie formula (100 calories)",
      "specifications": "21g of protein per serving. High-quality ingredients, good taste, and easy mixability."
    },
    "publish": true
  },
  {
    "name": "Naked Whey Protein Powder",
    "image": ["https://placehold.co/600x600/ecf0f1/000000?text=Naked+Whey", "https://placehold.co/600x600/bdc3c7/000000?text=Naked+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders"],
    "unit": "5 lb container",
    "stock": 250,
    "price": 94.99,
    "discount": 5,
    "description": "This product champions simplicity and purity. The unflavored version contains only one ingredient: whey protein concentrate from grass-fed cows in California.",
    "more_details": {
      "brand": "Naked Nutrition",
      "model": "Naked Whey",
      "key_feature_1": "Single ingredient (unflavored)",
      "key_feature_2": "Informed Choice certified",
      "specifications": "Whey protein concentrate from grass-fed California cows. Free from additives and artificial flavors."
    },
    "publish": true
  },
  {
    "name": "Garden of Life Sport Organic Plant-Based Protein",
    "image": ["https://placehold.co/600x600/4CAF50/ffffff?text=Garden+of+Life+Sport", "https://placehold.co/600x600/81C784/ffffff?text=GoL+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders", "Vegan"],
    "unit": "1.7 lb container",
    "stock": 180,
    "price": 47.99,
    "discount": 10,
    "description": "A high-protein (30g per serving) vegan powder that is Certified USDA Organic, Non-GMO Project Verified, and NSF Certified for Sport. It uses a blend of pea, navy bean, lentil, and cranberry proteins.",
    "more_details": {
      "brand": "Garden of Life",
      "model": "Sport Organic Plant-Based Protein",
      "key_feature_1": "30g of protein per serving",
      "key_feature_2": "NSF Certified for Sport and USDA Organic",
      "specifications": "Includes a muscle recovery blend with tart cherries and antioxidants."
    },
    "publish": true
  },
  {
    "name": "Huel Complete Protein",
    "image": ["https://placehold.co/600x600/000000/ffffff?text=Huel", "https://placehold.co/600x600/333333/ffffff?text=Huel+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders", "Vegan"],
    "unit": "26-serving bag",
    "stock": 220,
    "price": 35.00,
    "discount": 0,
    "description": "Marketed as the 'world's first complete vegan protein powder,' this product provides 20g of protein from a blend of hemp, faba, and pea proteins. It is also fortified with 27 essential vitamins and minerals.",
    "more_details": {
      "brand": "Huel",
      "model": "Complete Protein",
      "key_feature_1": "Nutritionally complete with 27 vitamins & minerals",
      "key_feature_2": "Includes probiotics for gut health",
      "specifications": "20g of protein from hemp, faba, and pea blend."
    },
    "publish": true
  },
  {
    "name": "Kaged Whey Protein Isolate",
    "image": ["https://placehold.co/600x600/f44336/ffffff?text=Kaged", "https://placehold.co/600x600/e57373/ffffff?text=Kaged+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders"],
    "unit": "Varies",
    "stock": 160,
    "price": 49.75,
    "discount": 10,
    "description": "A high-quality whey protein isolate that is third-party tested and free from artificial colors and flavors. It offers a lean profile with 25g of protein and only 110 calories per serving.",
    "more_details": {
      "brand": "Kaged",
      "model": "Whey Protein Isolate",
      "key_feature_1": "Third-party tested",
      "key_feature_2": "Lean profile (110 calories)",
      "specifications": "25g of protein per serving. Free from artificial colors and flavors."
    },
    "publish": false
  },
  {
    "name": "Vega Sport Premium Protein",
    "image": ["https://placehold.co/600x600/4CAF50/ffffff?text=Vega+Sport", "https://placehold.co/600x600/81C784/ffffff?text=Vega+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders", "Vegan"],
    "unit": "20-serving container",
    "stock": 200,
    "price": 39.99,
    "discount": 5,
    "description": "A popular plant-based protein designed for athletes, providing 30g of protein from pea, pumpkin seed, sunflower seed, and alfalfa. It includes 5g of branched-chain amino acids (BCAAs) and tart cherry to support recovery.",
    "more_details": {
      "brand": "Vega",
      "model": "Sport Premium Protein",
      "key_feature_1": "30g of plant-based protein",
      "key_feature_2": "NSF Certified for Sport",
      "specifications": "Includes 5g of BCAAs and tart cherry for recovery."
    },
    "publish": true
  },
  {
    "name": "Ritual Essential for Women 18+",
    "image": ["https://placehold.co/600x600/E91E63/ffffff?text=Ritual+Women", "https://placehold.co/600x600/F06292/ffffff?text=Ritual+Capsule"],
    "categories": ["Nutrition", "Supplements", "Multivitamins"],
    "unit": "30-day supply",
    "stock": 180,
    "price": 33.00,
    "discount": 0,
    "description": "A multivitamin for women aged 18-49, focusing on nine key nutrients often lacking in the diet. It features a delayed-release capsule with a minty essence to improve taste and absorption.",
    "more_details": {
      "brand": "Ritual",
      "model": "Essential for Women 18+",
      "key_feature_1": "'Made Traceable' ingredient sourcing",
      "key_feature_2": "Delayed-release, mint-essenced capsule",
      "specifications": "USP verified and Clean Label Project certified. Contains vegan Omega-3 DHA and methylated folate."
    },
    "publish": true
  },
  {
    "name": "Ritual Essential for Men 18+",
    "image": ["https://placehold.co/600x600/2196F3/ffffff?text=Ritual+Men", "https://placehold.co/600x600/64B5F6/ffffff?text=Ritual+Capsule"],
    "categories": ["Nutrition", "Supplements", "Multivitamins"],
    "unit": "30-day supply",
    "stock": 170,
    "price": 33.00,
    "discount": 0,
    "description": "Formulated for men aged 18-49, this multivitamin contains 10 traceable ingredients, including vegan Omega-3 DHA, Vitamin D3, and chelated Zinc and Magnesium.",
    "more_details": {
      "brand": "Ritual",
      "model": "Essential for Men 18+",
      "key_feature_1": "10 traceable ingredients",
      "key_feature_2": "Delayed-release, mint-essenced capsule",
      "specifications": "Supports heart, brain, immune, and muscle function. Non-GMO Project Verified."
    },
    "publish": true
  },
  {
    "name": "Thorne Basic Nutrients 2/Day",
    "image": ["https://placehold.co/600x600/9C27B0/ffffff?text=Thorne+Basic", "https://placehold.co/600x600/BA68C8/ffffff?text=Thorne+Capsule"],
    "categories": ["Nutrition", "Supplements", "Multivitamins"],
    "unit": "60-capsule bottle",
    "stock": 130,
    "price": 34.00,
    "discount": 0,
    "description": "A comprehensive, high-potency multivitamin/mineral formula delivered in two daily capsules. It utilizes highly bioavailable nutrients, such as chelated minerals and active B vitamins, to support foundational health.",
    "more_details": {
      "brand": "Thorne",
      "model": "Basic Nutrients 2/Day",
      "key_feature_1": "NSF Certified for Sport",
      "key_feature_2": "Uses highly bioavailable nutrients",
      "specifications": "Contains chelated minerals and active B vitamins for enhanced absorption."
    },
    "publish": false
  },
  {
    "name": "AG1",
    "image": ["https://placehold.co/600x600/4CAF50/ffffff?text=AG1", "https://placehold.co/600x600/81C784/000000?text=AG1+Powder"],
    "categories": ["Nutrition", "Supplements", "Greens Powder"],
    "unit": "30-serving pouch",
    "stock": 220,
    "price": 99.00,
    "discount": 10,
    "description": "An all-in-one daily greens powder containing over 75 vitamins, minerals, superfoods, probiotics, and adaptogens. It is designed to replace multiple supplements, supporting gut health, energy, and immunity.",
    "more_details": {
      "brand": "AG1 (formerly Athletic Greens)",
      "model": "AG1",
      "key_feature_1": "75+ vitamins, minerals, and superfoods",
      "key_feature_2": "NSF Certified for Sport",
      "specifications": "Supports gut health, energy, and immunity. Marketed as a foundational nutrition supplement."
    },
    "publish": true
  },
  {
    "name": "Garden of Life mykind Organics Women's Multi",
    "image": ["https://placehold.co/600x600/E91E63/ffffff?text=GoL+Women", "https://placehold.co/600x600/F06292/ffffff?text=GoL+Tablet"],
    "categories": ["Nutrition", "Supplements", "Multivitamins", "Organic"],
    "unit": "60-tablet bottle",
    "stock": 190,
    "price": 45.59,
    "discount": 10,
    "description": "A whole-food multivitamin made from over 30 organic fruits, vegetables, and herbs. It is Certified USDA Organic and Non-GMO Project Verified.",
    "more_details": {
      "brand": "Garden of Life",
      "model": "mykind Organics Women's Multi",
      "key_feature_1": "Made from 30+ organic fruits, vegetables, and herbs",
      "key_feature_2": "Certified USDA Organic",
      "specifications": "Targeted levels of folate and high dose of Vitamin B-12 for energy."
    },
    "publish": true
  },
  {
    "name": "Nature Made Multi for Him",
    "image": ["https://placehold.co/600x600/FF9800/ffffff?text=Nature+Made+Men", "https://placehold.co/600x600/FFB74D/ffffff?text=NM+Tablet"],
    "categories": ["Nutrition", "Supplements", "Multivitamins"],
    "unit": "120-tablet bottle",
    "stock": 500,
    "price": 12.49,
    "discount": 0,
    "description": "An affordable and widely accessible multivitamin for men, providing 22 key nutrients for daily nutritional support. It is USP Verified, ensuring quality and potency.",
    "more_details": {
      "brand": "Nature Made",
      "model": "Multi for Him",
      "key_feature_1": "USP Verified for quality and potency",
      "key_feature_2": "Affordable and widely accessible",
      "specifications": "Iron-free formula. Supports muscle, bone, immune health, and energy metabolism."
    },
    "publish": true
  },
  {
    "name": "SmartyPants Men's Complete Gummy",
    "image": ["https://placehold.co/600x600/F44336/ffffff?text=SmartyPants+Men", "https://placehold.co/600x600/E57373/ffffff?text=SP+Gummy"],
    "categories": ["Nutrition", "Supplements", "Multivitamins", "Gummy"],
    "unit": "90-gummy bottle",
    "stock": 300,
    "price": 23.99,
    "discount": 5,
    "description": "A premium gummy multivitamin for men that includes over 15 nutrients. It features Omega-3 EPA and DHA from algal oil, CoQ10 for heart health, and Vitamin D3 for immunity.",
    "more_details": {
      "brand": "SmartyPants",
      "model": "Men's Complete Gummy",
      "key_feature_1": "Includes Omega-3 EPA & DHA",
      "key_feature_2": "Third-party lab tested",
      "specifications": "Gummy format. Contains CoQ10 and Lycopene. Uses bioavailable nutrients like methylfolate."
    },
    "publish": true
  },
  {
    "name": "OLLY The Perfect Men's Multi",
    "image": ["https://placehold.co/600x600/3F51B5/ffffff?text=OLLY+Men", "https://placehold.co/600x600/7986CB/ffffff?text=OLLY+Gummy"],
    "categories": ["Nutrition", "Supplements", "Multivitamins", "Gummy"],
    "unit": "90-gummy bottle",
    "stock": 450,
    "price": 13.99,
    "discount": 0,
    "description": "A blackberry-flavored gummy multivitamin for men that provides essential vitamins and minerals, including Vitamins A, C, D, E, B vitamins, and Zinc.",
    "more_details": {
      "brand": "OLLY",
      "model": "The Perfect Men's Multi",
      "key_feature_1": "Gummy format with blackberry flavor",
      "key_feature_2": "Easy-to-take format",
      "specifications": "Designed to support cellular energy, immune function, and heart health."
    },
    "publish": true
  },
  {
    "name": "Pure Encapsulations O.N.E. Multivitamin",
    "image": ["https://placehold.co/600x600/009688/ffffff?text=Pure+O.N.E.", "https://placehold.co/600x600/4DB6AC/ffffff?text=Pure+Capsule"],
    "categories": ["Nutrition", "Supplements", "Multivitamins"],
    "unit": "60-capsule bottle",
    "stock": 110,
    "price": 45.99,
    "discount": 5,
    "description": "A high-quality, hypoallergenic, once-daily multivitamin designed for overall wellness. It features highly bioavailable forms of vitamins and chelated minerals, including Metafolin® L-5-MTHF.",
    "more_details": {
      "brand": "Pure Encapsulations",
      "model": "O.N.E. Multivitamin",
      "key_feature_1": "Hypoallergenic",
      "key_feature_2": "Includes antioxidant complex with CoQ10",
      "specifications": "Once-daily formula. Contains lutein and zeaxanthin for eye health."
    },
    "publish": false
  },
  {
    "name": "Nutiva Organic Hemp Protein",
    "image": ["https://placehold.co/600x600/8BC34A/ffffff?text=Nutiva+Hemp", "https://placehold.co/600x600/AED581/ffffff?text=Nutiva+Powder"],
    "categories": ["Nutrition", "Supplements", "Protein Powders", "Vegan", "Organic"],
    "unit": "Varies",
    "stock": 140,
    "price": 15.04,
    "discount": 0,
    "description": "A single-ingredient, organic, non-GMO verified product made from cold-pressed hemp seeds. It provides 15 grams of complete protein per serving, along with fiber and all essential amino acids.",
    "more_details": {
      "brand": "Nutiva",
      "model": "Organic Hemp Protein",
      "key_feature_1": "Single-ingredient, organic",
      "key_feature_2": "Complete protein with all essential amino acids",
      "specifications": "15g of protein per serving. Made from cold-pressed hemp seeds."
    },
    "publish": true
  }
];

// Function to create categories first
const createCategories = async () => {
    try {
        // Extract all unique categories from products
        const allCategories = new Set();
        productData.forEach(product => {
            product.categories.forEach(category => {
                allCategories.add(category);
            });
        });

        console.log(`📋 Found ${allCategories.size} unique categories to create...`);
        
        const categoryMap = new Map();
        
        // Create categories with placeholder images
        for (const categoryName of allCategories) {
            try {
                // Check if category already exists
                let existingCategory = await CategoryModel.findOne({ name: categoryName });
                
                if (!existingCategory) {
                    // Create new category with placeholder image
                    const newCategory = new CategoryModel({
                        name: categoryName,
                        image: `https://placehold.co/300x200/4CAF50/ffffff?text=${encodeURIComponent(categoryName)}`
                    });
                    
                    const savedCategory = await newCategory.save();
                    categoryMap.set(categoryName, savedCategory._id);
                    console.log(`✅ Created category: ${categoryName}`);
                } else {
                    categoryMap.set(categoryName, existingCategory._id);
                    console.log(`📌 Category already exists: ${categoryName}`);
                }
            } catch (error) {
                console.log(`❌ Error creating category ${categoryName}:`, error.message);
            }
        }
        
        return categoryMap;
    } catch (error) {
        console.log('❌ Error in createCategories:', error);
        throw error;
    }
};

// Function to create products
const createProducts = async (categoryMap) => {
    try {
        console.log(`\n📦 Starting to upload ${productData.length} products...`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const product of productData) {
            try {
                // Check if product already exists
                const existingProduct = await ProductModel.findOne({ name: product.name });
                
                if (existingProduct) {
                    console.log(`📌 Product already exists: ${product.name}`);
                    continue;
                }
                
                // Map category names to ObjectIds
                const categoryIds = product.categories
                    .map(categoryName => categoryMap.get(categoryName))
                    .filter(id => id); // Remove any undefined IDs
                
                // Create new product
                const newProduct = new ProductModel({
                    name: product.name,
                    image: product.image,
                    category: categoryIds,
                    unit: product.unit,
                    stock: product.stock,
                    price: product.price,
                    discount: product.discount,
                    description: product.description,
                    more_details: product.more_details,
                    publish: product.publish
                });
                
                await newProduct.save();
                successCount++;
                console.log(`✅ Created product: ${product.name} ($${product.price})`);
                
            } catch (error) {
                errorCount++;
                console.log(`❌ Error creating product ${product.name}:`, error.message);
            }
        }
        
        console.log(`\n📊 Upload Summary:`);
        console.log(`✅ Successfully created: ${successCount} products`);
        console.log(`❌ Errors: ${errorCount} products`);
        
    } catch (error) {
        console.log('❌ Error in createProducts:', error);
        throw error;
    }
};

// Main function
const uploadProducts = async () => {
    try {
        await connectDB();
        
        console.log('🚀 Starting bulk product upload...\n');
        
        // Step 1: Create categories
        const categoryMap = await createCategories();
        
        // Step 2: Create products
        await createProducts(categoryMap);
        
        console.log('\n🎉 Bulk upload completed successfully!');
        
    } catch (error) {
        console.log('❌ Upload failed:', error);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
};

// Run the upload
uploadProducts();
