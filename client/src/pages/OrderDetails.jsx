import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaBarcode,
  FaSync
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { formatPrice } from '../utils/currency';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetails();
    
    // Optional: Set up auto-refresh every 30 seconds to check for status updates
    const interval = setInterval(fetchOrderDetails, 30000);
    
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getUserOrder,
        url: `${SummaryApi.getUserOrder.url}/${orderId}`
      });

      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        setError('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'Placed':
        return <FaClock className="text-yellow-500 text-xl" />;
      case 'In Transit':
        return <FaTruck className="text-blue-500 text-xl" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500 text-xl" />;
      default:
        return <FaBox className="text-gray-500 text-xl" />;
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <FaTimesCircle className="mx-auto text-red-500 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/orders')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/orders')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <FaArrowLeft />
              <span>Back to Orders</span>
            </button>
            
            <button
              onClick={fetchOrderDetails}
              disabled={loading}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
          <p className="text-gray-600">Order #{order.orderId}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.delivery_status || 'Placed')}`}>
                  {order.delivery_status || 'Placed'}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                {getStatusIcon(order.delivery_status || 'Placed')}
                <div>
                  <p className="font-medium text-gray-900">
                    {order.delivery_status === 'Delivered' ? 'Order Delivered' :
                     order.delivery_status === 'In Transit' ? 'Order in Transit' :
                     'Order Placed'}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-6">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1.5 top-6 bottom-6 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 relative">
                      <div className="w-3 h-3 rounded-full bg-green-500 relative z-10"></div>
                      <div className="flex-1">
                        <p className="font-medium">Order Placed</p>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 relative">
                      <div className={`w-3 h-3 rounded-full relative z-10 ${
                        order.delivery_status === 'In Transit' ? 'bg-blue-500' :
                        order.delivery_status === 'Delivered' ? 'bg-green-500' : 
                        'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium">In Transit</p>
                        <p className="text-sm text-gray-500">
                          {order.delivery_status === 'In Transit' ? 'Processing' :
                           order.delivery_status === 'Delivered' ? 'Completed' : 
                           'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 relative">
                      <div className={`w-3 h-3 rounded-full relative z-10 ${
                        order.delivery_status === 'Delivered' 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-gray-500">
                          {order.delivery_status === 'Delivered' 
                            ? 'Completed' 
                            : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
              
              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      {item.product_details?.image?.[0] && (
                        <img
                          src={item.product_details.image[0]}
                          alt={item.product_details.name}
                          className="w-20 h-20 object-contain rounded-md border"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.product_details?.name || item.productId?.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Quantity:</span> {item.quantity || 1}
                          </div>
                          <div>
                            <span className="font-medium">Unit Price:</span> {formatPrice(item.price || 0)}
                          </div>
                          <div>
                            <span className="font-medium">Subtotal:</span> {formatPrice(item.subTotal || 0)}
                          </div>
                          <div>
                            <span className="font-medium">Payment Method:</span> {order.payment_method || 'COD'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Payment Status for entire order */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-700">Payment Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          order.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                          order.payment_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.payment_status || 'pending'}
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        Total: {formatPrice(order.totalAmt)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No products found in this order.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaBarcode />
                  <span>Order ID: {order.orderId}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaCalendarAlt />
                  <span>Placed: {formatDate(order.createdAt)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaCreditCard />
                  <span>Payment: {order.payment_method || 'COD'}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(order.subTotalAmt)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(order.totalAmt)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            {order.delivery_address && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <FaMapMarkerAlt />
                  <span>Delivery Address</span>
                </h2>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{order.delivery_address.address_line}</p>
                  <p>{order.delivery_address.city}, {order.delivery_address.state}</p>
                  <p>{order.delivery_address.pincode}</p>
                  {order.delivery_address.country && <p>{order.delivery_address.country}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
