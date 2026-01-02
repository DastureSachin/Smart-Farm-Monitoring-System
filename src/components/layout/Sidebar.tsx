import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Bell, 
  BarChart2, 
  Settings, 
  AlertTriangle,
  Sun,
  Moon,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar: React.FC = () => {
  const { alerts, isDarkMode, toggleDarkMode } = useApp();
  
  // Count unread alerts
  const unreadAlertsCount = alerts.filter(alert => !alert.isRead).length;
  
  return (
    <aside className="h-screen sticky top-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <Video className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">SmartFarm AI</h1>
        </div>
        
        <nav className="space-y-1">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-2 rounded-lg 
              transition-colors ${isActive 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/video-feeds"
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-2 rounded-lg 
              transition-colors ${isActive 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`
            }
          >
            <Video className="h-5 w-5" />
            <span>Video Feeds</span>
          </NavLink>

          <NavLink 
            to="/video-analysis"
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-2 rounded-lg 
              transition-colors ${isActive 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`
            }
          >
            <Upload className="h-5 w-5" />
            <span>Video Analysis</span>
          </NavLink>

          <NavLink 
            to="/alerts"
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-2 rounded-lg 
              transition-colors ${isActive 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`
            }
          >
            <div className="relative">
              <Bell className="h-5 w-5" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadAlertsCount}
                </span>
              )}
            </div>
            <span>Alerts</span>
          </NavLink>

          <NavLink 
            to="/analytics"
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-2 rounded-lg 
              transition-colors ${isActive 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`
            }
          >
            <BarChart2 className="h-5 w-5" />
            <span>Analytics</span>
          </NavLink>

          <NavLink 
            to="/settings"
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-2 rounded-lg 
              transition-colors ${isActive 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`
            }
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={toggleDarkMode}
          className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4 mr-2" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;