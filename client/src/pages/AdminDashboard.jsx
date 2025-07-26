import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaBoxOpen, 
  FaDollarSign,
  FaChartLine,
  FaPlus,
  FaList,
  FaEdit,
  FaTags,
  FaLayerGroup
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [stats, setStats] = useState({
    orders: { totalOrders: 0, totalRevenue: 0, recentOrders: 0 },
    categories: 0,
    products: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    
    fetchDashboardStats();
  }, [user, navigate]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch order statistics
      const orderStatsResponse = await Axios({
        ...SummaryApi.getOrderStats
      });

      // Fetch categories count
      const categoriesResponse = await Axios({
        ...SummaryApi.getCategories
      });

      // Fetch products count
      const productsResponse = await Axios({
        ...SummaryApi.getProducts,
        params: { limit: 1 } // Just to get count
      });

      setStats({
        orders: orderStatsResponse.data.success ? orderStatsResponse.data.data.total : 
               { totalOrders: 0, totalRevenue: 0, recentOrders: 0 },
        categories: categoriesResponse.data.success ? categoriesResponse.data.data.length : 0,
        products: productsResponse.data.success ? productsResponse.data.pagination.totalProducts : 0
      });
      
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.orders.totalOrders,
      icon: FaShoppingCart,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.orders.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: FaDollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Products',
      value: stats.products,
      icon: FaBoxOpen,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: FaTags,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Categories',
      description: 'Add, edit, or delete product categories',
      icon: FaTags,
      color: 'bg-blue-50 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      action: () => navigate('/admin/categories')
    },
    {
      title: 'Manage Products',
      description: 'Add, edit, or delete products',
      icon: FaBoxOpen,
      color: 'bg-purple-50 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      action: () => navigate('/admin/products')
    },
    {
      title: 'Manage Orders',
      description: 'View and manage customer orders',
      icon: FaShoppingCart,
      color: 'bg-orange-50 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      action: () => navigate('/admin/orders')
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: FaUsers,
      color: 'bg-red-50 hover:bg-red-100',
      iconColor: 'text-red-600',
      action: () => navigate('/admin/users')
    }
  ];

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {loading ? '...' : stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} p-4 rounded-lg text-left transition-colors duration-200`}
                >
                  <div className={`${action.iconColor} mb-3`}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <FaChartLine className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Analytics and recent activity coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
