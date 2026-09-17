import React, { useState } from 'react';
import {
  Route,
  Navigation,
  Compass,
  ArrowUp,
  ArrowDown,
  Trash2,
  Sparkles,
  MapPin,
  ExternalLink,
  Plus,
  Clock,
  Car,
  RotateCcw,
  CheckCircle2,
  ListOrdered,
} from 'lucide-react';
import { SchoolRecord, UserLocation } from '../types';
import {
  optimizeRouteOrder,
  calculateDistanceKm,
  estimateTravelTime,
  generateGoogleMapsRouteUrl,
} from '../utils/geo';

interface RoutePlannerProps {
  routeSchools: SchoolRecord[];
  allSchools: SchoolRecord[];
  userLocation: UserLocation | null;
  onUpdateRoute: (schools: SchoolRecord[]) => void;
  onViewOnMap: () => void;
  onSelectSchool: (school: SchoolRecord) => void;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  routeSchools,
  allSchools,
  userLocation,
  onUpdateRoute,
  onViewOnMap,
  onSelectSchool,
}) => {
  const [selectedSchoolToAdd, setSelectedSchoolToAdd] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiBriefing, setAiBriefing] = useState<string | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  // Compute total route distance
  const totalDistanceKm = React.useMemo(() => {
    if (routeSchools.length <= 1) return 0;
    let dist = 0;
    for (let i = 0; i < routeSchools.length - 1; i++) {
      dist += calculateDistanceKm(
        routeSchools[i].latitude,
        routeSchools[i].longitude,
        routeSchools[i + 1].latitude,
        routeSchools[i + 1].longitude
      );
    }
    return Math.round(dist * 10) / 10;
  }, [routeSchools]);

  const travelTime = estimateTravelTime(totalDistanceKm, routeSchools.length);

  // Reorder stop
  const moveStop = (index: number, direction: 'up' | 'down') => {
    const newStops = [...routeSchools];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newStops.length) return;

    const [moved] = newStops.splice(index, 1);
    newStops.splice(targetIndex, 0, moved);
    onUpdateRoute(newStops);
  };

  const removeStop = (udiseCode: string) => {
    onUpdateRoute(routeSchools.filter((s) => s.udiseCode !== udiseCode));
  };

  const clearAllStops = () => {
    if (confirm('Clear all stops from route?')) {
      onUpdateRoute([]);
      setAiBriefing(null);
    }
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchoolToAdd) return;
    const school = allSchools.find((s) => s.udiseCode === selectedSchoolToAdd);
    if (school && !routeSchools.some((s) => s.udiseCode === school.udiseCode)) {
      onUpdateRoute([...routeSchools, school]);
      setSelectedSchoolToAdd('');
    }
  };

  // Run TSP optimization
  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const result = optimizeRouteOrder(routeSchools, userLocation ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : undefined);
      onUpdateRoute(result.orderedSchools);
      setIsOptimizing(false);
    }, 400);
  };

  // Call AI Route Assistant Endpoint
  const handleGenerateBriefing = async () => {
    if (routeSchools.length === 0) return;
    setIsGeneratingBrief(true);
    try {
      const res = await fetch('/api/visit-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schools: routeSchools,
          visitorName: 'Lighthouse Field Officer',
        }),
      });
      const data = await res.json();
      if (data.briefing) {
        setAiBriefing(data.briefing);
      }
    } catch (err) {
      console.error(err);
      setAiBriefing('Error generating field briefing. Review local road conditions before departure.');
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  const googleMapsUrl = generateGoogleMapsRouteUrl(routeSchools, userLocation);

  return (
    <div id="route-planner-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Route className="w-6 h-6 text-indigo-600" />
            <span>Field Visit Route Planner</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Optimize your multi-school travel sequence across Ramtek Taluka to minimize driving distance and fuel costs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {routeSchools.length >= 2 && (
            <button
              onClick={handleOptimizeRoute}
              disabled={isOptimizing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isOptimizing ? 'OPTIMIZING...' : 'OPTIMIZE ROUTE (SHORTEST)'}</span>
            </button>
          )}

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
          >
            <Car className="w-4 h-4" />
            <span>START NAVIGATION (GOOGLE MAPS)</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>

          {routeSchools.length > 0 && (
            <button
              onClick={onViewOnMap}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              VIEW ON MAP
            </button>
          )}
        </div>
      </div>

      {/* Route Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Selected Schools
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{routeSchools.length}</div>
          <p className="text-[11px] text-slate-400">Total planned stops</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Route Distance
          </div>
          <div className="text-2xl font-bold text-indigo-700 mt-1">{totalDistanceKm} KM</div>
          <p className="text-[11px] text-slate-400">Point-to-point geodesic</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Est. Trip Duration
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{travelTime.formatted}</div>
          <p className="text-[11px] text-slate-400">Driving + 15m/stop</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Starting Point
          </div>
          <div className="text-sm font-bold text-slate-800 mt-1 truncate">
            {userLocation ? 'Your Live GPS Location' : routeSchools[0]?.schoolName || 'Not selected'}
          </div>
          <p className="text-[11px] text-slate-400">Origin waypoint</p>
        </div>
      </div>

      {/* Add School to Route Bar */}
      <form onSubmit={handleAddSchool} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Add School to Itinerary:
          </label>
          <select
            value={selectedSchoolToAdd}
            onChange={(e) => setSelectedSchoolToAdd(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a school from RAMTEK.csv...</option>
            {allSchools.map((s) => {
              const alreadyAdded = routeSchools.some((r) => r.udiseCode === s.udiseCode);
              return (
                <option key={s.udiseCode} value={s.udiseCode} disabled={alreadyAdded}>
                  {alreadyAdded ? '✓ ' : ''}{s.schoolName} ({s.village}, PIN {s.pinCode})
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          disabled={!selectedSchoolToAdd}
          className="w-full sm:w-auto mt-auto py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-1 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>ADD STOP</span>
        </button>

        {routeSchools.length > 0 && (
          <button
            type="button"
            onClick={clearAllStops}
            className="w-full sm:w-auto mt-auto py-2.5 px-4 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>CLEAR</span>
          </button>
        )}
      </form>

      {/* Stops Sequence List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <ListOrdered className="w-5 h-5 text-indigo-600" />
            <span>Sequential Itinerary Stops</span>
          </h3>
          <span className="text-xs text-slate-400">
            Reorder stops with arrows or click Optimize Route
          </span>
        </div>

        {routeSchools.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
            <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No schools in your route yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Select schools from the dropdown above or click "+ VISIT" in the School Directory or Near Me section to build your route.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {routeSchools.map((school, index) => {
              const prev = index > 0 ? routeSchools[index - 1] : null;
              const legDistance = prev
                ? calculateDistanceKm(prev.latitude, prev.longitude, school.latitude, school.longitude)
                : 0;

              return (
                <div
                  key={school.udiseCode}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {index + 1}
                    </div>
                    <div>
                      <h4
                        onClick={() => onSelectSchool(school)}
                        className="font-bold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer"
                      >
                        {school.schoolName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {school.village}, GP: {school.lgdPanchayat} (PIN {school.pinCode}) | UDISE: {school.udiseCode}
                      </p>
                      {index > 0 && (
                        <div className="text-[11px] font-semibold text-indigo-700 mt-1">
                          ↳ Leg {index}: +{legDistance} KM from Stop {index}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 self-end sm:self-center">
                    <button
                      onClick={() => moveStop(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30 text-slate-700"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveStop(index, 'down')}
                      disabled={index === routeSchools.length - 1}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30 text-slate-700"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeStop(school.udiseCode)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600"
                      title="Remove from Route"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Field Briefing Panel */}
      {routeSchools.length > 0 && (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">
                AI Field Visit Briefing & Pitch Strategy
              </h3>
            </div>
            <button
              onClick={handleGenerateBriefing}
              disabled={isGeneratingBrief}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingBrief ? 'GENERATING...' : 'GENERATE BRIEFING'}</span>
            </button>
          </div>

          {aiBriefing ? (
            <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              {aiBriefing}
            </div>
          ) : (
            <p className="text-xs text-slate-300">
              Click &quot;Generate Briefing&quot; to receive tailored advice on travel logistics, school timings, and leadership outreach customized for this itinerary.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
