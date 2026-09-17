export type LocationStatus =
  | 'EXACT SCHOOL LOCATION'
  | 'VILLAGE LOCATION'
  | 'GRAM PANCHAYAT LOCATION'
  | 'LOCATION NEEDS VERIFICATION';

export interface SchoolRecord {
  srNo: number;
  schoolName: string;
  udiseCode: string;
  state: string;
  district: string;
  block: string;
  cluster: string;
  village: string;
  pinCode: string;
  address: string;
  schoolManagement: string;
  schoolCategory: string;
  schoolType: string;
  classesFromTo: string;
  ruralUrban: string;
  schoolStatus: string;
  lgdVillage: string;
  lgdPanchayat: string;
  lgdBlock: string;
  
  // Location System
  latitude: number;
  longitude: number;
  locationStatus: LocationStatus;
  locationSource: string;
  locationAccuracy: string;
  locationMatchingPriority?: string;
  verificationMethod?: string;
  verifiedCompoundAddress?: string;
  
  // Dynamic runtime properties
  distanceKm?: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface VisitPlanItem {
  school: SchoolRecord;
  udiseCode?: string;
  visited: boolean;
  status?: 'PENDING' | 'VISITED';
  addedAt: string;
  visitedAt?: string;
  plannedDate?: string;
  notes?: string;
}

export interface FilterState {
  search: string;
  block: string;
  cluster: string;
  village: string;
  gramPanchayat: string;
  pinCode: string;
  schoolManagement: string;
  schoolCategory: string;
  schoolType: string;
  schoolStatus: string;
  ruralUrban: string;
  classesFromTo: string;
  locationStatus: string;
  radiusKm: number | null;
}

export type ActiveTab =
  | 'home'
  | 'blocks'
  | 'schools'
  | 'map'
  | 'route'
  | 'upload'
  | 'visits';
