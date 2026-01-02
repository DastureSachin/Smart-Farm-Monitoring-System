import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: ReactNode;
  color: 'green' | 'blue' | 'yellow' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  color,
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'from-emerald-500 to-emerald-600 text-emerald-100';
      case 'blue':
        return 'from-blue-500 to-blue-600 text-blue-100';
      case 'yellow':
        return 'from-yellow-500 to-yellow-600 text-yellow-100';
      case 'red':
        return 'from-red-500 to-red-600 text-red-100';
      default:
        return 'from-emerald-500 to-emerald-600 text-emerald-100';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className={`bg-gradient-to-r ${getColorClasses()} p-4 flex justify-between items-center`}>
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          
          {change && (
            <p className={`text-xs flex items-center mt-1 ${change.isPositive ? 'text-green-100' : 'text-red-100'}`}>
              <span>{change.isPositive ? '↑' : '↓'}</span>
              <span className="ml-1">{change.value}% from last week</span>
            </p>
          )}
        </div>
        
        <div className="text-white opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;