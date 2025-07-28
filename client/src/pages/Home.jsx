import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowRight,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaStar,
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
  FaRunning,
  FaPercent,
  FaTags,
  FaBolt,
  FaEye,
  FaShoppingCart
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
          limit: 8,
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
          limit: 8,
          publish: 'true',
          sortBy: 'stock',
          sortOrder: 'desc' // Lower stock suggests higher sales
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

  // Helper function to get category ID by name
  const getCategoryLink = (categoryName) => {
    const category = categories.find(cat => cat.name.toLowerCase().includes(categoryName.toLowerCase()));
    return category ? `/shop?category=${category._id}` : '/shop';
  };

  const heroSlides = [
    {
      title: "Premium Health & Wellness",
      subtitle: "Transform Your Lifestyle",
      description: "Discover cutting-edge health technology, premium supplements, and fitness solutions for the modern wellness enthusiast",
      buttonText: "Explore Collection",
      secondaryText: "View Smartwatches",
      image: "/apple-watch.png",
      bgColor: "from-slate-900 via-purple-900 to-slate-900",
      category: "Smartwatches",
      offer: "Up to 40% Off"
    },
    {
      title: "Science-Backed Nutrition",
      subtitle: "Fuel Your Performance",
      description: "Premium protein powders and multivitamins formulated by nutritionists for optimal health and performance",
      buttonText: "Shop Nutrition",
      secondaryText: "View Protein Powders",
      image: "/protien.png",
      bgColor: "from-emerald-900 via-teal-900 to-emerald-900",
      category: "Protein Powders",
      offer: "Buy 2 Get 1 Free"
    },
    {
      title: "Advanced Health Monitoring",
      subtitle: "Your Health, Simplified",
      description: "Professional-grade health monitors and fitness trackers for real-time insights into your wellness journey",
      buttonText: "Monitor Health",
      secondaryText: "View Fitness Bands",
      image: "/fitbit inspire 3.png",
      bgColor: "from-indigo-900 via-blue-900 to-indigo-900",
      category: "Fitness Bands",
      offer: "Free Shipping"
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Modern Luxury Design */}
      <section className="relative h-[80vh] overflow-hidden bg-black">
        <div className="absolute inset-0 flex transition-transform duration-700 ease-out"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide, index) => (
            <div key={index} className={`min-w-full h-full bg-gradient-to-r ${slide.bgColor} flex items-center relative overflow-hidden`}>
              {/* Modern overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]"></div>
              
              <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-between relative z-10">
                <div className="max-w-2xl text-white">
                  {/* Premium badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6 border border-white/20">
                    <FaTags className="text-yellow-400" />
                    <span>{slide.offer}</span>
                    <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                    <span className="text-yellow-400">{slide.subtitle}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => navigate('/shop')}
                      className="group bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/25 flex items-center justify-center gap-3"
                    >
                      <span>{slide.buttonText}</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => navigate(getCategoryLink(slide.category))}
                      className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
                    >
                      <FaEye className="text-sm" />
                      <span>{slide.secondaryText}</span>
                    </button>
                  </div>
                </div>
                
                {/* Product showcase */}
                <div className="hidden lg:block relative">
                  <div className="relative group">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-80 h-80 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Arrow navigation - Hidden on mobile */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20 hidden md:flex"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20 hidden md:flex"
        >
          <FaChevronRight />
        </button>
      </section>


      {/* Quick Stats - Modern Cards */}
      <section className="relative -mt-20 z-10 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaTrophy, label: "Premium Products", value: `${stats.totalProducts}+`, color: "blue" },
              { icon: FaUsers, label: "Happy Customers", value: `${stats.totalCustomers.toLocaleString()}+`, color: "green" },
              { icon: FaChartLine, label: "Orders Delivered", value: `${stats.totalOrders.toLocaleString()}+`, color: "purple" },
              { icon: FaAward, label: "Health Categories", value: `${stats.totalCategories}+`, color: "orange" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      

      {/* Categories Section - Modern Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our curated collection of premium health and wellness products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const categoryConfig = {
                'Smartwatches': { 
                  icon: FaWatch, 
                  gradient: 'from-blue-500 to-cyan-500',
                  bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
                  description: 'Advanced fitness tracking & health monitoring',
                  products: '25+ Products'
                },
                'Fitness Bands': { 
                  icon: FaRunning, 
                  gradient: 'from-green-500 to-emerald-500',
                  bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-50',
                  description: 'Lightweight tracking for active lifestyles',
                  products: '18+ Products'
                },
                'Health Monitors': { 
                  icon: FaHeartbeat, 
                  gradient: 'from-red-500 to-pink-500',
                  bgPattern: 'bg-gradient-to-br from-red-50 to-pink-50',
                  description: 'Professional health monitoring devices',
                  products: '12+ Products'
                },
                'Multivitamins': { 
                  icon: FaFlask, 
                  gradient: 'from-purple-500 to-violet-500',
                  bgPattern: 'bg-gradient-to-br from-purple-50 to-violet-50',
                  description: 'Essential nutrients for optimal health',
                  products: '30+ Products'
                },
                'Protein Powders': { 
                  icon: FaDumbbell, 
                  gradient: 'from-orange-500 to-amber-500',
                  bgPattern: 'bg-gradient-to-br from-orange-50 to-amber-50',
                  description: 'Premium nutrition for peak performance',
                  products: '20+ Products'
                },
                'Health Services': { 
                  icon: FaHeart, 
                  gradient: 'from-pink-500 to-rose-500',
                  bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-50',
                  description: 'Professional health consultation services',
                  products: '8+ Services'
                }
              };
              
              const config = categoryConfig[category.name] || { 
                icon: FaHeart, 
                gradient: 'from-gray-500 to-slate-500',
                bgPattern: 'bg-gradient-to-br from-gray-50 to-slate-50',
                description: 'Health and wellness products',
                products: '10+ Products'
              };
              
              const IconComponent = config.icon;
              
              return (
                <Link
                  key={category._id}
                  to={`/shop?category=${category._id}`}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 ${config.bgPattern} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-500">{config.products}</div>
                        <FaArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300 ml-auto mt-1" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Best Sellers</h2>
              <p className="text-lg text-gray-600">Most loved products by our community</p>
            </div>
            <Link 
              to="/shop?sort=popular"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 8).map((product, index) => (
              <div key={product._id} className="group relative">
                <div className="absolute -top-2 -left-2 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <FaTrophy className="text-xs" />
                    #{index + 1}
                  </div>
                </div>
                <ProductCard product={product} variant="grid" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaBolt className="text-green-500" />
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Just Launched</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-lg text-gray-600">Latest additions to our premium collection</p>
            </div>
            <Link 
              to="/shop?sort=newest"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Explore New
              <FaArrowRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 8).map(product => (
              <div key={product._id} className="group relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    New
                  </div>
                </div>
                <ProductCard product={product} variant="grid" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.3),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.3),transparent)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose 20 Degrees?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Experience premium service with every order</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaShippingFast,
                title: "Free Express Shipping",
                description: "Free shipping on orders over $100 CAD with same-day delivery in major cities",
                color: "blue"
              },
              {
                icon: FaShieldAlt,
                title: "Secure & Safe",
                description: "Bank-level security with 256-bit SSL encryption and fraud protection",
                color: "green"
              },
              {
                icon: FaHeadset,
                title: "24/7 Expert Support",
                description: "Health professionals available round the clock for guidance",
                color: "purple"
              },
              {
                icon: FaGift,
                title: "Rewards Program",
                description: "Earn points on every purchase and unlock exclusive member benefits",
                color: "orange"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.1),transparent)]"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
            <FaGift className="text-yellow-300" />
            <span>Exclusive Offers</span>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <span className="text-yellow-300">Health Tips</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Wellness Community
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Get <span className="font-bold text-yellow-300">15% off</span> your first order plus exclusive health tips, 
            product launches, and member-only discounts
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl border-0 text-gray-900 placeholder:text-gray-500 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
            />
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl">
              Get 15% Off
            </button>
          </div>
          
          <p className="text-white/80 text-sm flex items-center justify-center gap-2">
            <FaShieldAlt className="text-green-300" />
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                <FaHeart />
                <span>Our Mission</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Health Revolution</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At 20 Degrees, we believe optimal health is the foundation of a fulfilling life. 
                We curate premium health technology, supplements, and wellness solutions to help you achieve your goals.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: FaHeartbeat, title: "Premium Quality", desc: "Carefully curated from trusted brands" },
                  { icon: FaFlask, title: "Science-Backed", desc: "Evidence-based health solutions" },
                  { icon: FaUsers, title: "Expert Support", desc: "Health professionals at your service" },
                  { icon: FaAward, title: "Proven Results", desc: "Thousands of success stories" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Start Your Journey
                  <FaArrowRight />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  <FaPlay />
                  Watch Our Story
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <img
                    src="/20-degrees-weight-management-app.png"
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