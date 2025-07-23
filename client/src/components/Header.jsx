import Search from './Search.jsx';  
const Header = () => {
  return (
    <header className='h-20 shadow-lg bg-white flex items-center justify-between px-6 border-b border-gray-200'>
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-gray-900 text-2xl font-bold" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>
          20 Degrees
        </h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          Products
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          Categories
        </a>
      </nav>

      {/* Right side - Search, Cart, User */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <Search />
        {/* Cart */}
        <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m9.5-6v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8-6V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Login/User */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Login
        </button>
        <button className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header