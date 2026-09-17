import React from 'react';
import {
  Compass,
  List,
  Map,
  Route,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { ActiveTab, UserLocation } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  visitPlanCount: number;
  onRequestLocation: () => void;
  userLocation: UserLocation | null;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  visitPlanCount,
  onRequestLocation,
  userLocation,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 text-white shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-5 h-16">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
            activeTab === 'home' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* All Schools */}
        <button
          onClick={() => setActiveTab('schools')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
            activeTab === 'schools' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <List className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Schools</span>
        </button>

        {/* Interactive Map */}
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
            activeTab === 'map' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Map className="w-5 h-5 mb-1" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-[10px] tracking-tight">Map</span>
        </button>

        {/* Route Planner */}
        <button
          onClick={() => setActiveTab('route')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
            activeTab === 'route' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Route className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Route</span>
        </button>

        {/* Visits Tracker */}
        <button
          onClick={() => setActiveTab('visits')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors relative ${
            activeTab === 'visits' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <CheckCircle2 className="w-5 h-5 mb-1" />
            {visitPlanCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950">
                {visitPlanCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Visits</span>
        </button>
      </div>
    </nav>
  );
};
