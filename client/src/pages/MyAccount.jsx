import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUser, 
  FaEdit, 
  FaCamera, 
  FaCog,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaExclamationTriangle,
  FaArrowLeft,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const fileInputRef = useRef(null);

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

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      showMessage('Please select an image file', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      showMessage('File size must be less than 5MB', 'error');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Update user data in store
        updateUser({ ...user, avatar: response.data.data.avatar });
        showMessage('Avatar updated successfully', 'success');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      showMessage(error.response?.data?.message || 'Failed to upload avatar', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      
      // Prepare update data (only send fields that have changed or are not empty)
      const updateData = {};
      if (formData.name !== user.name) updateData.name = formData.name;
      if (formData.email !== user.email) updateData.email = formData.email;
      if (formData.mobile !== user.mobile) updateData.mobile = formData.mobile;
      if (formData.password) updateData.password = formData.password;

      if (Object.keys(updateData).length === 0) {
        showMessage('No changes to update', 'info');
        setIsEditMode(false);
        return;
      }

      const response = await Axios({
        ...SummaryApi.updateUser,
        data: updateData
      });

      if (response.data.success) {
        // Update user data in store (exclude password from display)
        const updatedUser = { ...response.data.data };
        delete updatedUser.password;
        updateUser(updatedUser);
        
        setIsEditMode(false);
        setFormData(prev => ({ ...prev, password: '' })); // Clear password field
        showMessage('Profile updated successfully', 'success');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      showMessage(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const formatDateWithTime = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-yellow-600 bg-yellow-100';
      case 'Suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'text-purple-600 bg-purple-100';
      case 'USER': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleResendVerificationEmail = async () => {
    try {
      setLoading(true);
      
      const response = await Axios({
        ...SummaryApi.resendVerificationEmail
      });

      if (response.data.success) {
        showMessage('Verification email sent successfully! Please check your inbox.', 'success');
      }
    } catch (error) {
      console.error('Resend verification email error:', error);
      showMessage(error.response?.data?.message || 'Failed to send verification email', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account information and settings</p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
            message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' :
            'bg-blue-100 text-blue-700 border border-blue-200'
          } flex items-center justify-between`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ text: '', type: '' })}>
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                {!isEditMode && (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {/* Avatar Section */}
              <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-200">
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-gray-200">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <FaCamera className="w-4 h-4" />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {user.verify_email ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                        <FaCheck className="w-3 h-3 mr-1" />
                        Email Verified
                      </span>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                          <FaExclamationTriangle className="w-3 h-3 mr-1" />
                          Email Not Verified
                        </span>
                        <button
                          onClick={handleResendVerificationEmail}
                          disabled={loading}
                          className="text-xs text-blue-600 hover:text-blue-800 underline disabled:text-gray-400 disabled:no-underline"
                        >
                          {loading ? 'Sending...' : 'Resend Email'}
                        </button>
                      </div>
                    )}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              {isEditMode ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                          placeholder="Leave empty to keep current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <FaEyeSlash className="w-5 h-5 text-gray-400" /> : <FaEye className="w-5 h-5 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <FaSave className="w-4 h-4" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditMode(false);
                        setFormData({
                          name: user.name || '',
                          email: user.email || '',
                          mobile: user.mobile || '',
                          password: ''
                        });
                      }}
                      disabled={loading}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaUser className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Full Name</p>
                        <p className="text-gray-600">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaEnvelope className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email Address</p>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.mobile && (
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <FaPhone className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Mobile Number</p>
                          <p className="text-gray-600">{user.mobile}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaCog className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Account Role</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Statistics */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaCalendarAlt className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member Since</p>
                    <p className="text-xs text-gray-600">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
                
                {user.last_login_date && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaCalendarAlt className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Login</p>
                      <p className="text-xs text-gray-600">{formatDateWithTime(user.last_login_date)}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaCog className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Account Status</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/orders')}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">View Orders</span>
                </button>
                
                <button 
                  onClick={() => navigate('/addresses')}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Manage Addresses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
