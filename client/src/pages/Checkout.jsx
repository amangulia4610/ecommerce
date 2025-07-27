import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  FaCreditCard, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaPlus,
  FaEdit,
  FaCheck,
  FaSpinner
} from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { formatPrice } from '../utils/currency';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [addressForm, setAddressForm] = useState({
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    mobile: ''
  });

  useEffect(() => {
    fetchCartItems();
    fetchAddresses();
  }, []);

  const fetchCartItems = async () => {
    try {
      setCartLoading(true);
      const response = await Axios(SummaryApi.getCartItems);
      
      if (response.data.success) {
        setCartItems(response.data.data);
        if (response.data.data.length === 0) {
          toast.error('Your cart is empty');
          navigate('/cart');
        }
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to load cart items');
    } finally {
      setCartLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await Axios(SummaryApi.getUserAddresses);
      
      if (response.data.success) {
        setAddresses(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedAddress(response.data.data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: addressForm
      });

      if (response.data.success) {
        toast.success('Address added successfully');
        setShowAddressForm(false);
        setAddressForm({
          address_line: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India',
          mobile: ''
        });
        fetchAddresses();
      }
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);
    
    const shipping = 0; // Free shipping for now
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      
      const response = await Axios({
        ...SummaryApi.createOrder,
        data: {
          delivery_address: selectedAddress,
          payment_method: paymentMethod
        }
      });

      if (response.data.success) {
        toast.success('Order placed successfully!');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, shipping, total } = calculateTotals();

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Column - Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    Delivery Address
                  </h2>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FaPlus className="mr-1" />
                    Add New
                  </button>
                </div>

                {/* Address List */}
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address._id}
                      className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAddress === address._id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        checked={selectedAddress === address._id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {address.address_line}
                          </p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.pincode}
                          </p>
                          <p className="text-gray-600">{address.country}</p>
                          {address.mobile && (
                            <p className="text-gray-600">Mobile: {address.mobile}</p>
                          )}
                        </div>
                        {selectedAddress === address._id && (
                          <FaCheck className="text-blue-500 mt-1" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Add Address Form */}
                {showAddressForm && (
                  <form onSubmit={handleAddressSubmit} className="mt-4 p-4 border rounded-lg bg-white">
                    <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.address_line}
                          onChange={(e) => setAddressForm({...addressForm, address_line: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="House no, Building, Street, Area"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={addressForm.mobile}
                          onChange={(e) => setAddressForm({...addressForm, mobile: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Address
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-green-500" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className="block p-4 border rounded-lg cursor-pointer border-green-500 bg-green-50">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaTruck className="mr-3 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-900">Cash on Delivery</p>
                          <p className="text-sm text-gray-600">Pay when you receive your order</p>
                        </div>
                      </div>
                      <FaCheck className="text-green-500" />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-3">
                      <img
                        src={item.productId.image[0]}
                        alt={item.productId.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.productId.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × {formatPrice(item.productId.price)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.productId.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !selectedAddress || cartItems.length === 0}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Placing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  By placing your order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
