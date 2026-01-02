import React from 'react';
import { Alert } from '../../types';
import { AlertTriangle, Bell, Info, Check, ArrowRight } from 'lucide-react';

interface AlertItemProps {
  alert: Alert;
  onMarkAsRead: (alertId: string) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onMarkAsRead }) => {
  const { id, type, message, severity, timestamp, isRead } = alert;
  
  // Format timestamp
  const formattedTime = new Date(timestamp).toLocaleString();
  
  // Get appropriate styling based on alert type and severity
  const getAlertStyles = () => {
    const baseStyle = 'border-l-4 p-4 rounded-r-lg mb-3 transition-all';
    const readStyle = isRead ? 'opacity-75' : '';
    
    if (type === 'intrusion') {
      return `${baseStyle} ${readStyle} border-red-500 bg-red-50 dark:bg-red-900/20`;
    } else if (type === 'animal_escape') {
      return `${baseStyle} ${readStyle} border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20`;
    } else {
      return `${baseStyle} ${readStyle} border-blue-500 bg-blue-50 dark:bg-blue-900/20`;
    }
  };
  
  // Get icon based on alert type
  const getAlertIcon = () => {
    switch (type) {
      case 'intrusion':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'animal_escape':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className={getAlertStyles()}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5 mr-3">
          {getAlertIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {type === 'intrusion' 
                ? 'Security Alert' 
                : type === 'animal_escape' 
                  ? 'Animal Movement' 
                  : 'System Notification'}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formattedTime}</span>
          </div>
          
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
          
          <div className="mt-2 flex justify-between items-center">
            <div>
              {severity === 'high' ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  High Priority
                </span>
              ) : severity === 'medium' ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Medium Priority
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Low Priority
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              {!isRead && (
                <button 
                  onClick={() => onMarkAsRead(id)}
                  className="inline-flex items-center px-2 py-1 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark as read
                </button>
              )}
              
              {alert.relatedDetection && (
                <button className="inline-flex items-center px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  <ArrowRight className="h-3 w-3 mr-1" />
                  View detection
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;