import React from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/ui/StatCard';
import DetectionCard from '../components/ui/DetectionCard';
import AlertItem from '../components/ui/AlertItem';
import VideoFeed from '../components/ui/VideoFeed';
import { 
  Users, 
  AlertTriangle, 
  Rat, 
  Layers,
  ChevronRight,
  BarChart3,
  Video
} from 'lucide-react';
import { feedAreas } from '../data/mockData';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { detections, alerts, stats, isSimulationRunning, markAlertAsRead } = useApp();
  
  // Get most recent detections
  const recentDetections = detections.slice(0, 4);
  
  // Get unread alerts
  const unreadAlerts = alerts.filter(alert => !alert.isRead).slice(0, 3);
  
  // Prepare chart data
  const chartData = {
    labels: stats.detectionsByDay.map(day => day.date.split('-').slice(1).join('/')),
    datasets: [
      {
        label: 'Animals',
        data: stats.detectionsByDay.map(day => day.animals),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Humans',
        data: stats.detectionsByDay.map(day => day.humans),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
  
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Animals"
          value={stats.totalAnimals}
          icon={<Rat className="h-8 w-8" />}
          color="green"
          change={{ value: 5, isPositive: true }}
        />
        
        <StatCard 
          title="Total Humans"
          value={stats.totalHumans}
          icon={<Users className="h-8 w-8" />}
          color="blue"
        />
        
        <StatCard 
          title="Unauthorized Access"
          value={stats.unauthorizedHumans}
          icon={<AlertTriangle className="h-8 w-8" />}
          color="red"
          change={{ value: 2, isPositive: false }}
        />
        
        <StatCard 
          title="Active Feeds"
          value={feedAreas.filter(area => area.status === 'active').length}
          icon={<Layers className="h-8 w-8" />}
          color="yellow"
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Detections and Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity chart */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-emerald-500" />
                Detection Activity
              </h2>
            </div>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          
          {/* Recent detections */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Recent Detections</h2>
              <a href="#" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentDetections.map(detection => (
                <DetectionCard key={detection.id} detection={detection} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Alerts and Camera Feeds */}
        <div className="space-y-6">
          {/* Alerts section */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Recent Alerts
              </h2>
              <a href="#" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            {unreadAlerts.length > 0 ? (
              <div className="space-y-2">
                {unreadAlerts.map(alert => (
                  <AlertItem 
                    key={alert.id} 
                    alert={alert} 
                    onMarkAsRead={markAlertAsRead} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                No unread alerts
              </div>
            )}
          </div>
          
          {/* Sample video feed */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                <Video className="h-5 w-5 mr-2 text-blue-500" />
                Camera Feeds
              </h2>
              <a href="#" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="space-y-4">
              {feedAreas.slice(0, 2).map(area => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;