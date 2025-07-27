import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaEye,
  FaClock,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaCreditCard,
  FaMapMarkerAlt,
  FaShoppingBag
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { formatPrice } from '../utils/currency';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    delivery_status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await Axios({
        ...SummaryApi.getUserOrders,
        url: `${SummaryApi.getUserOrders.url}?${queryParams.toString()}`
      });

      if (response.data.success) {
        setOrders(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500 text-lg" />;
      case 'Placed':
        return <FaClock className="text-yellow-500 text-lg" />;
      case 'In Transit':
        return <FaTruck className="text-blue-500 text-lg" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500 text-lg" />;
      default:
        return <FaBox className="text-gray-500 text-lg" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Placed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaShoppingBag className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage your order history</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={filters.delivery_status}
              onChange={(e) => handleFilterChange('delivery_status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Delivery Status</option>
              <option value="Placed">Placed</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>

            <select
              value={filters.payment_status || ''}
              onChange={(e) => handleFilterChange('payment_status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Payment Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="createdAt">Order Date</option>
              <option value="totalAmt">Amount</option>
              <option value="payment_status">Status</option>
            </select>

            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
            <FaTimesCircle />
            <span>{error}</span>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <FaBox className="text-gray-400 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <button 
                onClick={() => navigate('/shop')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(order.delivery_status || order.payment_status)}
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">Order #{order.orderId}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <FaCalendarAlt className="text-xs" />
                              <span>{formatDate(order.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.delivery_status || 'Placed')}`}>
                          {order.delivery_status || 'Placed'}
                        </span>
                      </div>

                      {/* Product Details */}
                      {order.items && order.items.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
                              {item.product_details?.image?.[0] && (
                                <img
                                  src={item.product_details.image[0]}
                                  alt={item.product_details.name}
                                  className="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-white"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-1">
                                  {item.product_details?.name || item.productId?.name}
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                  <div>Qty: {item.quantity || 1}</div>
                                  <div>Subtotal: {formatPrice(item.subTotal || 0)}</div>
                                </div>
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <FaCreditCard />
                                    <span>Payment: {order.payment_method || 'COD'}</span>
                                  </div>
                                  <div>Status: {order.payment_status || 'pending'}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 1 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-700">Total Items: {order.items.reduce((total, item) => total + (item.quantity || 0), 0)}</span>
                                <span className="font-medium text-gray-900">Order Total: {formatPrice(order.totalAmt)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Delivery Address */}
                      {order.delivery_address && (
                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                          <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700">Delivery Address:</p>
                            <p>{order.delivery_address.address_line}</p>
                            <p>{order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.pincode}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:text-right">
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatPrice(order.totalAmt)}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleViewDetails(order._id)}
                        className="w-full lg:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <FaEye />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-gray-700 bg-gray-50 rounded-lg">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
