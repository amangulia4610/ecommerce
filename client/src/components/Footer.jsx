import React from 'react';
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="h-20 shadow-md bg-white flex items-center text-center justify-center px-4">
      <div>
        <p className="text-gray-600">© 2025 20 Degrees. All rights reserved.</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
            <FaTwitter size={20} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">
            <FaInstagram size={20} />
          </a>  
          </div>
     
      </div>
    </footer>
  );
};

export default Footer;
