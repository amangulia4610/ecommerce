import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaDollarSign,
  FaCalendarAlt,
  FaUser,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { formatPrice } from '../utils/currency';

const OrderManagement = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    orderCount: 0
  });
  const [loading, setLoading] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0
  });

  const [statusUpdate, setStatusUpdate] = useState({
    payment_status: '',
    paymentId: '',
    invoice_receipt: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchOrders();
    fetchOrderStats();
  }, [user, navigate, searchTerm, statusFilter, dateFilter]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { payment_status: statusFilter }),
        ...(dateFilter && { startDate: dateFilter })
      };

      const response = await Axios({
        ...SummaryApi.getOrders,
        params
      });

      if (response.data.success) {
        setOrders(response.data.data);
        setPagination(response.data.pagination);
        if (response.data.statistics) {
          setOrderStats(response.data.statistics);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      showMessage('Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStats = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderStats
      });

      if (response.data.success) {
        setOrderStats(response.data.data.total);
      }
    } catch (error) {
      console.error('Error fetching order stats:', error);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleViewOrder = async (orderId) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getOrder,
        url: `${SummaryApi.getOrder.url}/${orderId}`
      });

      if (response.data.success) {
        setSelectedOrder(response.data.data);
        setStatusUpdate({
          payment_status: response.data.data.payment_status || '',
          paymentId: response.data.data.paymentId || '',
          invoice_receipt: response.data.data.invoice_receipt || ''
        });
        setShowOrderModal(true);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      showMessage('Failed to fetch order details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateOrderStatus,
        url: `${SummaryApi.updateOrderStatus.url}/${selectedOrder._id}`,
        data: statusUpdate
      });

      if (response.data.success) {
        showMessage('Order status updated successfully', 'success');
        setShowOrderModal(false);
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      showMessage(error.response?.data?.message || 'Failed to update order status', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.deleteOrder,
        url: `${SummaryApi.deleteOrder.url}/${orderId}`
      });

      if (response.data.success) {
        showMessage('Order deleted successfully', 'success');
        fetchOrders();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      showMessage(error.response?.data?.message || 'Failed to delete order', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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

  const Modal = ({ show, onClose, title, children, size = 'max-w-2xl' }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-lg ${size} w-full max-h-[90vh] overflow-y-auto`}>
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <FaShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orderStats.totalOrders || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <FaDollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(orderStats.totalRevenue || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg">
                <FaBox className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Order</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatPrice(orderStats.averageOrderValue || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' :
            message.type === 'error' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
          />

          <div className="text-sm text-gray-600 flex items-center">
            Total: {pagination.totalOrders} orders
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{order.orderId}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {order._id.slice(-8)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.userId?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.userId?.email || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {order.productId?.image?.[0] && (
                          <img
                            className="h-10 w-10 rounded-lg mr-3"
                            src={order.productId.image[0]}
                            alt={order.productId?.name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.productId?.name || order.product_details?.name || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(order.totalAmt || 0)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Subtotal: {formatPrice(order.subTotalAmt || 0)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.payment_status)}`}>
                        {order.payment_status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewOrder(order._id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orders.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => fetchOrders(page)}
                  className={`px-3 py-2 rounded ${
                    page === pagination.currentPage
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        <Modal
          show={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          title={`Order Details - ${selectedOrder?.orderId}`}
          size="max-w-4xl"
        >
          {selectedOrder && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Order Information</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Order ID:</span>
                        <p className="text-gray-900">{selectedOrder.orderId}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Date:</span>
                        <p className="text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Payment ID:</span>
                        <p className="text-gray-900">{selectedOrder.paymentId || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Status:</span>
                        <p className={`font-medium ${getStatusColor(selectedOrder.payment_status).includes('green') ? 'text-green-600' : getStatusColor(selectedOrder.payment_status).includes('yellow') ? 'text-yellow-600' : getStatusColor(selectedOrder.payment_status).includes('red') ? 'text-red-600' : 'text-gray-600'}`}>
                          {selectedOrder.payment_status || 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <h4 className="text-lg font-semibold text-gray-900">Customer Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <p className="text-gray-900">{selectedOrder.userId?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <p className="text-gray-900">{selectedOrder.userId?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Mobile:</span>
                        <p className="text-gray-900">{selectedOrder.userId?.mobile || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <h4 className="text-lg font-semibold text-gray-900">Product Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {selectedOrder.productId?.image?.[0] && (
                        <img
                          src={selectedOrder.productId.image[0]}
                          alt={selectedOrder.productId.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedOrder.productId?.name || selectedOrder.product_details?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: {selectedOrder.productId?.price ? formatPrice(selectedOrder.productId.price) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Status Update */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Update Order Status</h4>
                  
                  <form onSubmit={handleUpdateOrderStatus} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Status
                      </label>
                      <select
                        value={statusUpdate.payment_status}
                        onChange={(e) => setStatusUpdate(prev => ({
                          ...prev,
                          payment_status: e.target.value
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment ID
                      </label>
                      <input
                        type="text"
                        value={statusUpdate.paymentId}
                        onChange={(e) => setStatusUpdate(prev => ({
                          ...prev,
                          paymentId: e.target.value
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter payment ID"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Invoice Receipt
                      </label>
                      <input
                        type="text"
                        value={statusUpdate.invoice_receipt}
                        onChange={(e) => setStatusUpdate(prev => ({
                          ...prev,
                          invoice_receipt: e.target.value
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter invoice receipt"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update Order Status'}
                    </button>
                  </form>

                  {/* Payment Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">Payment Summary</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900">{formatPrice(selectedOrder.subTotalAmt || 0)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium text-gray-900">Total:</span>
                        <span className="font-medium text-gray-900">{formatPrice(selectedOrder.totalAmt || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default OrderManagement;
