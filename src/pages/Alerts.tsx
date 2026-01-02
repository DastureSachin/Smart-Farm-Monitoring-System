import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AlertItem from '../components/ui/AlertItem';
import { Filter, Search, CheckSquare, X } from 'lucide-react';

const Alerts: React.FC = () => {
  const { alerts, markAlertAsRead } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'intrusion' | 'animal_escape' | 'system'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  // Filter alerts based on search, filter type, and read status
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || alert.type === filter;
    
    const matchesReadStatus = !showUnreadOnly || !alert.isRead;
    
    return matchesSearch && matchesFilter && matchesReadStatus;
  });
  
  // Mark all as read
  const markAllAsRead = () => {
    filteredAlerts.forEach(alert => {
      if (!alert.isRead) {
        markAlertAsRead(alert.id);
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search alerts..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="relative inline-block text-left">
              <div className="flex">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setFilter('all')}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span className={filter === 'all' ? 'font-medium' : ''}>All</span>
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setFilter('intrusion')}
                >
                  <span className={filter === 'intrusion' ? 'font-medium' : ''}>Security</span>
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setFilter('animal_escape')}
                >
                  <span className={filter === 'animal_escape' ? 'font-medium' : ''}>Animal</span>
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setFilter('system')}
                >
                  <span className={filter === 'system' ? 'font-medium' : ''}>System</span>
                </button>
              </div>
            </div>
            
            <button
              className={`flex items-center px-4 py-2 rounded-lg border ${
                showUnreadOnly 
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-900 dark:border-emerald-700 dark:text-emerald-200' 
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
              } hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors`}
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            >
              {showUnreadOnly ? (
                <CheckSquare className="h-4 w-4 mr-2" />
              ) : (
                <div className="h-4 w-4 mr-2 border border-current rounded" />
              )}
              <span>Unread only</span>
            </button>
            
            <button
              className="flex items-center px-4 py-2 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              onClick={markAllAsRead}
            >
              <CheckSquare className="h-4 w-4 mr-2" />
              <span>Mark all as read</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Alerts list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Alerts ({filteredAlerts.length})
        </h2>
        
        {filteredAlerts.length > 0 ? (
          <div className="space-y-2">
            {filteredAlerts.map(alert => (
              <AlertItem 
                key={alert.id} 
                alert={alert} 
                onMarkAsRead={markAlertAsRead} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500 dark:text-gray-400">
            No alerts match your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;