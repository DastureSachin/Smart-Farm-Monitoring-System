import React from 'react';
import { Detection } from '../../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface DetectionCardProps {
  detection: Detection;
}

const DetectionCard: React.FC<DetectionCardProps> = ({ detection }) => {
  const { type, species, confidence, timestamp, location, imageUrl, isAuthorized } = detection;
  
  // Format timestamp
  const formattedTime = new Date(timestamp).toLocaleString();
  
  // Card styling based on detection type
  const getCardStyle = () => {
    if (type === 'human') {
      return isAuthorized 
        ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/30' 
        : 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/30';
    }
    return 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/30';
  };
  
  // Badge for detection type
  const renderBadge = () => {
    if (type === 'human') {
      return isAuthorized ? (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          Authorized
        </span>
      ) : (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center animate-pulse">
          <XCircle className="h-3 w-3 mr-1" />
          Unauthorized
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
        {species}
      </span>
    );
  };
  
  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm ${getCardStyle()} transition-all hover:shadow-md`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={type === 'animal' ? `${species}` : 'Human'} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
          <div className="text-white">
            <div className="text-sm font-medium">{type === 'animal' ? species : 'Human'}</div>
            <div className="text-xs opacity-90">{location}</div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          {renderBadge()}
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-600 dark:text-gray-300">{formattedTime}</div>
          <div className="flex items-center text-sm font-medium">
            <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{(confidence * 100).toFixed(1)}% confidence</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {type === 'animal' 
            ? `${species} detected in ${location}`
            : `Person detected in ${location} (${isAuthorized ? 'Authorized' : 'Unauthorized'})`
          }
        </div>
      </div>
    </div>
  );
};

export default DetectionCard;