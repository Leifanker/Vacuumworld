import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, Zap } from 'lucide-react';

interface InternalLink {
  title: string;
  href: string;
  description: string;
  category: 'guide' | 'review' | 'comparison';
}

interface InternalLinksProps {
  links: InternalLink[];
  title?: string;
}

const InternalLinks: React.FC<InternalLinksProps> = ({ 
  links, 
  title = "Related Articles" 
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'guide': return BookOpen;
      case 'review': return Star;
      case 'comparison': return Zap;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guide': return 'from-green-500 to-blue-500';
      case 'review': return 'from-yellow-500 to-orange-500';
      case 'comparison': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {title}
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, index) => {
          const IconComponent = getCategoryIcon(link.category);
          const colorClass = getCategoryColor(link.category);
          
          return (
            <Link
              key={index}
              to={link.href}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors duration-200 line-clamp-2">
                    {link.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {link.description}
                  </p>
                  <div className="flex items-center text-pink-500 group-hover:text-pink-600 transition-colors duration-200">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default InternalLinks;