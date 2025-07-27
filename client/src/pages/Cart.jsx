import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingBag,
  FaArrowLeft,
  FaCreditCard
} from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import { formatPrice, calculateDiscountedPrice } from '../utils/currency';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { items, totalItems, totalPrice, loading, updateQuantity, removeItem, clearCartItems } = useCart();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const success = await updateQuantity(cartItemId, newQuantity);
    if (!success) {
      // The error toast is already shown in the useCart hook
      // We could add additional handling here if needed
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <span>Are you sure you want to remove this item from cart?</span>
        <div className="flex space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded text-sm"
            onClick={async () => {
              toast.dismiss(t.id);
              const success = await removeItem(cartItemId);
              if (success) {
                toast.success('Item removed from cart!');
              }
            }}
          >
            Remove
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleClearCart = async () => {
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <span>Are you sure you want to clear your entire cart?</span>
        <div className="flex space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded text-sm"
            onClick={async () => {
              toast.dismiss(t.id);
              const success = await clearCartItems();
              if (success) {
                toast.success('Cart cleared successfully!');
              }
            }}
          >
            Clear Cart
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <FaShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              to="/shop"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <FaShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {items.map((item) => {
                const product = item.productId;
                
                // Skip rendering if product data is missing
                if (!product) {
                  console.warn('Cart item missing product data:', item);
                  return null;
                }
                
                const discountedPrice = calculateDiscountedPrice(product.price || 0, product.discount || 0);
                
                return (
                  <div key={item._id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.image?.[0] || '/placeholder-image.jpg'}
                          alt={product.name || 'Product'}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link to={`/product/${product._id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {product.name || 'Unnamed Product'}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          {(product.discount || 0) > 0 ? (
                            <>
                              <span className="text-lg font-bold text-blue-600">
                                {formatPrice(discountedPrice)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.price || 0)}
                              </span>
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                -{product.discount}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-blue-600">
                              {formatPrice(product.price || 0)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          {product.category?.slice(0, 2).map((cat, index) => (
                            <span
                              key={cat._id || index}
                              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            disabled={item.quantity >= (product.stock || 0)}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }).filter(Boolean)}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(totalPrice * 0.08)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(totalPrice + (totalPrice * 0.08))}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <FaCreditCard className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="mt-4 text-center">
                  <Link
                    to="/shop"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
