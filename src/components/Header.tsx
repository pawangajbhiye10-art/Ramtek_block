import React from 'react';
import {
  Compass,
  MapPin,
  List,
  Map,
  Route,
  Upload,
  CheckCircle2,
  Navigation2,
  Layers,
} from 'lucide-react';
import { ActiveTab, UserLocation } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userLocation: UserLocation | null;
  onRequestLocation: () => void;
  visitPlanCount: number;
  totalSchoolsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userLocation,
  onRequestLocation,
  visitPlanCount,
  totalSchoolsCount,
}) => {
  return (
    <header id="app-header" className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-inner">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-lg text-white">
                  LIGHTHOUSE SCHOOL VISIT
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  NAGPUR DISTRICT
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Ramtek Taluka Field Visit & Marketing System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              HOME
            </button>
            <button
              id="nav-blocks"
              onClick={() => setActiveTab('blocks')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'blocks'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              BLOCKS
            </button>
            <button
              id="nav-schools"
              onClick={() => setActiveTab('schools')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'schools'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
              <span>ALL SCHOOLS</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-slate-800 text-slate-300">
                {totalSchoolsCount}
              </span>
            </button>
            <button
              id="nav-map"
              onClick={() => setActiveTab('map')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>INTERACTIVE MAP</span>
            </button>
            <button
              id="nav-route"
              onClick={() => setActiveTab('route')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'route'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Route className="w-4 h-4" />
              <span>ROUTE PLANNER</span>
            </button>
            <button
              id="nav-visits"
              onClick={() => setActiveTab('visits')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'visits'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>VISIT PLAN</span>
              {visitPlanCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-amber-500 text-slate-950 font-bold">
                  {visitPlanCount}
                </span>
              )}
            </button>
            <button
              id="nav-upload"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>UPLOAD</span>
            </button>
          </nav>

          {/* Right side: GPS Action Pill */}
          <div className="flex items-center space-x-2">
            <button
              id="header-gps-btn"
              onClick={onRequestLocation}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                userLocation
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title={
                userLocation
                  ? `Live GPS Active (±${Math.round(userLocation.accuracy)}m)`
                  : 'Click to enable live GPS location'
              }
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    userLocation ? 'bg-emerald-400 opacity-75' : 'bg-slate-400 opacity-50'
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    userLocation ? 'bg-emerald-500' : 'bg-slate-500'
                  }`}
                ></span>
              </span>
              <Navigation2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {userLocation ? 'GPS ACTIVE' : 'MY LOCATION'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
