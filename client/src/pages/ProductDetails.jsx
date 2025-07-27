import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaHeart, 
  FaStar, 
  FaPlus, 
  FaMinus,
  FaHome,
  FaChevronRight,
  FaShare,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaShoppingCart,
  FaTrash
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { useCart } from '../hooks/useCart';
import { formatPrice, calculateDiscountedPrice } from '../utils/currency';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const { addToCart, updateQuantity, removeItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [updatingCart, setUpdatingCart] = useState(false);

  // Check if product is in cart and get cart item details
  const cartItem = cart.items?.find(item => item.productId?._id === productId);
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product && product.category?.length > 0) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        url: `${SummaryApi.getProduct.url}/${productId}`
      });

      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProducts,
        params: {
          category: product.category[0]._id,
          limit: 4,
          publish: 'true'
        }
      });

      if (response.data.success) {
        // Filter out current product
        const related = response.data.data.filter(p => p._id !== product._id);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setUpdatingCart(true);
    const success = await addToCart(product._id, quantity);
    if (success) {
      // Optionally reset quantity to 1 after adding
      setQuantity(1);
    }
    setUpdatingCart(false);
  };

  const handleUpdateCartQuantity = async (newQuantity) => {
    if (!cartItem) return;
    
    setUpdatingCart(true);
    if (newQuantity === 0) {
      await removeItem(cartItem._id);
    } else {
      await updateQuantity(cartItem._id, newQuantity);
    }
    setUpdatingCart(false);
  };

  const handleRemoveFromCart = async () => {
    if (!cartItem) return;
    
    setUpdatingCart(true);
    await removeItem(cartItem._id);
    setUpdatingCart(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
          <Link to="/shop" className="text-blue-600 hover:text-blue-700">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice = calculateDiscountedPrice(product.price, product.discount);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="flex items-center space-x-1 hover:text-blue-600">
              <FaHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <FaChevronRight className="w-3 h-3 text-gray-400" />
            <Link to="/shop" className="hover:text-blue-600">Shop</Link>
            <FaChevronRight className="w-3 h-3 text-gray-400" />
            {product.category?.[0] && (
              <>
                <Link 
                  to={`/shop?category=${product.category[0]._id}`} 
                  className="hover:text-blue-600"
                >
                  {product.category[0].name}
                </Link>
                <FaChevronRight className="w-3 h-3 text-gray-400" />
              </>
            )}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={product.image?.[selectedImage] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.image?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.category?.map((cat, index) => (
                  <span
                    key={cat._id || index}
                    className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-gray-600">(4.5) • 127 reviews</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                {product.discount > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(finalPrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      -{product.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-gray-700">Availability:</span>
              <span className={`font-medium ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Cart Status */}
            {isInCart && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaShoppingCart className="text-blue-600" />
                    <span className="text-blue-800 font-medium">
                      {cartQuantity} item{cartQuantity > 1 ? 's' : ''} in cart
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveFromCart}
                    disabled={updatingCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                  >
                    Remove from cart
                  </button>
                </div>
                
                {/* Cart Quantity Management */}
                <div className="mt-3 flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Update quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleUpdateCartQuantity(cartQuantity - 1)}
                      disabled={updatingCart || cartQuantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-2 font-medium text-sm">{cartQuantity}</span>
                    <button
                      onClick={() => handleUpdateCartQuantity(cartQuantity + 1)}
                      disabled={updatingCart || cartQuantity >= product.stock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                  {updatingCart && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm">Updating...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quantity Selection for New Additions */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    {isInCart ? 'Add more:' : 'Quantity:'}
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaMinus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock - cartQuantity}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>
                  {(quantity >= product.stock - cartQuantity) && cartQuantity > 0 && (
                    <span className="text-sm text-orange-600">
                      Max available: {product.stock - cartQuantity}
                    </span>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={updatingCart || (cartQuantity + quantity > product.stock)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {updatingCart ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="w-5 h-5" />
                        <span>{isInCart ? 'Add More' : 'Add to Cart'}</span>
                      </>
                    )}
                  </button>
                  
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaHeart className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaShare className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <FaTruck className="w-5 h-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaUndo className="w-5 h-5" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaShieldAlt className="w-5 h-5" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        {product.more_details && Object.keys(product.more_details).length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.more_details).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-medium text-gray-700 w-1/3 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <span className="text-gray-600 w-2/3">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
