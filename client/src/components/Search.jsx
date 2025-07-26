import React, { useState, useEffect, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popularTerms, setPopularTerms] = useState([]);
    const searchRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Popular search terms based on products
    const defaultSearchTerms = [
        'Fitness bands',
        'CGM',
        'Protein',
        'Smartwatch',
        'Health tracker',
        'Supplements'
    ];

    useEffect(() => {
        fetchPopularTerms();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchPopularTerms = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getProducts,
                params: {
                    limit: 10,
                    publish: 'true'
                }
            });

            if (response.data.success) {
                const products = response.data.data;
                const terms = products.map(product => product.name).slice(0, 6);
                setPopularTerms(terms.length > 0 ? terms : defaultSearchTerms);
            }
        } catch (error) {
            setPopularTerms(defaultSearchTerms);
        }
    };

    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProducts,
                params: {
                    search: query,
                    limit: 5,
                    publish: 'true'
                }
            });

            if (response.data.success) {
                setSuggestions(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsTyping(true);
        setShowSuggestions(true);

        // Debounce the API call
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            fetchSuggestions(value);
        }, 300);
    };

    const handleInputFocus = () => {
        setIsTyping(true);
        setShowSuggestions(true);
        if (!searchTerm.trim()) {
            setSuggestions([]);
        }
    };

    const handleSearch = (query = searchTerm) => {
        if (query.trim()) {
            navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
            setShowSuggestions(false);
            setSearchTerm('');
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (typeof suggestion === 'string') {
            handleSearch(suggestion);
        } else {
            handleSearch(suggestion.name);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsTyping(false);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div className="w-full flex justify-center" ref={searchRef}>
            {/* Search Bar */}
            <div className="w-full max-w-lg relative">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onKeyPress={handleKeyPress}
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                        placeholder="Search for products..."
                    />

                    {/* Clear button */}
                    {searchTerm && (
                        <button 
                            onClick={clearSearch}
                            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                        >
                            <FaTimes size={14} />
                        </button>
                    )}

                    {/* Search button */}
                    <button 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-200 shadow-sm"
                        onClick={() => handleSearch()}
                    >
                        <IoSearch size={18} />
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                    <div 
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-hidden backdrop-blur-sm w-full"
                    >
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                    <span className="text-sm">Searching...</span>
                                </div>
                            </div>
                        ) : searchTerm.trim() ? (
                            // Show product suggestions when user is typing
                            suggestions.length > 0 ? (
                                <div className="overflow-y-auto max-h-96">
                                    <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 bg-gray-50">
                                        Products ({suggestions.length})
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {suggestions.map((product, index) => (
                                            <button
                                                key={product._id}
                                                onClick={() => handleSuggestionClick(product)}
                                                className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center space-x-3 transition-colors duration-150 group"
                                            >
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={product.image?.[0] || '/placeholder-image.jpg'}
                                                        alt={product.name}
                                                        className="w-10 h-10 object-cover rounded-lg border border-gray-200 group-hover:border-blue-300 transition-colors duration-150"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-150">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1 flex items-center space-x-2">
                                                        <span className="font-semibold text-green-600">${product.price}</span>
                                                        {product.category?.length > 0 && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                                                    {product.category[0].name}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <IoSearch className="text-gray-400 group-hover:text-blue-500 transition-colors duration-150 flex-shrink-0" size={16} />
                                            </button>
                                        ))}
                                    </div>
                                    {suggestions.length === 5 && (
                                        <div className="border-t border-gray-100">
                                            <button
                                                onClick={() => handleSearch()}
                                                className="w-full px-4 py-3 text-left text-blue-600 hover:bg-blue-50 text-sm font-medium flex items-center justify-between transition-colors duration-150"
                                            >
                                                <span>See all results for "{searchTerm}"</span>
                                                <IoSearch size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-6 text-center text-gray-500">
                                    <div className="text-sm mb-2">No products found for "{searchTerm}"</div>
                                    <button
                                        onClick={() => handleSearch()}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors duration-150"
                                    >
                                        Search anyway
                                    </button>
                                </div>
                            )
                        ) : (
                            // Show popular search terms when input is empty
                            <div className="overflow-y-auto max-h-96">
                                <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 bg-gray-50">
                                    Popular Searches
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {popularTerms.map((term, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(term)}
                                            className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center justify-between text-sm text-gray-700 transition-colors duration-150 group"
                                        >
                                            <span className="group-hover:text-blue-700 transition-colors duration-150">{term}</span>
                                            <IoSearch className="text-gray-400 group-hover:text-blue-500 transition-colors duration-150" size={14} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;