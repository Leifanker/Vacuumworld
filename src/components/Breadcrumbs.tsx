import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link 
        to="/" 
        className="flex items-center hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href && !item.current ? (
            <Link 
              to={item.href}
              className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.current ? 'text-gray-900 dark:text-white font-medium' : ''}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;