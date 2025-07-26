import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { 
  updateCartQuantityAsync, 
  removeFromCartAsync, 
  clearCartAsync, 
  fetchCartItems
} from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalItems, loading } = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

  // Check if user is logged in by checking if user has an _id
  const isLoggedIn = user && user._id;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isLoggedIn]);

  const handleQuantityUpdate = (productId, newQuantity) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    const cartItem = items.find(item => item.productId._id === productId);
    if (cartItem) {
      if (newQuantity <= 0) {
        dispatch(removeFromCartAsync(cartItem._id));
      } else {
        dispatch(updateCartQuantityAsync({ cartItemId: cartItem._id, quantity: newQuantity }));
      }
    }
  };

  const handleRemoveItem = (productId) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    const cartItem = items.find(item => item.productId._id === productId);
    if (cartItem) {
      dispatch(removeFromCartAsync(cartItem._id));
    }
  };

  const handleClearCart = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCartAsync());
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    // TODO: Implement checkout functionality
    navigate('/checkout');
  };

  // Show login prompt only when user is not logged in AND trying to view an empty cart
  if (!isLoggedIn && items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <FiShoppingBag className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Please Login to View Cart</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to access your shopping cart.</p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <FiShoppingBag className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-2"
        >
          <FiTrash2 />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center space-x-4 p-4 bg-white border rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.productId.image[0]}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.productId._id}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1"
                  >
                    {item.productId.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    Category: {item.productId.category.map(cat => cat.name).join(', ')}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-gray-800">
                      ₹{(item.productId.price * (1 - item.productId.discount / 100)).toFixed(2)}
                    </span>
                    {item.productId.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{item.productId.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityUpdate(item.productId._id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                  </button>
                  <span className="text-lg font-semibold min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityUpdate(item.productId._id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    disabled={item.quantity >= item.productId.stock}
                  >
                    <FiPlus className={item.quantity >= item.productId.stock ? 'text-gray-300' : 'text-gray-600'} />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    ₹{((item.productId.price * (1 - item.productId.discount / 100)) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.productId._id)}
                    className="text-red-600 hover:text-red-700 transition-colors mt-2"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 shadow-sm sticky top-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({totalItems})</span>
                <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="block w-full text-center text-blue-600 py-3 mt-3 hover:text-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
