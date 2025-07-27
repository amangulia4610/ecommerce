import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaEye, 
  FaFilter, 
  FaStar,
  FaSearch,
  FaSort,
  FaThLarge,
  FaList,
  FaTh,
  FaHome,
  FaChevronRight,
  FaShoppingCart,
  FaCheck
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { useCart } from '../hooks/useCart';
import { formatPrice, calculateDiscountedPrice } from '../utils/currency';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const { addToCart } = useCart();
  
  // Get URL parameters
  const urlSearchQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || '';
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    search: urlSearchQuery,
    category: urlCategory,
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'asc',
    page: 1,
    limit: 12
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Helper function to check if product is in cart
  const getCartItem = (productId) => {
    return cart.items.find(item => item.productId?._id === productId);
  };

  // Update filters when URL parameters change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: urlSearchQuery,
      category: urlCategory,
      page: 1
    }));
  }, [urlSearchQuery, urlCategory]);

  // Breadcrumb component
  const Breadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Home', path: '/', icon: FaHome }
    ];
    
    breadcrumbs.push({ label: 'Shop', path: '/shop' });
    
    if (urlSearchQuery) {
      breadcrumbs.push({ 
        label: `Search results for "${urlSearchQuery}"`, 
        path: `/shop?q=${urlSearchQuery}`,
        isSearch: true
      });
    } else if (urlCategory) {
      const category = categories.find(cat => cat._id === urlCategory);
      if (category) {
        breadcrumbs.push({ 
          label: category.name, 
          path: `/shop?category=${urlCategory}` 
        });
      }
    }
    
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <FaChevronRight className="w-3 h-3 text-gray-400" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="flex items-center space-x-1 text-gray-900 font-medium">
                {crumb.icon && <crumb.icon className="w-4 h-4" />}
                {crumb.isSearch && <FaSearch className="w-3 h-3" />}
                <span>{crumb.label}</span>
              </span>
            ) : (
              <Link 
                to={crumb.path}
                className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
              >
                {crumb.icon && <crumb.icon className="w-4 h-4" />}
                <span>{crumb.label}</span>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        publish: 'true' // Only show published products
      };

      const response = await Axios({
        ...SummaryApi.getProducts,
        params
      });

      if (response.data.success) {
        setProducts(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'asc',
      page: 1,
      limit: 12
    });
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {urlSearchQuery ? `Search Results` : 'Shop'}
            </h1>
            <p className="text-gray-600">
              {urlSearchQuery 
                ? `Found ${pagination.totalProducts} products for "${urlSearchQuery}"`
                : 'Discover our amazing collection of products'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    handleFilterChange('sortBy', sortBy);
                    handleFilterChange('sortOrder', sortOrder);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Showing {products.length} of {pagination.totalProducts} products
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <FaTh />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'list' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                {urlSearchQuery ? (
                  <>
                    <FaSearch className="mx-auto text-gray-400 text-6xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No results found for "{urlSearchQuery}"
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try searching with different keywords or browse our categories below.
                    </p>
                    <Link 
                      to="/shop" 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse All Products
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="mx-auto text-gray-400 text-6xl mb-4">🛍️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                  </>
                )}
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-6"
              }>
                {products.map(product => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    variant={viewMode === 'grid' ? 'grid' : 'list'}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 || 
                      page === pagination.totalPages || 
                      (page >= pagination.currentPage - 2 && page <= pagination.currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg ${
                            page === pagination.currentPage
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === pagination.currentPage - 3 ||
                      page === pagination.currentPage + 3
                    ) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
