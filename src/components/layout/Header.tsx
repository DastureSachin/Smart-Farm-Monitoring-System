import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  const { alerts, isSimulationRunning, startSimulation, stopSimulation } = useApp();
  
  // Count unread alerts
  const unreadAlertsCount = alerts.filter(alert => !alert.isRead).length;
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={isSimulationRunning ? stopSimulation : startSimulation}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSimulationRunning 
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800' 
              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-800'
          }`}
        >
          {isSimulationRunning ? 'Stop Simulation' : 'Start Simulation'}
        </button>
        
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Bell className="h-5 w-5" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;