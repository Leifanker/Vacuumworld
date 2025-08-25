import React from 'react';
import { Calendar, User, Award } from 'lucide-react';

interface AuthorBoxProps {
  author?: string;
  publishDate?: string;
  lastUpdated?: string;
  experience?: string;
  avatar?: string;
}

const AuthorBox: React.FC<AuthorBoxProps> = ({ 
  author = "VacuumWorld Team", 
  publishDate, 
  lastUpdated,
  experience = "Tested 50+ vacuum sealers and storage solutions",
  avatar = "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60"
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-800">
      <div className="flex items-start space-x-4">
        <img
          src={avatar}
          alt={`${author} avatar`}
          className="w-16 h-16 rounded-full object-cover border-2 border-pink-200 dark:border-pink-700"
          width="64"
          height="64"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-4 h-4 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{author}</h3>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-4 h-4 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">{experience}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-600 dark:text-gray-400">
            {publishDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Published: {formatDate(publishDate)}</span>
              </div>
            )}
            
            {lastUpdated && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Updated: {formatDate(lastUpdated)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;