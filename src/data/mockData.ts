import { Alert, Detection, FeedArea, Stats } from '../types';
import { format, subDays, subHours, subMinutes } from 'date-fns';

// Farm areas
export const feedAreas: FeedArea[] = [
  {
    id: '1',
    name: 'North Pasture',
    location: 'North Field',
    status: 'active',
  },
  {
    id: '2',
    name: 'Cattle Barn',
    location: 'Main Farm',
    status: 'active',
  },
  {
    id: '3',
    name: 'Sheep Enclosure',
    location: 'East Field',
    status: 'active',
  },
  {
    id: '4',
    name: 'Chicken Coop',
    location: 'South Farm',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Storage Barn',
    location: 'West Field',
    status: 'active',
  },
];

// Generate animal detections
const animalSpecies = ['Cow', 'Sheep', 'Chicken', 'Horse', 'Pig', 'Goat', 'Dog'];
const animalImageUrls = [
  'https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg',
  'https://images.pexels.com/photos/288621/pexels-photo-288621.jpeg',
  'https://images.pexels.com/photos/2050577/pexels-photo-2050577.jpeg',
  'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg',
  'https://images.pexels.com/photos/51311/cow-calf-cattle-stock-51311.jpeg',
  'https://images.pexels.com/photos/162801/potbelly-pig-pig-pet-domestic-162801.jpeg',
  'https://images.pexels.com/photos/104373/pexels-photo-104373.jpeg',
];

// Human image URLs
const humanImageUrls = [
  'https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg',
  'https://images.pexels.com/photos/2382895/pexels-photo-2382895.jpeg',
  'https://images.pexels.com/photos/6669308/pexels-photo-6669308.jpeg',
];

// Generate detection data
export const generateDetections = (count: number): Detection[] => {
  const detections: Detection[] = [];
  
  for (let i = 0; i < count; i++) {
    const isAnimal = Math.random() > 0.3;
    const timeOffset = Math.floor(Math.random() * 72); // Random time within last 72 hours
    
    if (isAnimal) {
      const speciesIndex = Math.floor(Math.random() * animalSpecies.length);
      detections.push({
        id: `a-${i}`,
        type: 'animal',
        species: animalSpecies[speciesIndex],
        confidence: Math.round((0.7 + Math.random() * 0.29) * 100) / 100,
        timestamp: format(subHours(new Date(), timeOffset), 'yyyy-MM-dd HH:mm:ss'),
        location: feedAreas[Math.floor(Math.random() * feedAreas.length)].name,
        imageUrl: animalImageUrls[Math.floor(Math.random() * animalImageUrls.length)],
      });
    } else {
      const isAuthorized = Math.random() > 0.4;
      detections.push({
        id: `h-${i}`,
        type: 'human',
        confidence: Math.round((0.65 + Math.random() * 0.34) * 100) / 100,
        timestamp: format(subHours(new Date(), timeOffset), 'yyyy-MM-dd HH:mm:ss'),
        location: feedAreas[Math.floor(Math.random() * feedAreas.length)].name,
        imageUrl: humanImageUrls[Math.floor(Math.random() * humanImageUrls.length)],
        isAuthorized,
      });
    }
  }
  
  // Sort by timestamp (newest first)
  return detections.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Generate alerts
export const generateAlerts = (detections: Detection[]): Alert[] => {
  const alerts: Alert[] = [];
  
  // Use unauthorized human detections for intrusion alerts
  const unauthorizedHumans = detections.filter(
    d => d.type === 'human' && d.isAuthorized === false
  );
  
  unauthorizedHumans.forEach((detection, index) => {
    if (index < 5) { // Limit to 5 intrusion alerts for demo
      alerts.push({
        id: `intrusion-${index}`,
        type: 'intrusion',
        message: `Unauthorized person detected in ${detection.location}`,
        severity: 'high',
        timestamp: detection.timestamp,
        isRead: Math.random() > 0.7,
        relatedDetection: detection,
      });
    }
  });
  
  // Add some system alerts
  const systemAlerts = [
    {
      id: 'system-1',
      type: 'system',
      message: 'Camera in Chicken Coop is offline',
      severity: 'medium',
      timestamp: format(subHours(new Date(), 6), 'yyyy-MM-dd HH:mm:ss'),
      isRead: true,
    },
    {
      id: 'system-2',
      type: 'system',
      message: 'Low light conditions affecting detection in North Pasture',
      severity: 'low',
      timestamp: format(subHours(new Date(), 12), 'yyyy-MM-dd HH:mm:ss'),
      isRead: false,
    },
    {
      id: 'system-3',
      type: 'system',
      message: 'Weekly system maintenance scheduled for tomorrow',
      severity: 'low',
      timestamp: format(subHours(new Date(), 24), 'yyyy-MM-dd HH:mm:ss'),
      isRead: true,
    },
  ];
  
  alerts.push(...systemAlerts as Alert[]);
  
  // Add some animal escape alerts
  alerts.push({
    id: 'animal-1',
    type: 'animal_escape',
    message: 'Potential gate breach detected in East Field',
    severity: 'medium',
    timestamp: format(subHours(new Date(), 3), 'yyyy-MM-dd HH:mm:ss'),
    isRead: false,
  });
  
  // Sort by timestamp (newest first)
  return alerts.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Generate statistics
export const generateStats = (detections: Detection[]): Stats => {
  const animals = detections.filter(d => d.type === 'animal');
  const humans = detections.filter(d => d.type === 'human');
  const authorizedHumans = humans.filter(d => d.isAuthorized === true);
  const unauthorizedHumans = humans.filter(d => d.isAuthorized === false);
  
  // Get counts by species
  const speciesCounts: Record<string, number> = {};
  animals.forEach(animal => {
    if (animal.species) {
      speciesCounts[animal.species] = (speciesCounts[animal.species] || 0) + 1;
    }
  });
  
  const animalSpeciesCount = Object.entries(speciesCounts).map(([species, count]) => ({
    species,
    count,
  }));
  
  // Generate detection stats by day for the last 7 days
  const detectionsByDay = [];
  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const dayStart = new Date(date + 'T00:00:00');
    const dayEnd = new Date(date + 'T23:59:59');
    
    const dayAnimals = animals.filter(
      d => new Date(d.timestamp) >= dayStart && new Date(d.timestamp) <= dayEnd
    ).length;
    
    const dayHumans = humans.filter(
      d => new Date(d.timestamp) >= dayStart && new Date(d.timestamp) <= dayEnd
    ).length;
    
    detectionsByDay.push({
      date,
      animals: dayAnimals,
      humans: dayHumans,
    });
  }
  
  return {
    totalAnimals: animals.length,
    totalHumans: humans.length,
    authorizedHumans: authorizedHumans.length,
    unauthorizedHumans: unauthorizedHumans.length,
    detectionsByDay,
    animalSpeciesCount,
  };
};

// Create initial dataset
export const initialDetections = generateDetections(30);
export const initialAlerts = generateAlerts(initialDetections);
export const initialStats = generateStats(initialDetections);

// Function to simulate real-time detection
export const simulateNewDetection = (): Detection => {
  const isAnimal = Math.random() > 0.3;
  const timeOffset = Math.floor(Math.random() * 2); // Within last 2 minutes
  
  if (isAnimal) {
    const speciesIndex = Math.floor(Math.random() * animalSpecies.length);
    return {
      id: `a-new-${Date.now()}`,
      type: 'animal',
      species: animalSpecies[speciesIndex],
      confidence: Math.round((0.7 + Math.random() * 0.29) * 100) / 100,
      timestamp: format(subMinutes(new Date(), timeOffset), 'yyyy-MM-dd HH:mm:ss'),
      location: feedAreas[Math.floor(Math.random() * feedAreas.length)].name,
      imageUrl: animalImageUrls[Math.floor(Math.random() * animalImageUrls.length)],
    };
  } else {
    const isAuthorized = Math.random() > 0.4;
    return {
      id: `h-new-${Date.now()}`,
      type: 'human',
      confidence: Math.round((0.65 + Math.random() * 0.34) * 100) / 100,
      timestamp: format(subMinutes(new Date(), timeOffset), 'yyyy-MM-dd HH:mm:ss'),
      location: feedAreas[Math.floor(Math.random() * feedAreas.length)].name,
      imageUrl: humanImageUrls[Math.floor(Math.random() * humanImageUrls.length)],
      isAuthorized,
    };
  }
};