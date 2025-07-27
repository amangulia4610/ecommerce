import Search from './Search.jsx';
import UserMenu from './UserMenu.jsx';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useAuth from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { totalItems } = useCart();

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
    <header className='shadow-lg bg-white border-b border-gray-200'>
      {/* Desktop Layout - 768px and above */}
      <div className="hidden md:flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <h1 
            className="text-gray-900 text-2xl font-bold cursor-pointer hover:text-blue-600 transition-colors" 
            style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}
            onClick={handleLogoClick}
          >
            20 Degrees
          </h1>
        </div>

        {/* Center Search */}
        <div className="flex-1 flex justify-center mx-8">
          <Search />
        </div>

        {/* Right side - Cart and User */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <button 
            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={handleCartClick}
          >
            <FaShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
      <div className="md:hidden px-6 py-4">
        {/* First Row - Logo, Cart and Login */}
        <div className="flex items-center justify-between mb-4">
          <h1 
            className="text-gray-900 text-2xl font-bold cursor-pointer hover:text-blue-600 transition-colors" 
            style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}
            onClick={handleLogoClick}
          >
            20 Degrees
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button 
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={handleCartClick}
            >
              <FaShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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

        {/* Second Row - Search */}
        <div className="flex justify-center">
          <Search />
        </div>
      </div>
    </header>
  )
}

export default Header