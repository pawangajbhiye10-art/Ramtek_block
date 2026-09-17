import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  GraduationCap,
  Layers,
  ChevronRight,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { SchoolRecord } from '../types';

interface BlocksViewProps {
  schools: SchoolRecord[];
  onSelectCluster: (cluster: string) => void;
  onViewBlockSchools: (block: string) => void;
}

export const BlocksView: React.FC<BlocksViewProps> = ({
  schools,
  onSelectCluster,
  onViewBlockSchools,
}) => {
  // Group schools by block
  const blockMap = new Map<string, SchoolRecord[]>();
  schools.forEach((s) => {
    const b = s.block || 'RAMTEK';
    if (!blockMap.has(b)) blockMap.set(b, []);
    blockMap.get(b)!.push(s);
  });

  const blocks = Array.from(blockMap.entries());

  // Also group clusters in Ramtek
  const clusterMap = new Map<string, SchoolRecord[]>();
  schools.forEach((s) => {
    const c = (s.cluster || 'UNASSIGNED').trim();
    if (!clusterMap.has(c)) clusterMap.set(c, []);
    clusterMap.get(c)!.push(s);
  });

  const clusters = Array.from(clusterMap.entries()).sort(
    (a, b) => b[1].length - a[1].length
  );

  return (
    <div id="blocks-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Blocks in Nagpur District
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Master administrative blocks and cluster breakdown for school marketing coverage
        </p>
      </div>

      {/* Main Blocks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map(([blockName, blockSchools]) => {
          const villageCount = new Set(blockSchools.map((s) => s.village).filter(Boolean)).size;
          const gpCount = new Set(blockSchools.map((s) => s.lgdPanchayat).filter(Boolean)).size;
          const operationalCount = blockSchools.filter((s) =>
            s.schoolStatus.toLowerCase().includes('operat')
          ).length;

          return (
            <div
              key={blockName}
              id={`block-card-${blockName.toLowerCase()}`}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden"
            >
              <div className="bg-slate-900 text-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Nagpur District
                  </span>
                  <span className="flex items-center text-xs font-medium text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    Official Dataset Active
                  </span>
                </div>
                <h3 className="text-2xl font-bold mt-2 text-white">{blockName}</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  State: MAHARASHTRA | District: NAGPUR
                </p>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-xl font-bold text-slate-900">
                      {blockSchools.length}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 uppercase">
                      Schools
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">{villageCount}</div>
                    <div className="text-[11px] font-medium text-slate-500 uppercase">
                      Villages
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">{gpCount}</div>
                    <div className="text-[11px] font-medium text-slate-500 uppercase">
                      Gram Panch.
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operational Status:</span>
                    <span className="font-semibold text-emerald-700">
                      {operationalCount} Active / {blockSchools.length - operationalCount} Closed
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference Coordinate:</span>
                    <span className="font-mono text-slate-700">21.3980° N, 79.3308° E</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Radius Boundary:</span>
                    <span className="font-medium text-slate-700">200 KM Coverage</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onViewBlockSchools(blockName)}
                    className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>VIEW SCHOOLS</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Clusters in Ramtek */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Educational Clusters in Ramtek Taluka
            </h3>
            <p className="text-xs text-slate-500">
              Filter schools by administrative education clusters for targeted field visits
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {clusters.length} Clusters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {clusters.map(([clusterName, clusterSchools]) => {
            const label = clusterName || 'Unassigned Cluster';
            return (
              <button
                key={label}
                onClick={() => onSelectCluster(clusterName)}
                className="text-left p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 line-clamp-1">
                    {label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {clusterSchools.length} {clusterSchools.length === 1 ? 'School' : 'Schools'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
