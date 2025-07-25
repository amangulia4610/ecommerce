import Search from './search.jsx';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout: logoutUser } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    await logoutUser();
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

        {/* Right side - Cart, User */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <FaShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Login/User */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaUser className="w-4 h-4" />
                <span className="font-medium">{user.name}</span>
              </div>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
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
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <FaShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Login/User */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaUser className="w-4 h-4" />
                  <span className="font-medium text-sm">{user.name}</span>
                </div>
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-medium transition-colors flex items-center space-x-1 text-sm"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
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