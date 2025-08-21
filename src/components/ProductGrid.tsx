import React, { useState } from 'react';
import { ExternalLink, Star, Filter } from 'lucide-react';
import { products, categories } from '../utils/constants';
import { Product } from '../types';

const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAffiliateClick = (product: Product) => {
    // In a real implementation, you would track this click for analytics
    console.log(`Affiliate click for product: ${product.name}`);
    window.open(product.amazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="products" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hand-picked vacuum packaging solutions that we personally use and recommend. 
            These affiliate products help support our site while providing you with the best value.
          </p>
          
          {/* Affiliate Disclosure */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-200">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">
                <strong>Affiliate Disclosure:</strong> We earn a commission from qualifying purchases made through our Amazon links at no extra cost to you.
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg w-full justify-between"
            >
              <span className="text-gray-700 dark:text-gray-300">Filter by Category</span>
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Options */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Product Image */}
              <div 
                className="relative overflow-hidden cursor-pointer"
                onClick={() => handleAffiliateClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 
                  className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleAffiliateClick(product)}
                >
                  {product.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        +{product.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Price on Amazon
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAffiliateClick(product)}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>View on Amazon</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category to see more products.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;