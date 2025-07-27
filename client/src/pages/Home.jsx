import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowRight,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaFire,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaAward,
  FaClock,
  FaGift,
  FaLeaf,
  FaDumbbell,
  FaHeart,
  FaClock as FaWatch,
  FaFlask,
  FaHeartbeat,
  FaRunning
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { useCart } from '../hooks/useCart';
import { formatPrice, calculateDiscountedPrice } from '../utils/currency';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalCustomers: 1250,
    totalOrders: 5670
  });

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
    fetchNewArrivals();
    fetchBestSellers();
    fetchStats();
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
          sortOrder: 'desc'
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

  const fetchNewArrivals = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProducts,
        params: {
          limit: 6,
          publish: 'true',
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }
      });

      if (response.data.success) {
        setNewArrivals(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
    }
  };

  const fetchBestSellers = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProducts,
        params: {
          limit: 6,
          publish: 'true',
          sortBy: 'stock',
          sortOrder: 'asc' // Lower stock suggests higher sales
        }
      });

      if (response.data.success) {
        setBestSellers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        Axios({
          ...SummaryApi.getProducts,
          params: { publish: 'true', limit: 1000 }
        }),
        Axios({
          ...SummaryApi.getCategories
        })
      ]);

      setStats(prev => ({
        ...prev,
        totalProducts: productsResponse.data.data?.length || 0,
        totalCategories: categoriesResponse.data.data?.length || 0
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
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
      title: "Transform Your Health Journey",
      subtitle: "Premium Health & Fitness Solutions",
      description: "Discover cutting-edge health monitors, premium multivitamins, and fitness trackers designed for your optimal wellness",
      buttonText: "Explore Health Tech",
      image: "/apple-watch.png",
      bgColor: "from-blue-600 via-purple-600 to-indigo-700",
      category: "smartwatches"
    },
    {
      title: "Fuel Your Performance",
      subtitle: "Premium Nutrition & Supplements",
      description: "Power your workouts with our scientifically-formulated protein powders and essential multivitamins",
      buttonText: "Shop Nutrition",
      image: "/fitbit inspire 3.png",
      bgColor: "from-green-600 via-teal-600 to-cyan-700",
      category: "nutrition"
    },
    {
      title: "Advanced Health Monitoring",
      subtitle: "Real-time Health Insights",
      description: "Stay ahead of your health with continuous glucose monitors, smartwatches, and professional health services",
      buttonText: "Monitor Health",
      image: "/fitbitcharge6.jpg",
      bgColor: "from-purple-600 via-pink-600 to-red-600",
      category: "health-monitors"
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide, index) => (
            <div key={index} className={`min-w-full h-full bg-gradient-to-r ${slide.bgColor} flex items-center relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.2),transparent)]"></div>
              </div>
              
              <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-between relative z-10">
                <div className="max-w-2xl text-white">
                  <div className="inline-flex items-center px-4 py-2 bg-transparent bg-opacity-15 rounded-full text-sm font-medium mb-6 backdrop-blur-md border border-white border-opacity-30 shadow-lg">
                    <FaFire className="mr-2 text-yellow-300" />
                    <span className="text-white font-semibold">{slide.subtitle}</span>
                  </div>
                  <h1 className="text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl mb-8 text-white opacity-95 leading-relaxed drop-shadow-md">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => navigate('/shop')}
                      className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      <span>{slide.buttonText}</span>
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button 
                      onClick={() => navigate('/shop')}
                      className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-flex items-center justify-center space-x-2 backdrop-blur-sm"
                    >
                      <FaPlay className="text-sm" />
                      <span>Watch Demo</span>
                    </button>
                  </div>
                </div>
                <div className="hidden xl:block relative">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white bg-opacity-20 rounded-3xl blur-3xl transform rotate-6"></div>
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-96 h-96 object-contain relative z-10 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons (desktop only) */}
        <div className="hidden md:block">
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30 hover:border-opacity-50 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30 hover:border-opacity-50 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Indicators */}}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'bg-white bg-opacity-40 hover:bg-opacity-70 hover:scale-105'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Health Enthusiasts Worldwide</h2>
            <p className="text-xl text-gray-600">Join thousands who've transformed their health journey with us</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaTrophy className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalProducts}+</h3>
                <p className="text-gray-600 font-medium">Premium Products</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaUsers className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalCustomers.toLocaleString()}+</h3>
                <p className="text-gray-600 font-medium">Happy Customers</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaChartLine className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalOrders.toLocaleString()}+</h3>
                <p className="text-gray-600 font-medium">Orders Delivered</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaAward className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalCategories}+</h3>
                <p className="text-gray-600 font-medium">Health Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              <FaLeaf className="mr-2" />
              Shop by Category
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Comprehensive Health Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From advanced health monitoring to premium nutrition, find everything you need for your wellness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const categoryConfig = {
                'Smartwatches': { 
                  icon: FaClock, 
                  bgColor: 'bg-blue-100', 
                  iconColor: 'text-blue-600',
                  hoverColor: 'group-hover:text-blue-600',
                  description: 'Advanced fitness tracking & health monitoring' 
                },
                'Fitness Bands': { 
                  icon: FaRunning, 
                  bgColor: 'bg-green-100', 
                  iconColor: 'text-green-600',
                  hoverColor: 'group-hover:text-green-600',
                  description: 'Lightweight tracking for active lifestyles' 
                },
                'Health Monitors': { 
                  icon: FaHeartbeat, 
                  bgColor: 'bg-red-100', 
                  iconColor: 'text-red-600',
                  hoverColor: 'group-hover:text-red-600',
                  description: 'Professional health monitoring devices' 
                },
                'Multivitamins': { 
                  icon: FaFlask, 
                  bgColor: 'bg-purple-100', 
                  iconColor: 'text-purple-600',
                  hoverColor: 'group-hover:text-purple-600',
                  description: 'Essential nutrients for optimal health' 
                },
                'Protein Powders': { 
                  icon: FaDumbbell, 
                  bgColor: 'bg-orange-100', 
                  iconColor: 'text-orange-600',
                  hoverColor: 'group-hover:text-orange-600',
                  description: 'Premium nutrition for peak performance' 
                },
                'Health Services': { 
                  icon: FaHeart, 
                  bgColor: 'bg-pink-100', 
                  iconColor: 'text-pink-600',
                  hoverColor: 'group-hover:text-pink-600',
                  description: 'Professional health consultation services' 
                }
              };
              
              const config = categoryConfig[category.name] || { 
                icon: FaHeart, 
                bgColor: 'bg-gray-100', 
                iconColor: 'text-gray-600',
                hoverColor: 'group-hover:text-gray-600',
                description: 'Health and wellness products' 
              };
              const IconComponent = config.icon;
              
              return (
                <Link
                  key={category._id}
                  to={`/shop?category=${category._id}`}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className={`${config.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
                    </div>
                    <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${config.hoverColor} transition-colors`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors">
                      {config.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span className="mr-2">Explore Products</span>
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
                <FaClock className="mr-2" />
                Just Launched
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Latest Arrivals</h2>
              <p className="text-xl text-gray-600">Discover the newest additions to our health & wellness collection</p>
            </div>
            <Link 
              to="/shop?sort=newest"
              className="hidden md:inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              View All New
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.slice(0, 6).map(product => (
              <div key={product._id} className="group relative">
                <div className="absolute -top-3 -right-3 z-10">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    New
                  </span>
                </div>
                <ProductCard product={product} variant="grid" />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link
              to="/shop?sort=newest"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              View All New Products
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                <FaFire className="mr-2" />
                Trending Now
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Best Sellers</h2>
              <p className="text-xl text-gray-600">Most popular products loved by our customers</p>
            </div>
            <Link 
              to="/shop?sort=popular"
              className="hidden md:inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              View All Popular
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.slice(0, 6).map((product, index) => (
              <div key={product._id} className="group relative">
                <div className="absolute -top-3 -left-3 z-10">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
                    <FaTrophy className="mr-1 text-xs" />
                    #{index + 1}
                  </span>
                </div>
                <ProductCard product={product} variant="grid" />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link
              to="/shop?sort=popular"
              className="inline-flex items-center px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              View All Best Sellers
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose 20 Degrees?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">We're committed to providing the best health and wellness experience with premium products and exceptional service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaShippingFast className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Free Shipping</h3>
              <p className="text-blue-100">Free shipping on orders over $100 CAD with express delivery options</p>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaShieldAlt className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Secure Payment</h3>
              <p className="text-blue-100">100% secure payment processing with encryption and fraud protection</p>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaHeadset className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Expert Support</h3>
              <p className="text-blue-100">24/7 health and fitness expert support to guide your wellness journey</p>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaGift className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Health Rewards</h3>
              <p className="text-blue-100">Earn points on every purchase and unlock exclusive health benefits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <FaGift className="mr-2" />
            Exclusive Health Tips & Offers
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">Stay Updated on Your Health Journey</h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join our wellness community and get 15% off your first order, plus exclusive health tips, 
            product recommendations, and early access to new arrivals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email for health updates"
              className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-4 focus:ring-green-300 focus:outline-none text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <span>Get 15% Off</span>
              <FaArrowRight className="ml-2" />
            </button>
          </div>
          <p className="text-green-100 text-sm">
            🔒 We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
                <FaHeart className="mr-2" />
                Our Mission
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Empowering Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Health Revolution</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At 20 Degrees, we believe that optimal health is the foundation of a fulfilling life. 
                We curate the finest health monitoring devices, premium supplements, and fitness technology 
                to help you achieve your wellness goals.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaHeartbeat className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
                    <p className="text-gray-600 text-sm">Carefully selected products from trusted health and fitness brands</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaFlask className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Science-Backed</h4>
                    <p className="text-gray-600 text-sm">Evidence-based products that deliver real health benefits</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaUsers className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                    <p className="text-gray-600 text-sm">Health professionals available to guide your journey</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaAward className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Trusted Results</h4>
                    <p className="text-gray-600 text-sm">Thousands of satisfied customers transforming their health</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Your Journey
                  <FaArrowRight className="ml-2" />
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  <FaPlay className="mr-2" />
                  Watch Our Story
                </button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <img
                    src="/20-degrees-logo.png"
                    alt="20 Degrees Health & Wellness"
                    className="w-full h-64 object-contain mb-6"
                  />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">98%</div>
                      <div className="text-sm text-gray-600">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">50K+</div>
                      <div className="text-sm text-gray-600">Products Sold</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">24/7</div>
                      <div className="text-sm text-gray-600">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;