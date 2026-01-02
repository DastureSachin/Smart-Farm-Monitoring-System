import React from 'react';
import { useApp } from '../context/AppContext';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Clock, Calendar, Users, Rat, Filter } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const { stats, detections } = useApp();
  
  // Prepare detection trend chart data
  const trendData = {
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
  
  // Prepare species distribution chart
  const speciesData = {
    labels: stats.animalSpeciesCount.map(item => item.species),
    datasets: [
      {
        data: stats.animalSpeciesCount.map(item => item.count),
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(20, 184, 166, 0.7)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(236, 72, 153)',
          'rgb(139, 92, 246)',
          'rgb(239, 68, 68)',
          'rgb(20, 184, 166)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Prepare hourly distribution chart
  const getHourlyData = () => {
    const hourCounts = Array(24).fill(0);
    
    detections.forEach(detection => {
      const hour = new Date(detection.timestamp).getHours();
      hourCounts[hour]++;
    });
    
    return {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          label: 'Detections',
          data: hourCounts,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
  };
  
  const hourlyData = getHourlyData();
  
  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };
  
  return (
    <div className="space-y-6">
      {/* Analytics filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-wrap gap-3 items-center transition-colors">
        <div className="text-gray-700 dark:text-gray-300 flex items-center">
          <Filter className="h-5 w-5 mr-1.5" />
          <span>Filter by:</span>
        </div>
        
        <div className="flex items-center">
          <button className="flex items-center px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
            <Calendar className="h-4 w-4 mr-1.5" />
            <span>Last 7 days</span>
          </button>
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Day
          </button>
          <button className="px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-r border-gray-300 dark:border-gray-600">
            Week
          </button>
          <button className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Month
          </button>
        </div>
      </div>
      
      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection trends */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Detection Trends
          </h2>
          <div className="h-64">
            <Line options={lineOptions} data={trendData} />
          </div>
        </div>
        
        {/* Species distribution */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
            <Rat className="h-5 w-5 mr-2 text-emerald-500" />
            Animal Species Distribution
          </h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut options={doughnutOptions} data={speciesData} />
          </div>
        </div>
        
        {/* Hourly distribution */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-500" />
            Activity by Hour
          </h2>
          <div className="h-64">
            <Bar options={barOptions} data={hourlyData} />
          </div>
        </div>
        
        {/* Human vs Animal */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-500" />
            Human Detection Analysis
          </h2>
          
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              options={doughnutOptions} 
              data={{
                labels: ['Authorized', 'Unauthorized'],
                datasets: [
                  {
                    data: [stats.authorizedHumans, stats.unauthorizedHumans],
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.7)',
                      'rgba(239, 68, 68, 0.7)',
                    ],
                    borderColor: [
                      'rgb(59, 130, 246)',
                      'rgb(239, 68, 68)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Data table preview */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Detection Summary
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Animals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Humans
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {stats.detectionsByDay.map((day, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {day.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {day.animals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {day.humans}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {day.animals + day.humans}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;