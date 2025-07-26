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
        <div className="w-full relative" ref={searchRef}>
            {/* Search Bar */}
            <div className="w-full md:max-w-md md:mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onKeyPress={handleKeyPress}
                        className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search for products..."
                    />

                    {/* Clear button */}
                    {searchTerm && (
                        <button 
                            onClick={clearSearch}
                            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes size={14} />
                        </button>
                    )}

                    {/* Search button */}
                    <button 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white focus:outline-none transition-colors"
                        onClick={() => handleSearch()}
                    >
                        <IoSearch size={20} />
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                    <div 
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
                    >
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                                <span className="ml-2">Searching...</span>
                            </div>
                        ) : searchTerm.trim() ? (
                            // Show product suggestions when user is typing
                            suggestions.length > 0 ? (
                                <div>
                                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                                        Products
                                    </div>
                                    {suggestions.map((product, index) => (
                                        <button
                                            key={product._id}
                                            onClick={() => handleSuggestionClick(product)}
                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-0"
                                        >
                                            <img
                                                src={product.image?.[0] || '/placeholder-image.jpg'}
                                                alt={product.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ${product.price}
                                                    {product.category?.length > 0 && ` • ${product.category[0].name}`}
                                                </div>
                                            </div>
                                            <IoSearch className="text-gray-400" size={16} />
                                        </button>
                                    ))}
                                    {suggestions.length === 5 && (
                                        <button
                                            onClick={() => handleSearch()}
                                            className="w-full px-4 py-3 text-left text-blue-600 hover:bg-blue-50 text-sm font-medium"
                                        >
                                            See all results for "{searchTerm}"
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    <div className="text-sm">No products found for "{searchTerm}"</div>
                                    <button
                                        onClick={() => handleSearch()}
                                        className="text-blue-600 hover:text-blue-700 text-sm mt-1"
                                    >
                                        Search anyway
                                    </button>
                                </div>
                            )
                        ) : (
                            // Show popular search terms when input is empty
                            <div>
                                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                                    Popular Searches
                                </div>
                                {popularTerms.map((term, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(term)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between text-sm text-gray-700 border-b border-gray-100 last:border-0"
                                    >
                                        <span>{term}</span>
                                        <IoSearch className="text-gray-400" size={14} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;