import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaImage, 
  FaArrowLeft,
  FaSearch,
  FaTags 
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const SubCategoryManagement = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const [formData, setFormData] = useState({
    name: '',
    category: [],
    image: null,
    imagePreview: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchSubCategories();
    fetchCategories();
  }, [user, navigate]);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategories
      });

      if (response.data.success) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      showMessage('Failed to fetch subcategories', 'error');
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

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      category: checked 
        ? [...prev.category, value]
        : prev.category.filter(cat => cat !== value)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showMessage('Please select an image file', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showMessage('Image size must be less than 5MB', 'error');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: [],
      image: null,
      imagePreview: ''
    });
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showMessage('SubCategory name is required', 'error');
      return;
    }

    if (formData.category.length === 0) {
      showMessage('At least one category is required', 'error');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formData.category.forEach(cat => {
        formDataToSend.append('category', cat);
      });
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await Axios({
        ...SummaryApi.addSubCategory,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        showMessage('SubCategory added successfully', 'success');
        resetForm();
        setShowAddForm(false);
        fetchSubCategories();
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
      showMessage(error.response?.data?.message || 'Failed to add subcategory', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubCategory = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showMessage('SubCategory name is required', 'error');
      return;
    }

    if (formData.category.length === 0) {
      showMessage('At least one category is required', 'error');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formData.category.forEach(cat => {
        formDataToSend.append('category', cat);
      });
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        url: `${SummaryApi.updateSubCategory.url}/${editingSubCategory._id}`,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        showMessage('SubCategory updated successfully', 'success');
        resetForm();
        setShowEditModal(false);
        setEditingSubCategory(null);
        fetchSubCategories();
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
      showMessage(error.response?.data?.message || 'Failed to update subcategory', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        url: `${SummaryApi.deleteSubCategory.url}/${subCategoryId}`
      });

      if (response.data.success) {
        showMessage('SubCategory deleted successfully', 'success');
        fetchSubCategories();
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      showMessage(error.response?.data?.message || 'Failed to delete subcategory', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (subCategory) => {
    setEditingSubCategory(subCategory);
    setFormData({
      name: subCategory.name,
      category: subCategory.category?.map(cat => cat._id) || [],
      image: null,
      imagePreview: subCategory.image || ''
    });
    setShowEditModal(true);
  };

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">SubCategory Management</h1>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (showAddForm) {
                  resetForm();
                }
              }}
              className={`${showAddForm ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-lg flex items-center`}
            >
              <FaPlus className="mr-2" />
              {showAddForm ? 'Cancel' : 'Add SubCategory'}
            </button>
          </div>
        </div>

        {/* Inline Add SubCategory Form */}
        {showAddForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New SubCategory</h2>
            <form onSubmit={handleAddSubCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SubCategory Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter subcategory name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SubCategory Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  {formData.image && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ File selected: {formData.image.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Categories
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {categories.map((category) => (
                    <label key={category._id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={category._id}
                        checked={formData.category.includes(category._id)}
                        onChange={handleCategoryChange}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
                {formData.category.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">Please select at least one category</p>
                )}
              </div>

              {formData.imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || formData.category.length === 0}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Adding...' : 'Add SubCategory'}
                </button>
              </div>
            </form>
          </div>
        )}

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

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subcategories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* SubCategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubCategories.map((subCategory) => (
            <div key={subCategory._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {subCategory.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={subCategory.image}
                    alt={subCategory.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{subCategory.name}</h3>
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {subCategory.category?.map((cat, index) => (
                      <span
                        key={cat._id || index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Created: {new Date(subCategory.createdAt).toLocaleDateString()}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(subCategory)}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 flex items-center justify-center"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSubCategory(subCategory._id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center justify-center"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubCategories.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaTags className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No subcategories found</p>
          </div>
        )}

        {/* Add SubCategory Modal */}
        <Modal
          show={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          title="Add New SubCategory"
        >
          <form onSubmit={handleAddSubCategory} className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SubCategory Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter subcategory name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      value={category._id}
                      checked={formData.category.includes(category._id)}
                      onChange={handleCategoryChange}
                      className="mr-2"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SubCategory Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              />
              {formData.imagePreview && (
                <div className="mt-2">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add SubCategory'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit SubCategory Modal */}
        <Modal
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingSubCategory(null);
            resetForm();
          }}
          title="Edit SubCategory"
        >
          <form onSubmit={handleEditSubCategory} className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SubCategory Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter subcategory name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      value={category._id}
                      checked={formData.category.includes(category._id)}
                      onChange={handleCategoryChange}
                      className="mr-2"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SubCategory Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              />
              {formData.imagePreview && (
                <div className="mt-2">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingSubCategory(null);
                  resetForm();
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update SubCategory'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default SubCategoryManagement;
