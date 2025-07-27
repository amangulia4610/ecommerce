import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaEye, 
  FaStar,
  FaArrowRight,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { useCart } from '../hooks/useCart';
import { formatPrice, calculateDiscountedPrice } from '../utils/currency';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProducts,
        params: {
          limit: 8,
          publish: 'true',
          sortBy: 'createdAt',
          sortOrder: 'asc'
        }
      });

      if (response.data.success) {
        setFeaturedProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategories
      });
      if (response.data.success) {
        setCategories(response.data.data.slice(0, 6)); // Show only first 6 categories
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const heroSlides = [
    {
      title: "Summer Collection 2024",
      subtitle: "Discover the latest trends",
      description: "Shop our newest arrivals and enjoy up to 50% off on selected items",
      buttonText: "Shop Now",
      image: "/20-degrees-logo.png",
      bgColor: "from-blue-600 to-purple-700"
    },
    {
      title: "Premium Quality Products",
      subtitle: "Unbeatable prices",
      description: "Find the perfect products for your lifestyle with our curated collection",
      buttonText: "Explore",
      image: "/apple-watch.png",
      bgColor: "from-green-600 to-blue-600"
    },
    {
      title: "Free Shipping",
      subtitle: "On orders over $100",
      description: "Get free shipping on all orders above $100. Terms and conditions apply",
      buttonText: "Learn More",
      image: "/fitbit inspire 3.png",
      bgColor: "from-purple-600 to-pink-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image?.[0] || '/placeholder-image.jpg'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
            -{product.discount}%
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col space-y-2">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <FaHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <FaEye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {product.category?.slice(0, 2).map((cat, index) => (
            <span
              key={cat._id || index}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-4 h-4" />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.5)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.discount > 0 ? (
              <>
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 text-sm font-medium"
          >
            <FaShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide, index) => (
            <div key={index} className={`min-w-full h-full bg-gradient-to-r ${slide.bgColor} flex items-center`}>
              <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-between">
                <div className="max-w-xl text-white">
                  <h2 className="text-lg font-medium mb-2 opacity-90">{slide.subtitle}</h2>
                  <h1 className="text-5xl font-bold mb-6 leading-tight">{slide.title}</h1>
                  <p className="text-xl mb-8 opacity-90">{slide.description}</p>
                  <button 
                    onClick={() => navigate('/shop')}
                    className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>{slide.buttonText}</span>
                    <FaArrowRight />
                  </button>
                </div>
                <div className="hidden lg:block">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-80 h-80 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
        >
          <FaChevronRight />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShippingFast className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $100</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round the clock customer support</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCreditCard className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Discover our wide range of product categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/shop?category=${category._id}`}
                className="group text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 mb-4">
                  <img
                    src={category.image || '/placeholder-image.jpg'}
                    alt={category.name}
                    className="w-20 h-20 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Check out our latest and most popular products</p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {featuredProducts.slice(0, 4).map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  to="/shop"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center space-x-2 transition-colors"
                >
                  <span>View All Products</span>
                  <FaArrowRight />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter and get 10% off your first order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose 20 Degrees?</h2>
              <p className="text-lg text-gray-600 mb-6">
                We're committed to providing the best shopping experience with high-quality products, 
                competitive prices, and exceptional customer service.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Premium quality products</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Fast and reliable shipping</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Excellent customer support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Competitive pricing</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="/20-degrees-logo.png"
                alt="About 20 Degrees"
                className="w-full h-96 object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;