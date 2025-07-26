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
  FaUndo
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

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

  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`;
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount === 0) return price;
    return price - (price * discount / 100);
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

            {/* Quantity Selection */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
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
                      disabled={quantity >= product.stock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
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
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="relative aspect-square">
                    <img
                      src={relatedProduct.image?.[0] || '/placeholder-image.jpg'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                        -{relatedProduct.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {relatedProduct.discount > 0 ? (
                          <>
                            <span className="font-bold text-blue-600">
                              {formatPrice(calculateDiscountedPrice(relatedProduct.price, relatedProduct.discount))}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(relatedProduct.price)}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-blue-600">
                            {formatPrice(relatedProduct.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
