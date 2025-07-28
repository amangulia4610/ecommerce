import React from 'react';
import { Link } from 'react-router-dom';
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-gray-900 text-xl font-bold mb-4" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>
              20 Degrees
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your premium destination for quality products and exceptional shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Home</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Products</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Categories</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Returns</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4" style={{ fontFamily: "'Optima', 'Inter', 'Roboto', Arial, sans-serif" }}>Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-blue-600 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-blue-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-blue-600 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white border border-gray-300 rounded-l-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 flex-1"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 20 Degrees. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Privacy Policy</Link>
            <Link to="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
