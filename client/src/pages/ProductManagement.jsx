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
  FaEye,
  FaEyeSlash,
  FaTags,
  FaLayerGroup,
  FaDollarSign,
  FaBoxOpen
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { formatPrice } from '../utils/currency';

const ProductManagement = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPublish, setFilterPublish] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    category: [],
    unit: '',
    stock: '',
    price: '',
    discount: '',
    description: '',
    more_details: '',
    publish: true,
    images: [],
    imagePreviews: [],
    imagesToDelete: [] // Track images to delete
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchProducts();
    fetchCategories();
  }, [user, navigate, searchTerm, filterCategory, filterPublish]);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        ...(searchTerm && { search: searchTerm }),
        ...(filterCategory && { category: filterCategory }),
        ...(filterPublish !== '' && { publish: filterPublish })
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
      showMessage('Failed to fetch products', 'error');
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayFieldChange = (e, fieldName) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [fieldName]: checked 
        ? [...prev[fieldName], value]
        : prev[fieldName].filter(item => item !== value)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        showMessage('Only image files are allowed', 'error');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        showMessage('Image size must be less than 5MB', 'error');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Create previews
    const previews = validFiles.map(file => URL.createObjectURL(file));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles],
      imagePreviews: [...prev.imagePreviews, ...previews]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };

  const removeExistingImage = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      imagesToDelete: [...prev.imagesToDelete, imageUrl]
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: [],
      unit: '',
      stock: '',
      price: '',
      discount: '',
      description: '',
      more_details: '',
      publish: true,
      images: [],
      imagePreviews: [],
      imagesToDelete: []
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showMessage('Product name is required', 'error');
      return;
    }

    if (formData.category.length === 0) {
      showMessage('At least one category is required', 'error');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      showMessage('Valid price is required', 'error');
      return;
    }

    if (formData.images.length === 0) {
      showMessage('At least one product image is required', 'error');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      
      formData.category.forEach(cat => {
        formDataToSend.append('category', cat);
      });

      formDataToSend.append('unit', formData.unit);
      formDataToSend.append('stock', formData.stock || 0);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('discount', formData.discount || 0);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('more_details', formData.more_details);
      formDataToSend.append('publish', formData.publish);

      formData.images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await Axios({
        ...SummaryApi.addProduct,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        showMessage('Product added successfully', 'success');
        resetForm();
        setShowAddForm(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      showMessage(error.response?.data?.message || 'Failed to add product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showMessage('Product name is required', 'error');
      return;
    }

    if (formData.category.length === 0) {
      showMessage('At least one category is required', 'error');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      showMessage('Valid price is required', 'error');
      return;
    }

    // Check if all images will be deleted and no new images are added
    const remainingCurrentImages = editingProduct.image?.filter(img => !formData.imagesToDelete.includes(img)) || [];
    if (remainingCurrentImages.length === 0 && formData.images.length === 0) {
      showMessage('Product must have at least one image', 'error');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      
      formData.category.forEach(cat => {
        formDataToSend.append('category', cat);
      });

      formDataToSend.append('unit', formData.unit);
      formDataToSend.append('stock', formData.stock || 0);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('discount', formData.discount || 0);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('more_details', formData.more_details);
      formDataToSend.append('publish', formData.publish);

      // Only append new images if any are selected
      if (formData.images.length > 0) {
        formData.images.forEach(image => {
          formDataToSend.append('images', image);
        });
      }

      // Send images to delete
      if (formData.imagesToDelete.length > 0) {
        formData.imagesToDelete.forEach(imageUrl => {
          formDataToSend.append('removeImages', imageUrl);
        });
      }

      const response = await Axios({
        ...SummaryApi.updateProduct,
        url: `${SummaryApi.updateProduct.url}/${editingProduct._id}`,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        showMessage('Product updated successfully', 'success');
        resetForm();
        setShowEditForm(false);
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      showMessage(error.response?.data?.message || 'Failed to update product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (productId) => {
    try {
      const response = await Axios({
        ...SummaryApi.toggleProductPublish,
        url: `${SummaryApi.toggleProductPublish.url}/${productId}`
      });

      if (response.data.success) {
        showMessage(response.data.message, 'success');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
      showMessage(error.response?.data?.message || 'Failed to update publish status', 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        url: `${SummaryApi.deleteProduct.url}/${productId}`
      });

      if (response.data.success) {
        showMessage('Product deleted successfully', 'success');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showMessage(error.response?.data?.message || 'Failed to delete product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category?.map(cat => cat._id) || [],
      unit: product.unit || '',
      stock: product.stock || '',
      price: product.price || '',
      discount: product.discount || '',
      description: product.description || '',
      more_details: typeof product.more_details === 'object' ? JSON.stringify(product.more_details, null, 2) : product.more_details || '',
      publish: product.publish,
      images: [],
      imagePreviews: [],
      imagesToDelete: []
    });
    setShowEditForm(true);
    setShowAddForm(false); // Close add form if open
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
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <button
              onClick={() => {
                if (showAddForm || showEditForm) {
                  setShowAddForm(false);
                  setShowEditForm(false);
                  setEditingProduct(null);
                  resetForm();
                } else {
                  setShowAddForm(true);
                  setShowEditForm(false);
                  setEditingProduct(null);
                  resetForm();
                }
              }}
              className={`${(showAddForm || showEditForm) ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-4 py-2 rounded-lg flex items-center`}
            >
              <FaPlus className="mr-2" />
              {(showAddForm || showEditForm) ? 'Cancel' : 'Add Product'}
            </button>
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

        {/* Inline Add Product Form */}
        {showAddForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Product Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                  {formData.images.length > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {formData.images.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories *
                </label>
                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                  {categories.map((category) => (
                    <label key={category._id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        value={category._id}
                        checked={formData.category.includes(category._id)}
                        onChange={(e) => handleArrayFieldChange(e, 'category')}
                        className="mr-2"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., kg, piece, liter"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Product description..."
                />
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details (JSON)
                </label>
                <textarea
                  name="more_details"
                  value={formData.more_details}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder='{"color": "red", "size": "large"}'
                />
              </div>

              {/* Image Previews */}
              {formData.imagePreviews.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Previews
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publish Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="publish"
                  checked={formData.publish}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Publish Product
                </label>
              </div>

              {/* Form Actions */}
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
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Inline Edit Product Form */}
        {showEditForm && editingProduct && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Product: {editingProduct.name}</h2>
            <form onSubmit={handleEditProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Product Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images (Optional - leave empty to keep existing)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  {formData.images.length > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {formData.images.length} new file(s) selected
                    </p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories *
                </label>
                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                  {categories.map((category) => (
                    <label key={category._id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        value={category._id}
                        checked={formData.category.includes(category._id)}
                        onChange={(e) => handleArrayFieldChange(e, 'category')}
                        className="mr-2"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., kg, piece, liter"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Product description..."
                />
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details (JSON)
                </label>
                <textarea
                  name="more_details"
                  value={formData.more_details}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder='{"color": "red", "size": "large"}'
                />
              </div>

              {/* Current Images */}
              {editingProduct && editingProduct.image && editingProduct.image.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Images (Click × to delete)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {editingProduct.image
                      .filter(imageUrl => !formData.imagesToDelete.includes(imageUrl))
                      .map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Current ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(imageUrl)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                          <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Current
                          </span>
                        </div>
                      ))}
                  </div>
                  {formData.imagesToDelete.length > 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      ⚠ {formData.imagesToDelete.length} image(s) will be deleted when you update the product
                    </p>
                  )}
                </div>
              )}

              {/* New Image Previews */}
              {formData.imagePreviews.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Image Previews
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                        <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publish Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="publish"
                  checked={formData.publish}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Publish Product
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>

          <select
            value={filterPublish}
            onChange={(e) => setFilterPublish(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Status</option>
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Total: {pagination.totalProducts} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image?.[0] || '/placeholder-image.jpg'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                  <button
                    onClick={() => handleTogglePublish(product._id)}
                    className={`p-1 rounded ${
                      product.publish 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    {product.publish ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-purple-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock || 0}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.publish 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {product.publish ? 'Published' : 'Unpublished'}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.category?.slice(0, 2).map((cat, index) => (
                      <span
                        key={cat._id || index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                    {product.category?.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{product.category.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditForm(product)}
                    className="flex-1 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 flex items-center justify-center"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
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

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaBoxOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => fetchProducts(page)}
                  className={`px-3 py-2 rounded ${
                    page === pagination.currentPage
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
