import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, Detection, Stats } from '../types';
import { 
  initialDetections, 
  initialAlerts, 
  initialStats, 
  simulateNewDetection,
  generateAlerts,
  generateStats
} from '../data/mockData';

interface AppContextType {
  detections: Detection[];
  alerts: Alert[];
  stats: Stats;
  isSimulationRunning: boolean;
  startSimulation: () => void;
  stopSimulation: () => void;
  markAlertAsRead: (alertId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [detections, setDetections] = useState<Detection[]>(initialDetections);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to add a new detection
  const addDetection = (detection: Detection) => {
    setDetections(prev => {
      const newDetections = [detection, ...prev];
      
      // Update alerts if human detection is unauthorized
      if (detection.type === 'human' && detection.isAuthorized === false) {
        const newAlert: Alert = {
          id: `intrusion-${Date.now()}`,
          type: 'intrusion',
          message: `Unauthorized person detected in ${detection.location}`,
          severity: 'high',
          timestamp: detection.timestamp,
          isRead: false,
          relatedDetection: detection,
        };
        
        setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
      }
      
      // Update stats
      setStats(generateStats(newDetections));
      
      return newDetections;
    });
  };

  // Start simulation
  const startSimulation = () => {
    if (isSimulationRunning) return;
    
    setIsSimulationRunning(true);
    const interval = setInterval(() => {
      const newDetection = simulateNewDetection();
      addDetection(newDetection);
    }, 10000); // New detection every 10 seconds
    
    setSimulationInterval(interval);
  };

  // Stop simulation
  const stopSimulation = () => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
    setIsSimulationRunning(false);
  };

  // Mark alert as read
  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Effect to apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);

  return (
    <AppContext.Provider
      value={{
        detections,
        alerts,
        stats,
        isSimulationRunning,
        startSimulation,
        stopSimulation,
        markAlertAsRead,
        isDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};