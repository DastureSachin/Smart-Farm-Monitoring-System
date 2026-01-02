export type DetectionType = 'animal' | 'human';

export interface Detection {
  id: string;
  type: DetectionType;
  species?: string;
  confidence: number;
  timestamp: string;
  location: string;
  imageUrl: string;
  isAuthorized?: boolean;
}

export interface FeedArea {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  lastDetection?: Detection;
}

export interface Alert {
  id: string;
  type: 'intrusion' | 'animal_escape' | 'system';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  isRead: boolean;
  relatedDetection?: Detection;
}

export interface Stats {
  totalAnimals: number;
  totalHumans: number;
  authorizedHumans: number;
  unauthorizedHumans: number;
  detectionsByDay: {
    date: string;
    animals: number;
    humans: number;
  }[];
  animalSpeciesCount: {
    species: string;
    count: number;
  }[];
}