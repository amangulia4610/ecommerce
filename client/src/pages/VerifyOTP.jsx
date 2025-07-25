import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Redirect if no email is provided
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    // Only allow numeric input
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear errors when user starts typing
    if (errors.otp || errors.submit) {
      setErrors({});
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty, focus previous input
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      newErrors.otp = 'Please enter the complete 6-digit OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const otpString = otp.join('');
      const response = await Axios({
        url: SummaryApi.verifyForgotPasswordOTP.url,
        method: SummaryApi.verifyForgotPasswordOTP.method,
        data: { 
          email,
          otp: otpString
        }
      });

      if (response.data.success) {
        setIsVerified(true);
        // Navigate to reset password page after a brief delay
        setTimeout(() => {
          navigate('/reset-password', { 
            state: { 
              email,
              otpVerified: true 
            }
          });
        }, 1500);
      } else {
        setErrors({ submit: response.data.message || 'OTP verification failed. Please try again.' });
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message || 'OTP verification failed. Please try again.';
        setErrors({ submit: errorMessage });
      } else if (error.request) {
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } else {
        setErrors({ submit: 'OTP verification failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await Axios({
        url: SummaryApi.forgotPassword.url,
        method: SummaryApi.forgotPassword.method,
        data: { email }
      });

      if (response.data.success) {
        setOtp(['', '', '', '', '', '']);
        setErrors({});
        // Show success message temporarily
        setErrors({ submit: 'New OTP sent to your email!' });
        setTimeout(() => setErrors({}), 3000);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to resend OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              OTP Verified!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Redirecting to reset password page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the 6-digit code sent to
        </p>
        <p className="text-center text-sm font-medium text-gray-900">
          {email}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className={`border px-4 py-3 rounded ${
                errors.submit.includes('sent') 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {errors.submit}
              </div>
            )}

            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 text-center text-xl font-semibold border ${
                      errors.otp ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                ))}
              </div>
              {errors.otp && <p className="mt-2 text-sm text-red-600 text-center">{errors.otp}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </p>
            </div>

            {/* Back to Forgot Password */}
            <div className="text-center">
              <Link 
                to="/forgot-password" 
                className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-500"
              >
                <FaArrowLeft className="h-3 w-3 mr-1" />
                Back to forgot password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
