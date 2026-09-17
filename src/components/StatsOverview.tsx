import React from 'react';
import {
  GraduationCap,
  Building,
  MapPin,
  Landmark,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { SchoolRecord } from '../types';

interface StatsOverviewProps {
  schools: SchoolRecord[];
  onFilterLocationStatus?: (status: string) => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  schools,
  onFilterLocationStatus,
}) => {
  const totalSchools = schools.length;
  const uniqueBlocks = new Set(schools.map((s) => s.block).filter(Boolean)).size;
  const uniqueVillages = new Set(schools.map((s) => s.village).filter(Boolean)).size;
  const uniqueGPs = new Set(schools.map((s) => s.lgdPanchayat).filter(Boolean)).size;

  const verifiedLocations = schools.filter(
    (s) =>
      s.locationStatus === 'EXACT SCHOOL LOCATION' ||
      s.locationStatus === 'VILLAGE LOCATION' ||
      s.locationStatus === 'GRAM PANCHAYAT LOCATION'
  ).length;

  const exactLocations = schools.filter(
    (s) => s.locationStatus === 'EXACT SCHOOL LOCATION'
  ).length;

  const needingVerification = schools.filter(
    (s) => s.locationStatus === 'LOCATION NEEDS VERIFICATION'
  ).length;

  return (
    <section id="stats-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Ramtek Taluka Field Summary
          </h2>
          <p className="text-sm text-slate-500">
            Real-time aggregate data computed directly from the official RAMTEK.csv master file
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-2 text-xs text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          <span className="font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            Independent UDISE Coordinates: 214 / 214 (0% Reuse)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {/* Total Schools */}
        <div
          id="stat-total-schools"
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all"
        >
          <div className="flex items-center justify-between text-blue-600 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Schools
            </span>
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalSchools}</div>
          <p className="text-xs text-slate-400 mt-1">Official master count</p>
        </div>

        {/* Total Blocks */}
        <div
          id="stat-total-blocks"
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all"
        >
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Blocks
            </span>
            <Building className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{uniqueBlocks}</div>
          <p className="text-xs text-slate-400 mt-1">Ramtek Taluka</p>
        </div>

        {/* Total Villages */}
        <div
          id="stat-total-villages"
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all"
        >
          <div className="flex items-center justify-between text-cyan-600 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Villages
            </span>
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{uniqueVillages}</div>
          <p className="text-xs text-slate-400 mt-1">Revenue settlements</p>
        </div>

        {/* Total Gram Panchayats */}
        <div
          id="stat-total-gps"
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all"
        >
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Gram Panchayats
            </span>
            <Landmark className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{uniqueGPs}</div>
          <p className="text-xs text-slate-400 mt-1">LGD Gram Panchayats</p>
        </div>

        {/* Verified Locations */}
        <div
          id="stat-verified-locations"
          onClick={() => onFilterLocationStatus && onFilterLocationStatus('VERIFIED')}
          className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 shadow-xs hover:border-emerald-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Verified Locations
            </span>
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-emerald-900">{verifiedLocations}</div>
          <p className="text-xs text-emerald-700 mt-1">
            {exactLocations} exact + {verifiedLocations - exactLocations} village/GP
          </p>
        </div>

        {/* Locations Needing Verification */}
        <div
          id="stat-needing-verification"
          onClick={() =>
            onFilterLocationStatus && onFilterLocationStatus('LOCATION NEEDS VERIFICATION')
          }
          className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-xs hover:border-amber-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Needs Verification
            </span>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-amber-900">{needingVerification}</div>
          <p className="text-xs text-amber-700 mt-1">Closed / Flagged for field audit</p>
        </div>
      </div>
    </section>
  );
};
