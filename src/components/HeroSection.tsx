import React from 'react';
import {
  Search,
  MapPin,
  Compass,
  Navigation,
  Map as MapIcon,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react';
import { UserLocation } from '../types';

interface HeroSectionProps {
  totalSchools: number;
  totalBlocks: number;
  totalVillages: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onViewMap: () => void;
  onRequestLocation: () => void;
  userLocation: UserLocation | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalSchools,
  totalBlocks,
  totalVillages,
  searchQuery,
  onSearchChange,
  onViewMap,
  onRequestLocation,
  userLocation,
}) => {
  return (
    <section id="hero-section" className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-700/60 shadow-inner">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Badges / Pill row */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-300 border border-blue-500/40">
            <Compass className="w-3.5 h-3.5 mr-1.5" />
            Reference Location: Ramtek, Nagpur, Maharashtra
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30">
            Coverage Radius: 200 KM
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
            Official Master Dataset: RAMTEK.csv
          </span>
        </div>

        {/* Heading & Subheading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Lighthouse School Visit — Ramtek
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Professional School Marketing & Field Visit Planning Tool for Ramtek Taluka & Nagpur District with real verified location hierarchy.
          </p>
        </div>

        {/* Quick Highlights Metrics */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 py-2 text-slate-300 text-sm">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>
              <strong className="text-white text-base">{totalSchools}</strong> Master Schools
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              <strong className="text-white text-base">{totalBlocks}</strong> Block ({'RAMTEK'})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>
              <strong className="text-white text-base">{totalVillages}</strong> Villages
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
            <input
              id="hero-global-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search school name, village, UDISE code, Gram Panchayat, PIN..."
              className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-28 text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onViewMap}
              className="absolute right-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center space-x-1"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="hero-my-location-btn"
            onClick={onRequestLocation}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>
              {userLocation ? 'LOCATION ACTIVE (RE-CHECK)' : 'MY LOCATION (LIVE GPS)'}
            </span>
          </button>
          <button
            id="hero-view-map-btn"
            onClick={onViewMap}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
          >
            <MapIcon className="w-4 h-4" />
            <span>VIEW INTERACTIVE MAP</span>
          </button>
        </div>
      </div>
    </section>
  );
};
