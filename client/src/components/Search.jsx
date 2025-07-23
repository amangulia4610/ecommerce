import React from 'react'

const Search = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Search */}
      <div className="hidden sm:block">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

export default Search;