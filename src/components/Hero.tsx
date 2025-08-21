import React from 'react';
import { Shield, Clock, Leaf, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: 'Preserve Freshness',
      description: 'Keep food fresh 5x longer than traditional storage methods'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Batch prepare meals and store them efficiently'
    },
    {
      icon: Leaf,
      title: 'Reduce Waste',
      description: 'Minimize food spoilage and packaging waste'
    }
  ];

  return (
    <section id="hero" className="min-h-screen pt-16 bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  Trusted by 10,000+ customers
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-500 bg-clip-text text-transparent">
                  Vacuum Packaging
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Made Simple
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Discover the best vacuum packaging solutions for food preservation, 
                clothing storage, and space optimization. We recommend only the highest-rated 
                products that deliver exceptional value.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToProducts}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Featured Products
              </button>
              
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-pink-500 text-pink-500 dark:text-pink-400 font-semibold rounded-xl hover:bg-pink-500 hover:text-white dark:hover:text-white transition-all duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://img.getimg.ai/generated/ca18b681-c5ce-4ca2-b8b7-706d7532f7f0/img-z6dlx8GFtct4m8VGR1TjQ.jpeg"
                alt="Professional vacuum packaging setup"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-500">5x</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Longer Freshness</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">80%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Space Saved</div>
                </div>
              </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl transform rotate-3 -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-500/20 rounded-2xl transform -rotate-2 scale-105 -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;