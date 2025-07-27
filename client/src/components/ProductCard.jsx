import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaStar,
  FaShoppingCart,
  FaCheck,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { formatPrice, calculateDiscountedPrice } from '../utils/currency';

const ProductCard = ({ 
  product, 
  variant = 'grid', // 'grid', 'list', or 'featured'
  showQuantityControls = true,
  className = '',
  ...props 
}) => {
  const cart = useSelector(state => state.cart);
  const { addToCart, updateQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  // Helper function to check if product is in cart
  const getCartItem = (productId) => {
    return cart.items.find(item => item.productId?._id === productId);
  };

  const cartItem = getCartItem(product._id);
  const isInCart = !!cartItem;

  const handleAddToCart = async () => {
    setIsUpdating(true);
    await addToCart(product._id);
    setIsUpdating(false);
  };

  const handleQuantityChange = async (newQuantity) => {
    if (!cartItem || isUpdating) return;
    
    if (newQuantity <= 0) return;
    if (newQuantity > product.stock) return;
    
    setIsUpdating(true);
    await updateQuantity(cartItem._id, newQuantity);
    setIsUpdating(false);
  };

  const renderInCartButton = () => {
    if (!isInCart) return null;

    return (
      <div className="w-full bg-green-100 border border-green-200 rounded-lg overflow-hidden">
        <div className="flex items-center">
          <button
            onClick={() => handleQuantityChange(cartItem.quantity - 1)}
            disabled={isUpdating || cartItem.quantity <= 1}
            className="flex-shrink-0 w-10 h-10 bg-green-200 hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors border-r border-green-300"
          >
            <FaMinus className="w-3 h-3 text-green-700" />
          </button>
          
          <div className="flex-1 flex items-center justify-center py-2 px-3 bg-green-100 text-green-700 font-medium">
            <FaCheck className="w-4 h-4 mr-2" />
            <span className="text-sm">In Cart ({cartItem.quantity})</span>
          </div>
          
          <button
            onClick={() => handleQuantityChange(cartItem.quantity + 1)}
            disabled={isUpdating || cartItem.quantity >= product.stock}
            className="flex-shrink-0 w-10 h-10 bg-green-200 hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors border-l border-green-300"
          >
            <FaPlus className="w-3 h-3 text-green-700" />
          </button>
        </div>
      </div>
    );
  };

  const renderCartButton = () => {
    if (product.stock === 0) {
      return (
        <button
          disabled
          className="w-full py-2 px-4 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <FaShoppingCart className="w-4 h-4" />
          <span>Out of Stock</span>
        </button>
      );
    }

    if (isInCart) {
      return renderInCartButton();
    }

    return (
      <button
        onClick={handleAddToCart}
        disabled={isUpdating}
        className="w-full py-2 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        <FaShoppingCart className="w-4 h-4" />
        <span>{isUpdating ? 'Adding...' : 'Add to Cart'}</span>
      </button>
    );
  };

  if (variant === 'list') {
    return (
      <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
        <div className="flex">
          <div className="relative w-48 h-32">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image?.[0] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </Link>
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                -{product.discount}%
              </div>
            )}
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.category?.slice(0, 3).map((cat, index) => (
                    <span
                      key={cat._id || index}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {product.description || 'No description available'}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock || 0}
                  </span>
                  <div className="min-w-[160px]">
                    {renderCartButton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-[420px] flex flex-col ${className}`}>
        <div className="relative overflow-hidden flex-shrink-0">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image?.[0] || '/placeholder-image.jpg'}
              alt={product.name}
              className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
              -{product.discount}%
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col flex-1">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-3 h-3" />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">(4.5)</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {product.discount > 0 ? (
                <>
                  <span className="text-lg font-bold text-blue-600">
                    {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              Stock: {product.stock || 0}
            </span>
          </div>
          <div className="mt-auto">
            {renderCartButton()}
          </div>
        </div>
      </div>
    );
  }

  // Default grid variant
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-[420px] flex flex-col ${className}`}>
      <div className="relative overflow-hidden flex-shrink-0">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image?.[0] || '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1 mb-2">
          {product.category?.slice(0, 1).map((cat, index) => (
            <span
              key={cat._id || index}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-4 h-4" />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.5)</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {product.discount > 0 ? (
              <>
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            Stock: {product.stock || 0}
          </span>
        </div>
        <div className="mt-auto">
          {renderCartButton()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
