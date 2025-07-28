import Search from './Search.jsx';
import UserMenu from './UserMenu.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { totalItems } = useCart();
  // Remove mobile menu state

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className='shadow-lg bg-white border-b border-gray-200 sticky top-0 z-50'>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>📞 +1 (555) 123-4567</span>
              <span>✉️ support@20degrees.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>🚚 Free shipping on orders over $10</span>
              <span>🔒 Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout - 1024px and above */}
        <div className="hidden lg:flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity flex items-center space-x-2" 
              onClick={handleLogoClick}
            >
              <img 
                src="/logo.png" 
                alt="20 Degrees" 
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center mx-8 max-w-lg">
            <Search />
          </div>

          {/* Right side - Cart and User */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <button 
              className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 group hover:shadow-lg"
              onClick={handleCartClick}
            >
              <FaShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Login/User */}
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                onClick={handleLoginClick}
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Tablet Layout - 768px to 1024px */}
        <div className="hidden md:flex lg:hidden h-18 items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity flex items-center space-x-2" 
              onClick={handleLogoClick}
            >
              <img 
                src="/logo.png" 
                alt="20 Degrees" 
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center mx-6 max-w-md">
            <Search />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button 
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:shadow-lg"
              onClick={handleCartClick}
            >
              <FaShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Login/User */}
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                onClick={handleLoginClick}
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Layout - Below 768px */}
        <div className="md:hidden">
          {/* First Row - Logo, Mobile Menu Toggle */}
          <div className="flex items-center justify-between px-6 py-4">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity flex items-center space-x-2" 
              onClick={handleLogoClick}
            >
              <img 
                src="/logo.png" 
                alt="20 Degrees" 
                className="h-8 w-auto"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Cart */}
              <button 
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:shadow-lg"
                onClick={handleCartClick}
              >
                <FaShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                    {totalItems}
                  </span>
                )}
              </button>
              {/* User Icon (replaces hamburger/cross) */}
              <button
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={isLoggedIn ? undefined : handleLoginClick}
                aria-label="User"
              >
                {isLoggedIn ? <UserMenu /> : <FaUser className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Second Row - Search */}
          <div className="px-6 pb-4">
            <Search />
          </div>

          {/* Mobile Menu removed, user icon handles login/menu */}
        </div>
      </div>
    </header>
  )
}

export default Header