import { SchoolRecord, UserLocation } from '../types';

/**
 * Calculates the great-circle distance between two points in kilometers
 * using the Haversine formula.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // 1 decimal place
}

/**
 * Computes travel time estimate assuming average rural/suburban speed of 35 km/h
 * plus 15 minutes visit overhead per stop.
 */
export function estimateTravelTime(
  distanceKm: number,
  stopsCount: number
): { totalMinutes: number; formatted: string } {
  const travelMinutes = Math.round((distanceKm / 35) * 60);
  const visitMinutes = Math.max(0, stopsCount) * 15;
  const total = travelMinutes + visitMinutes;

  const hours = Math.floor(total / 60);
  const mins = total % 60;

  if (hours === 0) {
    return { totalMinutes: total, formatted: `${mins} mins` };
  }
  return { totalMinutes: total, formatted: `${hours}h ${mins}m` };
}

/**
 * Optimizes a list of schools into an efficient sequential route
 * using a Greedy Nearest-Neighbor Traveling Salesperson heuristic.
 */
export function optimizeRouteOrder(
  schools: SchoolRecord[],
  startLocation?: { latitude: number; longitude: number }
): {
  orderedSchools: SchoolRecord[];
  totalDistanceKm: number;
} {
  if (schools.length <= 1) {
    return {
      orderedSchools: [...schools],
      totalDistanceKm: 0,
    };
  }

  const remaining = [...schools];
  const ordered: SchoolRecord[] = [];
  let currentLat = startLocation ? startLocation.latitude : remaining[0].latitude;
  let currentLng = startLocation ? startLocation.longitude : remaining[0].longitude;
  let totalDistance = 0;

  // If no start location provided, start with first school
  if (!startLocation) {
    const first = remaining.shift()!;
    ordered.push(first);
    currentLat = first.latitude;
    currentLng = first.longitude;
  }

  while (remaining.length > 0) {
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const d = calculateDistanceKm(
        currentLat,
        currentLng,
        remaining[i].latitude,
        remaining[i].longitude
      );
      if (d < minDistance) {
        minDistance = d;
        nearestIdx = i;
      }
    }

    const nextSchool = remaining.splice(nearestIdx, 1)[0];
    ordered.push(nextSchool);
    totalDistance += minDistance;
    currentLat = nextSchool.latitude;
    currentLng = nextSchool.longitude;
  }

  return {
    orderedSchools: ordered,
    totalDistanceKm: Math.round(totalDistance * 10) / 10,
  };
}

/**
 * Generates an external Google Maps navigation link for a route
 */
export function generateGoogleMapsRouteUrl(
  schools: SchoolRecord[],
  userLoc?: UserLocation | null
): string {
  if (schools.length === 0) return 'https://www.google.com/maps';

  const origin = userLoc
    ? `${userLoc.latitude},${userLoc.longitude}`
    : `${schools[0].latitude},${schools[0].longitude}`;

  const destination = `${schools[schools.length - 1].latitude},${schools[schools.length - 1].longitude}`;

  const waypoints = schools
    .slice(userLoc ? 0 : 1, schools.length - 1)
    .map(s => `${s.latitude},${s.longitude}`)
    .join('|');

  let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
  if (waypoints) {
    url += `&waypoints=${encodeURIComponent(waypoints)}`;
  }
  return url;
}

/**
 * Generates a single Google Maps navigation link
 */
export function generateDirectionsUrl(
  school: SchoolRecord,
  userLoc?: UserLocation | null
): string {
  if (userLoc) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLoc.latitude},${userLoc.longitude}&destination=${school.latitude},${school.longitude}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${school.latitude},${school.longitude}`;
}
