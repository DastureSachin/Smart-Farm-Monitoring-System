import React, { useState, useEffect } from 'react';
import { Detection, FeedArea } from '../../types';
import { AlertTriangle, CheckCircle, Gauge } from 'lucide-react';

interface VideoFeedProps {
  area: FeedArea;
  latestDetection?: Detection;
  isSimulating?: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ area, latestDetection, isSimulating = false }) => {
  const [feedStatus, setFeedStatus] = useState<'offline' | 'live'>('live');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionBox, setDetectionBox] = useState<{ x: number, y: number, width: number, height: number } | null>(null);
  
  // Choose a placeholder image based on area name
  const getPlaceholderImage = () => {
    if (area.name.toLowerCase().includes('pasture')) {
      return 'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg';
    } else if (area.name.toLowerCase().includes('barn')) {
      return 'https://images.pexels.com/photos/248880/pexels-photo-248880.jpeg';
    } else if (area.name.toLowerCase().includes('sheep')) {
      return 'https://images.pexels.com/photos/288621/pexels-photo-288621.jpeg';
    } else if (area.name.toLowerCase().includes('chicken')) {
      return 'https://images.pexels.com/photos/2050577/pexels-photo-2050577.jpeg';
    } else {
      return 'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg';
    }
  };
  
  // Simulate detection boxes
  useEffect(() => {
    if (!isSimulating) return;
    
    const detectInterval = setInterval(() => {
      const shouldDetect = Math.random() > 0.5;
      
      if (shouldDetect) {
        setIsDetecting(true);
        setDetectionBox({
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 20,
          width: Math.random() * 30 + 10,
          height: Math.random() * 30 + 10,
        });
        
        setTimeout(() => {
          setIsDetecting(false);
          setDetectionBox(null);
        }, 3000);
      }
    }, 5000);
    
    return () => clearInterval(detectInterval);
  }, [isSimulating]);
  
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 md:h-64">
        <img 
          src={getPlaceholderImage()}
          alt={area.name}
          className="w-full h-full object-cover"
        />
        
        {/* Video overlay with feed info */}
        <div className="absolute inset-0">
          {/* Status indicator */}
          <div className="absolute top-3 right-3 flex items-center px-2 py-1 rounded bg-black/70 text-white text-xs">
            {feedStatus === 'live' ? (
              <>
                <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                <span>LIVE</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1.5 text-yellow-500" />
                <span>OFFLINE</span>
              </>
            )}
          </div>
          
          {/* Area name */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-medium">{area.name}</h3>
            <p className="text-white/80 text-xs">{area.location}</p>
          </div>
          
          {/* Detection box simulation */}
          {isDetecting && detectionBox && (
            <div 
              className="absolute border-2 border-red-500 rounded-sm"
              style={{
                top: `${detectionBox.y}%`,
                left: `${detectionBox.x}%`,
                width: `${detectionBox.width}%`,
                height: `${detectionBox.height}%`,
                boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.3)'
              }}
            >
              <div className="absolute -top-6 -left-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                {Math.random() > 0.7 ? 'Human' : 'Animal'}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Latest detection info */}
      {latestDetection && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Latest Detection:</span>
              <span className="ml-2">
                {latestDetection.type === 'animal' ? latestDetection.species : 'Human'}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <Gauge className="h-4 w-4 mr-1 text-blue-500" />
              <span>{(latestDetection.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {new Date(latestDetection.timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;