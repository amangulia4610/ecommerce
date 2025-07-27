import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaEye, 
  FaFilter, 
  FaStar,
  FaSearch,
  FaSort,
  FaTh,
  FaList,
  FaTimes
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { formatPrice, calculateDiscountedPrice } from '../utils/currency';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    page: parseInt(searchParams.get('page')) || 1,
    limit: 12
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });

  useEffect(() => {
    // Update search term from URL when component mounts or URL changes
    const urlSearchTerm = searchParams.get('q') || '';
    if (urlSearchTerm !== filters.search) {
      setFilters(prev => ({
        ...prev,
        search: urlSearchTerm,
        page: 1
      }));
    }
    fetchProducts();
    fetchCategories();
  }, [searchParams]);

  useEffect(() => {
    // Only fetch products when filters change (not on initial mount)
    if (filters.search || filters.category || filters.minPrice || filters.maxPrice) {
      fetchProducts();
    }
  }, [filters]);

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'limit') {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        publish: 'true'
      };

      // Only make API call if there are search criteria
      if (!params.search && !params.category && !params.minPrice && !params.maxPrice) {
        // Show featured/popular products when no search criteria
        params.sortBy = 'createdAt';
        params.sortOrder = 'desc';
        params.limit = 8;
      }

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
      page: 1
    }));
    
    // Update URL immediately for search term
    if (key === 'search') {
      const newParams = new URLSearchParams(searchParams);
      if (value.trim()) {
        newParams.set('q', value.trim());
      } else {
        newParams.delete('q');
      }
      setSearchParams(newParams);
    }
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
      sortOrder: 'desc',
      page: 1,
      limit: 12
    });
  };

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
          <span className="text-sm text-gray-500">
            Stock: {product.stock || 0}
          </span>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex">
        <div className="relative w-48 h-32">
          <img
            src={product.image?.[0] || '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              -{product.discount}%
            </div>
          )}
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap gap-1 mb-2">
                {product.category?.slice(0, 3).map((cat, index) => (
                  <span
                    key={cat._id || index}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">(4.5)</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.description || 'No description available'}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Stock: {product.stock || 0}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 ml-4">
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <FaHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <FaEye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {filters.search ? 'Search Results' : 'Discover Products'}
            </h1>
            <p className="text-gray-600">
              {filters.search 
                ? `Results for "${filters.search}"` 
                : 'Explore our collection or search for specific products'
              }
            </p>
            {!filters.search && products.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Showing {products.length} featured products
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
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
                    {filters.search || filters.category || filters.minPrice || filters.maxPrice
                      ? `Showing ${products.length} of ${pagination.totalProducts} results`
                      : `Showing ${products.length} featured products`
                    }
                  </span>
                  {filters.search && (
                    <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      Search: "{filters.search}"
                    </span>
                  )}
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
                <FaSearch className="mx-auto text-gray-400 text-6xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filters.search || filters.category || filters.minPrice || filters.maxPrice
                    ? 'No Products Found'
                    : 'Start Searching'
                  }
                </h3>
                <p className="text-gray-600 mb-4">
                  {filters.search 
                    ? `No products found for "${filters.search}". Try different keywords or adjust your filters.`
                    : filters.category || filters.minPrice || filters.maxPrice
                    ? 'No products match your current filters. Try adjusting them.'
                    : 'Use the search bar above to find products, or browse our categories.'
                  }
                </p>
                {(filters.search || filters.category || filters.minPrice || filters.maxPrice) && (
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-6"
              }>
                {products.map(product => (
                  viewMode === 'grid' 
                    ? <ProductCard key={product._id} product={product} />
                    : <ProductListItem key={product._id} product={product} />
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

export default Search;