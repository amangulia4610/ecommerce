import Search from './search.jsx';
import { FaShoppingCart } from 'react-icons/fa';
const Header = () => {
  return (
    <header className='shadow-lg bg-white border-b border-gray-200'>
      {/* Desktop Layout - 768px and above */}
      <div className="hidden md:flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-gray-900 text-2xl font-bold" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Login
          </button>
        </div>
      </div>

      {/* Mobile Layout - Below 768px */}
      <div className="md:hidden px-6 py-4">
        {/* First Row - Logo, Cart and Login */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-gray-900 text-2xl font-bold" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Login
            </button>
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