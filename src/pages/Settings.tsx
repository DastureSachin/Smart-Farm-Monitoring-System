import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Bell, Users, Shield, Sun, Moon, Save, PieChart } from 'lucide-react';

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useApp();
  
  // Example settings state
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    emailAlerts: true,
    smsAlerts: false,
    detectionSensitivity: 75,
    recordingEnabled: true,
    storageDuration: 30,
  });
  
  // Handle toggle change
  const handleToggleChange = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };
  
  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: parseInt(e.target.value),
    });
  };
  
  // Handle storage duration change
  const handleStorageDurationChange = (duration: number) => {
    setSettings({
      ...settings,
      storageDuration: duration,
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      
      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
          <PieChart className="h-5 w-5 mr-2 text-purple-500" />
          Appearance
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isDarkMode ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
              <span className="absolute inset-0 flex items-center justify-between px-1.5">
                <Sun className={`h-3 w-3 ${isDarkMode ? 'text-gray-300' : 'text-yellow-500'}`} />
                <Moon className={`h-3 w-3 ${isDarkMode ? 'text-indigo-300' : 'text-gray-400'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Detection Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
          <Camera className="h-5 w-5 mr-2 text-blue-500" />
          Detection Settings
        </h2>
        
        <div className="space-y-6">
          {/* Detection Sensitivity */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Detection Sensitivity
              </label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {settings.detectionSensitivity}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.detectionSensitivity}
              onChange={(e) => handleSliderChange(e, 'detectionSensitivity')}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          
          {/* Recording */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Recording</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Record video when detection occurs</p>
            </div>
            <button
              onClick={() => handleToggleChange('recordingEnabled')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.recordingEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle recording</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.recordingEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {/* Storage Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Storage Duration
            </label>
            <div className="flex space-x-2">
              {[7, 14, 30, 60, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => handleStorageDurationChange(days)}
                  className={`px-3 py-1.5 text-sm rounded ${
                    settings.storageDuration === days
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-yellow-500" />
          Notification Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts for important events</p>
            </div>
            <button
              onClick={() => handleToggleChange('notificationsEnabled')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.notificationsEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle notifications</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Alerts</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Send alerts to your email</p>
            </div>
            <button
              onClick={() => handleToggleChange('emailAlerts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.emailAlerts ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              disabled={!settings.notificationsEnabled}
            >
              <span className="sr-only">Toggle email alerts</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">SMS Alerts</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Send text messages for critical alerts</p>
            </div>
            <button
              onClick={() => handleToggleChange('smsAlerts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.smsAlerts ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              disabled={!settings.notificationsEnabled}
            >
              <span className="sr-only">Toggle SMS alerts</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-500" />
          Security Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Authorized Personnel</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage access control for the system</p>
            </div>
            <button className="px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <Users className="h-4 w-4 inline mr-1" />
              Manage
            </button>
          </div>
        </div>
      </div>
      
      {/* Save button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;