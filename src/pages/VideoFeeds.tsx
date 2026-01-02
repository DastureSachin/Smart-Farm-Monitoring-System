import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import VideoFeed from '../components/ui/VideoFeed';
import { feedAreas } from '../data/mockData';
import { Search, Filter, Settings, RefreshCcw } from 'lucide-react';

const VideoFeeds: React.FC = () => {
  const { detections, isSimulationRunning } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Filter feed areas based on search and filter
  const filteredAreas = feedAreas.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         area.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && area.status === 'active') ||
                         (filter === 'inactive' && area.status === 'inactive');
    
    return matchesSearch && matchesFilter;
  });
  
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
              placeholder="Search camera feeds..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Status filter */}
          <div className="flex">
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
                  onClick={() => setFilter('active')}
                >
                  <span className={filter === 'active' ? 'font-medium' : ''}>Active</span>
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setFilter('inactive')}
                >
                  <span className={filter === 'inactive' ? 'font-medium' : ''}>Inactive</span>
                </button>
              </div>
            </div>
            
            <button className="ml-2 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <button className="ml-2 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <RefreshCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Video feeds grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAreas.map(area => (
          <VideoFeed 
            key={area.id} 
            area={area}
            latestDetection={
              detections.find(d => d.location === area.name)
            }
            isSimulating={isSimulationRunning}
          />
        ))}
      </div>
      
      {filteredAreas.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm text-center transition-colors">
          <p className="text-gray-500 dark:text-gray-400">No camera feeds match your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default VideoFeeds;