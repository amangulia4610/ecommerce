import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUser, 
  FaShoppingBag, 
  FaMapMarkerAlt, 
  FaSignOutAlt,
  FaCog,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaChevronDown
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout: logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuRef = useRef(null);

  // Form state for editing user details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        password: ''
      });
    }
  }, [user]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar/Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
          {user.verify_email && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
        <FaChevronDown className={`hidden md:block w-3 h-3 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Account Menu</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <FaTimes className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-bold border-2 border-gray-200">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
              <div>
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.email}</p>
                {user.verify_email && (
                  <span className="inline-flex items-center text-xs text-green-600">
                    <FaCheck className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={() => {
                navigate('/my-account');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
            >
              <FaUser className="w-4 h-4" />
              <span className="text-sm font-medium">My Account</span>
            </button>
            
            {user?.role === 'ADMIN' && (
              <button
                onClick={() => {
                  navigate('/admin');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-purple-50 rounded-lg transition-colors text-purple-600"
              >
                <FaCog className="w-4 h-4" />
                <span className="text-sm font-medium">Admin Dashboard</span>
              </button>
            )}
            
            <button 
              onClick={() => {
                navigate('/orders');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FaShoppingBag className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Order History</span>
            </button>
            
            <button 
              onClick={() => {
                navigate('/addresses');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FaMapMarkerAlt className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Manage Addresses</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
