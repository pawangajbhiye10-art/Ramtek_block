/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatsOverview } from './components/StatsOverview';
import { BlocksView } from './components/BlocksView';
import { SchoolsNearMe } from './components/SchoolsNearMe';
import { SchoolDirectory } from './components/SchoolDirectory';
import { MapView } from './components/MapView';
import { RoutePlanner } from './components/RoutePlanner';
import { VisitPlanTracker } from './components/VisitPlanTracker';
import { FileUpload } from './components/FileUpload';
import { SchoolDetailsModal } from './components/SchoolDetailsModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SchoolRecord, ActiveTab, UserLocation, VisitPlanItem } from './types';
import { INITIAL_SCHOOLS, loadMasterSchoolsFromCSV } from './data/schoolsData';

const STORAGE_KEY_VISITS = 'ramtek_visit_plan_v2';
const STORAGE_KEY_ROUTE = 'ramtek_route_schools_v2';
const STORAGE_KEY_CUSTOM_DATA = 'ramtek_custom_schools_v2';

export default function App() {
  // Master School Data (Initialized with independent coordinates for every single UDISE code)
  const [schools, setSchools] = useState<SchoolRecord[]>(() => {
    try {
      // Clear legacy storage if present
      localStorage.removeItem('ramtek_custom_schools_v1');
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to read saved schools from localStorage', e);
    }
    return INITIAL_SCHOOLS;
  });

  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // User Geolocation State
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Global search input state
  const [globalSearch, setGlobalSearch] = useState('');

  // Selected School for Full Profile Modal
  const [selectedSchool, setSelectedSchool] = useState<SchoolRecord | null>(null);

  // School focused on interactive map
  const [focusedSchool, setFocusedSchool] = useState<SchoolRecord | null>(null);

  // Field Visit Plan State (persisted in localStorage)
  const [visitPlan, setVisitPlan] = useState<VisitPlanItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VISITS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse visit plan from localStorage', e);
    }
    return [];
  });

  // Route Planner Stops (persisted in localStorage)
  const [routeSchools, setRouteSchools] = useState<SchoolRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROUTE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse route stops from localStorage', e);
    }
    // Default initial stops: Mansar and Ramtek city prominent centers
    return [];
  });

  // Sync visit plan to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VISITS, JSON.stringify(visitPlan));
    } catch (e) {
      console.error('Failed to persist visit plan', e);
    }
  }, [visitPlan]);

  // Sync route stops to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ROUTE, JSON.stringify(routeSchools));
    } catch (e) {
      console.error('Failed to persist route schools', e);
    }
  }, [routeSchools]);

  // Fast lookup set for visit plan items
  const visitPlanUdiseCodes = useMemo(() => {
    return new Set(visitPlan.map((v) => v.school.udiseCode));
  }, [visitPlan]);

  // High Accuracy GPS Geolocation Handler
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setLocationError('Unable to retrieve your precise location. Using default Ramtek reference center.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  // Simulate Location helper (for testing proximity without physical presence in Ramtek)
  const simulateLocation = (latitude: number, longitude: number, label: string) => {
    setUserLocation({
      latitude,
      longitude,
      accuracy: 10,
      timestamp: Date.now(),
    });
  };

  // Visit Plan Actions
  const addToVisitPlan = (school: SchoolRecord) => {
    if (!visitPlanUdiseCodes.has(school.udiseCode)) {
      const newItem: VisitPlanItem = {
        school,
        visited: false,
        addedAt: new Date().toISOString(),
      };
      setVisitPlan((prev) => [...prev, newItem]);
    } else {
      // If already in plan, remove it (toggle behavior)
      setVisitPlan((prev) => prev.filter((v) => v.school.udiseCode !== school.udiseCode));
    }
  };

  const toggleVisited = (udiseCode: string) => {
    setVisitPlan((prev) =>
      prev.map((item) => {
        if (item.school.udiseCode === udiseCode) {
          const nextVisited = !item.visited;
          return {
            ...item,
            visited: nextVisited,
            visitedAt: nextVisited ? new Date().toISOString() : undefined,
          };
        }
        return item;
      })
    );
  };

  const updateVisitNotes = (udiseCode: string, notes: string) => {
    setVisitPlan((prev) =>
      prev.map((item) => (item.school.udiseCode === udiseCode ? { ...item, notes } : item))
    );
  };

  const updateVisitDate = (udiseCode: string, plannedDate: string) => {
    setVisitPlan((prev) =>
      prev.map((item) => (item.school.udiseCode === udiseCode ? { ...item, plannedDate } : item))
    );
  };

  const removeVisitPlanItem = (udiseCode: string) => {
    setVisitPlan((prev) => prev.filter((item) => item.school.udiseCode !== udiseCode));
  };

  const clearAllVisits = () => {
    setVisitPlan([]);
  };

  // Switch to Map with specific school focused
  const handleViewSchoolOnMap = (school: SchoolRecord) => {
    setFocusedSchool(school);
    setActiveTab('map');
  };

  // Upload actions
  const handleUpdateSchools = (newSchools: SchoolRecord[], mode: 'replace' | 'merge') => {
    let updated: SchoolRecord[];
    if (mode === 'replace') {
      updated = newSchools;
    } else {
      const existingMap = new Map<string, SchoolRecord>();
      schools.forEach((s) => existingMap.set(s.udiseCode, s));
      newSchools.forEach((s) => existingMap.set(s.udiseCode, s));
      updated = Array.from(existingMap.values());
    }
    setSchools(updated);
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_DATA, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store custom schools', e);
    }
  };

  const handleRestoreDefaultSchools = () => {
    const defaultData = loadMasterSchoolsFromCSV();
    setSchools(defaultData);
    localStorage.removeItem(STORAGE_KEY_CUSTOM_DATA);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white pb-16 lg:pb-0">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userLocation={userLocation}
        onRequestLocation={requestLocation}
        visitPlanCount={visitPlan.length}
        totalSchoolsCount={schools.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <HeroSection
              totalSchools={schools.length}
              totalBlocks={new Set(schools.map((s) => s.block)).size}
              totalVillages={new Set(schools.map((s) => s.village)).size}
              searchQuery={globalSearch}
              onSearchChange={(q) => {
                setGlobalSearch(q);
                if (q.trim().length > 1) {
                  setActiveTab('schools');
                }
              }}
              onViewMap={() => setActiveTab('map')}
              onRequestLocation={requestLocation}
              userLocation={userLocation}
            />

            <StatsOverview
              schools={schools}
              onFilterLocationStatus={(status) => {
                setActiveTab('schools');
              }}
            />

            <SchoolsNearMe
              schools={schools}
              userLocation={userLocation}
              onRequestLocation={requestLocation}
              onSelectSchool={setSelectedSchool}
              onViewOnMap={handleViewSchoolOnMap}
              onAddToVisitPlan={addToVisitPlan}
              visitPlanUdiseCodes={visitPlanUdiseCodes}
              onSimulateLocation={simulateLocation}
            />
          </div>
        )}

        {activeTab === 'blocks' && (
          <div className="animate-in fade-in duration-150">
            <BlocksView
              schools={schools}
              onSelectCluster={(cluster) => {
                setActiveTab('schools');
              }}
              onViewBlockSchools={(block) => {
                setActiveTab('schools');
              }}
            />
          </div>
        )}

        {activeTab === 'schools' && (
          <div className="animate-in fade-in duration-150">
            <SchoolDirectory
              schools={schools}
              userLocation={userLocation}
              onSelectSchool={setSelectedSchool}
              onViewOnMap={handleViewSchoolOnMap}
              onAddToVisitPlan={addToVisitPlan}
              visitPlanUdiseCodes={visitPlanUdiseCodes}
            />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="animate-in fade-in duration-150">
            <MapView
              schools={schools}
              userLocation={userLocation}
              onSelectSchool={setSelectedSchool}
              onAddToVisitPlan={addToVisitPlan}
              visitPlanUdiseCodes={visitPlanUdiseCodes}
              routeSchools={routeSchools}
              focusedSchool={focusedSchool}
            />
          </div>
        )}

        {activeTab === 'route' && (
          <div className="animate-in fade-in duration-150">
            <RoutePlanner
              routeSchools={routeSchools}
              allSchools={schools}
              userLocation={userLocation}
              onUpdateRoute={setRouteSchools}
              onViewOnMap={() => setActiveTab('map')}
              onSelectSchool={setSelectedSchool}
            />
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="animate-in fade-in duration-150">
            <VisitPlanTracker
              visitPlan={visitPlan}
              userLocation={userLocation}
              onToggleVisited={toggleVisited}
              onUpdateNotes={updateVisitNotes}
              onUpdateDate={updateVisitDate}
              onRemoveItem={removeVisitPlanItem}
              onClearAll={clearAllVisits}
              onSelectSchool={setSelectedSchool}
              onViewOnMap={handleViewSchoolOnMap}
              onNavigateToDirectory={() => setActiveTab('schools')}
            />
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="animate-in fade-in duration-150">
            <FileUpload
              currentSchoolsCount={schools.length}
              onUpdateSchools={handleUpdateSchools}
              onRestoreDefault={handleRestoreDefaultSchools}
            />
          </div>
        )}
      </main>

      {/* School Full Profile Details Modal */}
      {selectedSchool && (
        <SchoolDetailsModal
          school={selectedSchool}
          userLocation={userLocation}
          onClose={() => setSelectedSchool(null)}
          onViewOnMap={handleViewSchoolOnMap}
          onAddToVisitPlan={addToVisitPlan}
          inVisitPlan={visitPlanUdiseCodes.has(selectedSchool.udiseCode)}
          isVisited={
            visitPlan.find((v) => v.school.udiseCode === selectedSchool.udiseCode)?.visited ?? false
          }
          onToggleVisited={toggleVisited}
        />
      )}

      {/* Sticky Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        visitPlanCount={visitPlan.length}
        onRequestLocation={requestLocation}
        userLocation={userLocation}
      />
    </div>
  );
}
