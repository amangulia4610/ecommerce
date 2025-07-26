import Search from './search.jsx';
import UserMenu from './UserMenu.jsx';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
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

        {/* Right side - User */}
        <div className="flex items-center space-x-4">
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