import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaArrowLeft,
  FaSearch,
  FaUser,
  FaUsers,
  FaUserShield,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const UserManagement = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    verifiedUsers: 0,
    activeUsers: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user, navigate, searchTerm, roleFilter, statusFilter, verificationFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (verificationFilter) {
        params.append('verify_email', verificationFilter === 'verified' ? 'true' : 'false');
      }
      params.append('page', '1');
      params.append('limit', '50');

      // Fetch users from database
      const response = await Axios({
        url: `${SummaryApi.adminAllUsers.url}?${params.toString()}`,
        method: SummaryApi.adminAllUsers.method
      });

      if (response.data.success) {
        setUsers(response.data.data);
        
        // Fetch user statistics
        const statsResponse = await Axios({
          url: SummaryApi.adminUserStats.url,
          method: SummaryApi.adminUserStats.method
        });

        if (statsResponse.data.success) {
          setUserStats(statsResponse.data.data);
        }
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
      
    } catch (error) {
      console.error('Error fetching users:', error);
      showMessage('Failed to fetch users: ' + (error.response?.data?.message || error.message), 'error');
      
      // Fallback to empty array on error
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleViewUser = (userData) => {
    setSelectedUser(userData);
    setShowUserModal(true);
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    const roleName = newRole === 'USER' ? 'User' : newRole === 'ADMIN' ? 'Admin' : newRole;
    
    if (!window.confirm(`Are you sure you want to change this user's role to ${roleName}?`)) {
      return;
    }

    try {
      setLoading(true);
      
      const response = await Axios({
        url: `${SummaryApi.adminUpdateUserRole.url}/${userId}/role`,
        method: SummaryApi.adminUpdateUserRole.method,
        data: { role: newRole }
      });

      if (response.data.success) {
        // Update local state
        setUsers(prev => prev.map(u => 
          u._id === userId ? { ...u, role: newRole } : u
        ));
        
        showMessage(`User role updated to ${roleName}`, 'success');
        setShowUserModal(false);
        
        // Refresh user stats
        fetchUsers();
      } else {
        throw new Error(response.data.message || 'Failed to update user role');
      }
      
    } catch (error) {
      console.error('Error updating user role:', error);
      showMessage('Failed to update user role: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserStatus = async (userId, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this user?`)) {
      return;
    }

    try {
      setLoading(true);
      
      const response = await Axios({
        url: `${SummaryApi.adminUpdateUserStatus.url}/${userId}/status`,
        method: SummaryApi.adminUpdateUserStatus.method,
        data: { status: newStatus }
      });

      if (response.data.success) {
        // Update local state
        setUsers(prev => prev.map(u => 
          u._id === userId ? { ...u, status: newStatus } : u
        ));
        
        showMessage(`User status updated to ${newStatus}`, 'success');
        setShowUserModal(false);
        
        // Refresh user stats
        fetchUsers();
      } else {
        throw new Error(response.data.message || 'Failed to update user status');
      }
      
    } catch (error) {
      console.error('Error updating user status:', error);
      showMessage('Failed to update user status: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'USER': return 'User';
      case 'ADMIN': return 'Admin';
      default: return role;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'text-purple-600 bg-purple-100';
      case 'USER': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-yellow-600 bg-yellow-100';
      case 'Suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <FaUsers className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">
                  {userStats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg">
                <FaUserShield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admin Users</p>
                <p className="text-2xl font-bold text-purple-600">
                  {userStats.adminUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <FaCheck className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {userStats.verifiedUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-lg">
                <FaUser className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-orange-600">
                  {userStats.activeUsers}
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
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Verification</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing: {users.length} users
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((userData) => (
                  <tr key={userData._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {userData.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={userData.avatar}
                              alt={userData.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <FaUser className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {userData.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {userData._id?.slice(-8) || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{userData.email}</div>
                      <div className="text-sm text-gray-500">{userData.mobile || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(userData.role)}`}>
                        {getRoleDisplayName(userData.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(userData.status)}`}>
                        {userData.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userData.verify_email ? (
                        <span className="inline-flex items-center text-green-600">
                          <FaCheck className="mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-600">
                          <FaTimes className="mr-1" />
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(userData.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewUser(userData)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaUsers className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}

        {/* User Details Modal */}
        <Modal
          show={showUserModal}
          onClose={() => setShowUserModal(false)}
          title={`User Details - ${selectedUser?.name}`}
          size="max-w-3xl"
        >
          {selectedUser && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">User Information</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      {selectedUser.avatar ? (
                        <img
                          src={selectedUser.avatar}
                          alt={selectedUser.name}
                          className="w-16 h-16 rounded-full"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                          <FaUser className="h-8 w-8 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <h5 className="text-lg font-medium text-gray-900">{selectedUser.name}</h5>
                        <p className="text-sm text-gray-600">ID: {selectedUser._id}</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 text-gray-900">{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Mobile:</span>
                        <span className="ml-2 text-gray-900">{selectedUser.mobile || 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Joined:</span>
                        <span className="ml-2 text-gray-900">{formatDate(selectedUser.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Last Login:</span>
                        <span className="ml-2 text-gray-900">{formatDate(selectedUser.last_login_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">Current Status</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Role:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                          {getRoleDisplayName(selectedUser.role)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Email Verified:</span>
                        <span className={`flex items-center ${selectedUser.verify_email ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedUser.verify_email ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                          {selectedUser.verify_email ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Management Actions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">User Management</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">Change Role</h5>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleUpdateUserRole(selectedUser._id, 'USER')}
                        disabled={selectedUser.role === 'USER'}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedUser.role === 'USER'
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        Set as User
                      </button>
                      <button
                        onClick={() => handleUpdateUserRole(selectedUser._id, 'ADMIN')}
                        disabled={selectedUser.role === 'ADMIN'}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedUser.role === 'ADMIN'
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        Set as Admin
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">Change Status</h5>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleUpdateUserStatus(selectedUser._id, 'Active')}
                        disabled={selectedUser.status === 'Active'}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedUser.status === 'Active'
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        Activate User
                      </button>
                      <button
                        onClick={() => handleUpdateUserStatus(selectedUser._id, 'Inactive')}
                        disabled={selectedUser.status === 'Inactive'}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedUser.status === 'Inactive'
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-yellow-600 text-white hover:bg-yellow-700'
                        }`}
                      >
                        Deactivate User
                      </button>
                      <button
                        onClick={() => handleUpdateUserStatus(selectedUser._id, 'Suspended')}
                        disabled={selectedUser.status === 'Suspended'}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedUser.status === 'Suspended'
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Suspend User
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FaExclamationTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="text-sm text-yellow-800">
                        Be careful when changing user roles and status. These actions affect user access and permissions.
                      </p>
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

export default UserManagement;
