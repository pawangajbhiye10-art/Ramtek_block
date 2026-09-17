import React, { useState, useMemo } from 'react';
import {
  Navigation,
  MapPin,
  Compass,
  ArrowUpDown,
  CheckCircle2,
  ExternalLink,
  Plus,
  Info,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { SchoolRecord, UserLocation, LocationStatus } from '../types';
import { calculateDistanceKm, generateDirectionsUrl } from '../utils/geo';

interface SchoolsNearMeProps {
  schools: SchoolRecord[];
  userLocation: UserLocation | null;
  onRequestLocation: () => void;
  onSelectSchool: (school: SchoolRecord) => void;
  onViewOnMap: (school: SchoolRecord) => void;
  onAddToVisitPlan: (school: SchoolRecord) => void;
  visitPlanUdiseCodes: Set<string>;
  onSimulateLocation: (lat: number, lng: number, label: string) => void;
}

const RADIUS_OPTIONS = [
  { label: 'ALL', value: null },
  { label: '5 KM', value: 5 },
  { label: '10 KM', value: 10 },
  { label: '15 KM', value: 15 },
  { label: '20 KM', value: 20 },
  { label: '25 KM', value: 25 },
  { label: '50 KM', value: 50 },
  { label: '100 KM', value: 100 },
  { label: '200 KM', value: 200 },
];

export const SchoolsNearMe: React.FC<SchoolsNearMeProps> = ({
  schools,
  userLocation,
  onRequestLocation,
  onSelectSchool,
  onViewOnMap,
  onAddToVisitPlan,
  visitPlanUdiseCodes,
  onSimulateLocation,
}) => {
  const [selectedRadius, setSelectedRadius] = useState<number | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  // Compute distances for all schools relative to current active userLocation (or Ramtek center if none)
  const schoolsWithDistance = useMemo(() => {
    const lat = userLocation?.latitude ?? 21.3980; // default Ramtek center
    const lng = userLocation?.longitude ?? 79.3308;

    return schools
      .map((s) => ({
        ...s,
        distanceKm: calculateDistanceKm(lat, lng, s.latitude, s.longitude),
      }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, [schools, userLocation]);

  // Compute count of schools inside each radius option for the pill badges
  const radiusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const lat = userLocation?.latitude ?? 21.3980;
    const lng = userLocation?.longitude ?? 79.3308;

    RADIUS_OPTIONS.forEach((opt) => {
      if (opt.value === null) {
        counts[opt.label] = schools.length;
      } else {
        const count = schools.filter(
          (s) => calculateDistanceKm(lat, lng, s.latitude, s.longitude) <= opt.value!
        ).length;
        counts[opt.label] = count;
      }
    });
    return counts;
  }, [schools, userLocation]);

  // Filter list by selected radius and text query
  const filteredSchools = useMemo(() => {
    return schoolsWithDistance.filter((s) => {
      if (selectedRadius !== null && (s.distanceKm ?? Infinity) > selectedRadius) {
        return false;
      }
      if (filterQuery.trim()) {
        const q = filterQuery.toLowerCase();
        const matchesName = s.schoolName.toLowerCase().includes(q);
        const matchesVillage = s.village.toLowerCase().includes(q);
        const matchesUdise = s.udiseCode.toLowerCase().includes(q);
        const matchesGP = s.lgdPanchayat.toLowerCase().includes(q);
        if (!matchesName && !matchesVillage && !matchesUdise && !matchesGP) {
          return false;
        }
      }
      return true;
    });
  }, [schoolsWithDistance, selectedRadius, filterQuery]);

  const getLocationBadge = (status: LocationStatus) => {
    switch (status) {
      case 'EXACT SCHOOL LOCATION':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            EXACT SCHOOL LOCATION
          </span>
        );
      case 'VILLAGE LOCATION':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            VILLAGE LOCATION
          </span>
        );
      case 'GRAM PANCHAYAT LOCATION':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-100 text-indigo-800 border border-indigo-300">
            GRAM PANCHAYAT LOCATION
          </span>
        );
      case 'LOCATION NEEDS VERIFICATION':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            LOCATION NEEDS VERIFICATION
          </span>
        );
    }
  };

  return (
    <section id="schools-around-me" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header with GPS Status Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Schools Around Your Location
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time distance calculations using geodesic Haversine formula, sorted from nearest to farthest
                </p>
              </div>
            </div>
          </div>

          {/* Location Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onRequestLocation}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer ${
                userLocation
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{userLocation ? 'RE-ACQUIRE LIVE GPS' : 'ENABLE LIVE GPS'}</span>
            </button>

            {/* Quick Test Location Switchers */}
            <div className="hidden sm:flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 p-1 rounded-xl">
              <span className="px-2 text-[11px] font-medium text-slate-400">Test Points:</span>
              <button
                onClick={() => onSimulateLocation(21.3980, 79.3308, 'Ramtek Center')}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-700 font-medium transition-colors"
                title="Simulate GPS at Ramtek Tahsil Center"
              >
                Ramtek Center
              </button>
              <button
                onClick={() => onSimulateLocation(21.4012, 79.2598, 'Mansar')}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-700 font-medium transition-colors"
                title="Simulate GPS at Mansar Junction"
              >
                Mansar
              </button>
              <button
                onClick={() => onSimulateLocation(21.5885, 79.3820, 'Deolapar')}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-700 font-medium transition-colors"
                title="Simulate GPS at Deolapar NH44"
              >
                Deolapar
              </button>
            </div>
          </div>
        </div>

        {/* Current Origin Coordinate Banner */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">Current Reference Point:</span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800">
              {userLocation
                ? `${userLocation.latitude.toFixed(4)}° N, ${userLocation.longitude.toFixed(4)}° E (±${Math.round(userLocation.accuracy)}m)`
                : '21.3980° N, 79.3308° E (Ramtek Center Default)'}
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">
            {userLocation ? 'Live Browser Geolocation Active' : 'Click "Enable Live GPS" to use device position'}
          </span>
        </div>
      </div>

      {/* Radius Filters & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Filter by Proximity Radius:
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search near schools..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Radius Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {RADIUS_OPTIONS.map((opt) => {
            const isSelected = selectedRadius === opt.value;
            const count = radiusCounts[opt.label] || 0;
            return (
              <button
                key={opt.label}
                onClick={() => setSelectedRadius(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* School Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchools.slice(0, 30).map((school) => {
          const isVisited = visitPlanUdiseCodes.has(school.udiseCode);
          return (
            <div
              key={school.udiseCode}
              id={`near-school-${school.udiseCode}`}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
            >
              {/* Top Row: Distance & Location Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-1.5 text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100">
                  <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-bold text-sm tracking-tight">
                    {school.distanceKm ?? 0} KM
                  </span>
                </div>
                <div>{getLocationBadge(school.locationStatus)}</div>
              </div>

              {/* School Details */}
              <div className="space-y-1.5">
                <h3
                  onClick={() => onSelectSchool(school)}
                  className="font-bold text-base text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-tight"
                >
                  {school.schoolName}
                </h3>
                <div className="flex flex-wrap items-center text-xs text-slate-500 gap-x-2 gap-y-0.5">
                  <span className="font-medium text-slate-700">Village: {school.village}</span>
                  <span>•</span>
                  <span>GP: {school.lgdPanchayat}</span>
                  <span>•</span>
                  <span>PIN: {school.pinCode}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  UDISE: <span className="text-slate-800 font-semibold">{school.udiseCode}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {school.schoolCategory}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {school.schoolManagement}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                <button
                  onClick={() => onViewOnMap(school)}
                  className="py-2 px-2 text-center text-xs font-semibold rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors"
                >
                  VIEW ON MAP
                </button>
                <a
                  href={generateDirectionsUrl(school, userLocation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 text-center text-xs font-semibold rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <span>DIRECTIONS</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                <button
                  onClick={() => onAddToVisitPlan(school)}
                  className={`py-2 px-2 text-center text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1 ${
                    isVisited
                      ? 'bg-amber-100 text-amber-900 font-bold'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>{isVisited ? 'IN PLAN' : 'VISIT'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No schools found in this range</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try expanding the proximity radius to 25 KM, 50 KM or 200 KM to encompass all 214 schools in Ramtek Block.
          </p>
          <button
            onClick={() => setSelectedRadius(null)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
          >
            Show All Schools
          </button>
        </div>
      )}

      {filteredSchools.length > 30 && (
        <div className="text-center py-3">
          <p className="text-xs text-slate-400">
            Showing closest 30 of {filteredSchools.length} schools. Use the ALL SCHOOLS directory for complete pagination and filters.
          </p>
        </div>
      )}
    </section>
  );
};
