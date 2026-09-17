import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import {
  Compass,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  CheckCircle2,
  ExternalLink,
  Plus,
  Info,
} from 'lucide-react';
import { SchoolRecord, UserLocation, LocationStatus } from '../types';
import { calculateDistanceKm, generateDirectionsUrl } from '../utils/geo';

interface MapViewProps {
  schools: SchoolRecord[];
  userLocation: UserLocation | null;
  onSelectSchool: (school: SchoolRecord) => void;
  onAddToVisitPlan: (school: SchoolRecord) => void;
  visitPlanUdiseCodes: Set<string>;
  routeSchools?: SchoolRecord[];
  focusedSchool?: SchoolRecord | null;
}

const RAMTEK_CENTER: [number, number] = [21.3980, 79.3308];

export const MapView: React.FC<MapViewProps> = ({
  schools,
  userLocation,
  onSelectSchool,
  onAddToVisitPlan,
  visitPlanUdiseCodes,
  routeSchools = [],
  focusedSchool = null,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const circleLayerRef = useRef<L.Circle | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [selectedRadiusKm, setSelectedRadiusKm] = useState<number>(200);
  const [filterLocStatus, setFilterLocStatus] = useState<string>('ALL');
  const [mapSearch, setMapSearch] = useState<string>('');

  // Create customized SVG DivIcons for each status
  const createMarkerIcon = (status: LocationStatus, isRouteStop?: number) => {
    let bgColor = '#2563eb'; // blue
    let label = 'V';

    if (isRouteStop !== undefined) {
      bgColor = '#4f46e5'; // indigo
      return L.divIcon({
        className: 'custom-route-marker',
        html: `<div style="background-color: ${bgColor}; color: white; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px;">${isRouteStop + 1}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    }

    switch (status) {
      case 'EXACT SCHOOL LOCATION':
        bgColor = '#059669'; // emerald
        label = 'E';
        break;
      case 'VILLAGE LOCATION':
        bgColor = '#2563eb'; // blue
        label = 'V';
        break;
      case 'GRAM PANCHAYAT LOCATION':
        bgColor = '#7c3aed'; // violet/purple
        label = 'GP';
        break;
      case 'LOCATION NEEDS VERIFICATION':
      default:
        bgColor = '#d97706'; // amber
        label = '!';
        break;
    }

    return L.divIcon({
      className: 'custom-school-marker',
      html: `<div style="background-color: ${bgColor}; color: white; border: 2px solid #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.35); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px; cursor: pointer;">${label}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -14],
    });
  };

  // Filter schools on the map
  const visibleSchools = useMemo(() => {
    const lat = userLocation?.latitude ?? RAMTEK_CENTER[0];
    const lng = userLocation?.longitude ?? RAMTEK_CENTER[1];

    return schools.filter((s) => {
      const dist = calculateDistanceKm(lat, lng, s.latitude, s.longitude);
      if (dist > selectedRadiusKm) return false;

      if (filterLocStatus !== 'ALL' && s.locationStatus !== filterLocStatus) {
        return false;
      }

      if (mapSearch.trim()) {
        const q = mapSearch.toLowerCase();
        const matchesName = s.schoolName.toLowerCase().includes(q);
        const matchesVillage = s.village.toLowerCase().includes(q);
        const matchesUdise = s.udiseCode.includes(q);
        if (!matchesName && !matchesVillage && !matchesUdise) return false;
      }

      return true;
    });
  }, [schools, userLocation, selectedRadiusKm, filterLocStatus, mapSearch]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: RAMTEK_CENTER,
      zoom: 11,
      zoomControl: false,
    });

    // Clean OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | Lighthouse Ramtek',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Layer for markers
    markersLayerRef.current = L.layerGroup().addTo(map);

    // Coverage Radius Circle
    circleLayerRef.current = L.circle(RAMTEK_CENTER, {
      radius: selectedRadiusKm * 1000,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.05,
      weight: 1.5,
      dashArray: '5, 8',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Coverage Radius Circle when selectedRadiusKm changes
  useEffect(() => {
    if (!mapInstanceRef.current || !circleLayerRef.current) return;
    const center = userLocation
      ? [userLocation.latitude, userLocation.longitude] as [number, number]
      : RAMTEK_CENTER;
    circleLayerRef.current.setLatLng(center);
    circleLayerRef.current.setRadius(selectedRadiusKm * 1000);
  }, [selectedRadiusKm, userLocation]);

  // Update User Location Live Marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div style="position: relative; width: 24px; height: 24px;">
            <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background-color: rgba(59, 130, 246, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; top: 4px; left: 4px; width: 16px; height: 16px; border-radius: 50%; background-color: #2563eb; border: 3px solid #ffffff; box-shadow: 0 0 10px rgba(37, 99, 235, 0.8);"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker([userLocation.latitude, userLocation.longitude], {
          icon: userIcon,
          zIndexOffset: 1000,
        })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: sans-serif; padding: 4px;">
              <strong style="color: #1e3a8a;">Your Current Location</strong>
              <div style="font-size: 11px; color: #475569; margin-top: 4px;">
                Accuracy: ±${Math.round(userLocation.accuracy)} meters
              </div>
            </div>
          `);
      } else {
        userMarkerRef.current.setLatLng([userLocation.latitude, userLocation.longitude]);
      }
    } else if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
  }, [userLocation]);

  // Update School Markers on Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    layer.clearLayers();

    // Map of route schools for index numbering
    const routeIndexMap = new Map<string, number>();
    routeSchools.forEach((s, idx) => routeIndexMap.set(s.udiseCode, idx));

    visibleSchools.forEach((school) => {
      const isRouteStop = routeIndexMap.get(school.udiseCode);
      const icon = createMarkerIcon(school.locationStatus, isRouteStop);

      const marker = L.marker([school.latitude, school.longitude], { icon });

      const dist = userLocation
        ? calculateDistanceKm(userLocation.latitude, userLocation.longitude, school.latitude, school.longitude)
        : calculateDistanceKm(RAMTEK_CENTER[0], RAMTEK_CENTER[1], school.latitude, school.longitude);

      const inPlan = visitPlanUdiseCodes.has(school.udiseCode);

      const popupHtml = `
        <div style="min-width: 240px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 700; color: #1e293b; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">UDISE: ${school.udiseCode}</span>
            <span style="font-size: 10px; font-weight: 700; color: #1e40af; background: #dbeafe; padding: 2px 6px; border-radius: 4px;">${dist} KM</span>
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.3;">
            ${school.schoolName}
          </h4>
          <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">
            <strong>Village:</strong> ${school.village} | <strong>GP:</strong> ${school.lgdPanchayat}
          </div>
          <div style="font-size: 10px; padding: 4px 6px; border-radius: 4px; background: #f8fafc; border: 1px solid #e2e8f0; margin-bottom: 8px;">
            <strong>Status:</strong> ${school.locationStatus}<br/>
            <span style="color: #64748b;">${school.locationAccuracy}</span>
          </div>
          <div style="display: flex; gap: 4px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
            <button id="btn-popup-details-${school.udiseCode}" style="flex: 1; padding: 5px 8px; background: #0284c7; color: white; border: none; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer;">
              Details
            </button>
            <a href="${generateDirectionsUrl(school, userLocation)}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; text-decoration: none; padding: 5px 8px; background: #059669; color: white; border-radius: 6px; font-size: 11px; font-weight: 600;">
              Directions
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        setTimeout(() => {
          const btn = document.getElementById(`btn-popup-details-${school.udiseCode}`);
          if (btn) {
            btn.onclick = () => onSelectSchool(school);
          }
        }, 50);
      });

      layer.addLayer(marker);
    });
  }, [visibleSchools, userLocation, routeSchools, visitPlanUdiseCodes]);

  // Update Route Polyline if active stops exist
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    if (routeSchools.length >= 2) {
      const latLngs: [number, number][] = [];
      if (userLocation) {
        latLngs.push([userLocation.latitude, userLocation.longitude]);
      }
      routeSchools.forEach((s) => latLngs.push([s.latitude, s.longitude]));

      routePolylineRef.current = L.polyline(latLngs, {
        color: '#4f46e5',
        weight: 4,
        opacity: 0.8,
        dashArray: '8, 6',
      }).addTo(map);

      map.fitBounds(routePolylineRef.current.getBounds(), { padding: [50, 50] });
    }
  }, [routeSchools, userLocation]);

  // Focus specific school when passed
  useEffect(() => {
    if (!mapInstanceRef.current || !focusedSchool) return;
    mapInstanceRef.current.flyTo([focusedSchool.latitude, focusedSchool.longitude], 15, {
      duration: 1.2,
    });
  }, [focusedSchool]);

  const recenterMap = (target: 'ramtek' | 'user') => {
    if (!mapInstanceRef.current) return;
    if (target === 'user' && userLocation) {
      mapInstanceRef.current.flyTo([userLocation.latitude, userLocation.longitude], 13);
    } else {
      mapInstanceRef.current.flyTo(RAMTEK_CENTER, 11);
    }
  };

  return (
    <div id="interactive-map-view" className="relative w-full h-[calc(100vh-140px)] min-h-[550px] bg-slate-100 flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        {/* Radius Filter & Search Bar */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xs p-2 rounded-2xl shadow-lg border border-slate-200/80 flex flex-wrap items-center gap-2 max-w-2xl">
          <div className="flex items-center space-x-1 pl-2 text-xs font-bold text-slate-700">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Coverage Radius:</span>
          </div>

          <div className="flex items-center space-x-1">
            {[5, 15, 25, 50, 100, 200].map((radius) => (
              <button
                key={radius}
                onClick={() => setSelectedRadiusKm(radius)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedRadiusKm === radius
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {radius} KM
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block"></div>

          {/* Quick Search on Map */}
          <input
            type="text"
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}
            placeholder="Filter pins on map..."
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44"
          />
        </div>

        {/* Recenter & Map Tools */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {userLocation && (
            <button
              onClick={() => recenterMap('user')}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-1.5 transition-all"
              title="Center on My GPS Location"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Center GPS</span>
            </button>
          )}
          <button
            onClick={() => recenterMap('ramtek')}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-1.5 transition-all"
            title="Reset to Ramtek Center"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ramtek Center</span>
          </button>
        </div>
      </div>

      {/* Floating Map Legend */}
      <div className="absolute bottom-6 left-4 z-[1000] bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl shadow-lg border border-slate-200/80 max-w-xs text-xs space-y-2">
        <div className="font-bold text-slate-900 flex items-center justify-between">
          <span>Map Pin Legend</span>
          <span className="text-[11px] font-normal text-slate-500">{visibleSchools.length} pins active</span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block shrink-0"></span>
            <span className="text-slate-700">Exact School Location (Ground Pin)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-block shrink-0"></span>
            <span className="text-slate-700">Village Location (Settlement Pin)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-purple-600 inline-block shrink-0"></span>
            <span className="text-slate-700">Gram Panchayat Location (Fallback)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block shrink-0"></span>
            <span className="text-slate-700">Location Needs Verification</span>
          </div>
        </div>
        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>Coverage: 200 KM</span>
          <span>Dashed Circle = Active Radius</span>
        </div>
      </div>

      {/* Leaflet Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
};
