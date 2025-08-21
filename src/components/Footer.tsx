import React from 'react';
import { Package, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/vacuumworld', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/vacuumworld', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/vacuumworld', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/vacuumworld', label: 'YouTube' }
  ];

  const quickLinks = [
    { label: 'Best Vacuum Sealers', href: '#products' },
    { label: 'Storage Solutions', href: '#products' },
    { label: 'Food Preservation Tips', href: '#about' },
    { label: 'Product Reviews', href: '#products' }
  ];

  const categories = [
    { label: 'Food Storage', href: '#products' },
    { label: 'Clothing Storage', href: '#products' },
    { label: 'Vacuum Machines', href: '#products' },
    { label: 'Storage Containers', href: '#products' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                VacuumWorld
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Your trusted source for vacuum packaging solutions. We help you preserve food, 
              organize storage, and reduce waste with expertly curated product recommendations.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <a
                    href={category.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span>{category.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-4">
              Get the latest product recommendations and vacuum packaging tips delivered to your inbox.
            </p>
            
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-r-lg transition-all duration-300 transform hover:scale-105">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400">
                No spam, unsubscribe anytime
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} VacuumWorld. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-pink-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors duration-200">
                Affiliate Disclosure
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              <strong>Affiliate Disclosure:</strong> VacuumWorld is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We may earn a commission from qualifying purchases made through our affiliate links at no additional cost to you.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;