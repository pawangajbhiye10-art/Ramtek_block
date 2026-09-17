import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  FileText,
  Trash2,
  Download,
  ExternalLink,
  Eye,
  Plus,
  Compass,
} from 'lucide-react';
import { SchoolRecord, VisitPlanItem, UserLocation } from '../types';
import { generateDirectionsUrl } from '../utils/geo';
import * as XLSX from 'xlsx';

interface VisitPlanTrackerProps {
  visitPlan: VisitPlanItem[];
  userLocation: UserLocation | null;
  onToggleVisited: (udiseCode: string) => void;
  onUpdateNotes: (udiseCode: string, notes: string) => void;
  onUpdateDate: (udiseCode: string, date: string) => void;
  onRemoveItem: (udiseCode: string) => void;
  onClearAll: () => void;
  onSelectSchool: (school: SchoolRecord) => void;
  onViewOnMap: (school: SchoolRecord) => void;
  onNavigateToDirectory: () => void;
}

export const VisitPlanTracker: React.FC<VisitPlanTrackerProps> = ({
  visitPlan,
  userLocation,
  onToggleVisited,
  onUpdateNotes,
  onUpdateDate,
  onRemoveItem,
  onClearAll,
  onSelectSchool,
  onViewOnMap,
  onNavigateToDirectory,
}) => {
  const [filterState, setFilterState] = useState<'all' | 'pending' | 'visited'>('all');
  const [editingNotesUdise, setEditingNotesUdise] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const total = visitPlan.length;
  const visitedCount = visitPlan.filter((v) => v.visited).length;
  const pendingCount = total - visitedCount;
  const percentage = total > 0 ? Math.round((visitedCount / total) * 100) : 0;

  const filteredItems = visitPlan.filter((item) => {
    if (filterState === 'pending') return !item.visited;
    if (filterState === 'visited') return item.visited;
    return true;
  });

  const handleStartEditNotes = (item: VisitPlanItem) => {
    setEditingNotesUdise(item.school.udiseCode);
    setTempNotes(item.notes || '');
  };

  const handleSaveNotes = (udiseCode: string) => {
    onUpdateNotes(udiseCode, tempNotes);
    setEditingNotesUdise(null);
  };

  const handleExportPlan = () => {
    const exportData = visitPlan.map((item, idx) => ({
      '#': idx + 1,
      'School Name': item.school.schoolName,
      'UDISE Code': item.school.udiseCode,
      'Village': item.school.village,
      'Gram Panchayat': item.school.lgdPanchayat,
      'PIN Code': item.school.pinCode,
      'Category': item.school.schoolCategory,
      'Management': item.school.schoolManagement,
      'Status': item.visited ? 'Visited' : 'Pending',
      'Scheduled Date': item.plannedDate || 'Not set',
      'Visited At': item.visitedAt ? new Date(item.visitedAt).toLocaleString() : '-',
      'Field Notes': item.notes || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ramtek_Visit_Plan');
    XLSX.writeFile(workbook, `Ramtek_Field_Visits_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div id="visit-plan-tracker-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>Field Visit Execution Plan</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track completion status, schedule dates, and record meeting notes with school leadership
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {total > 0 && (
            <>
              <button
                onClick={handleExportPlan}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EXPORT REPORT</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all schools from your visit plan?')) {
                    onClearAll();
                  }
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 rounded-xl text-xs font-semibold transition-colors"
              >
                CLEAR ALL
              </button>
            </>
          )}
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Planned
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{total}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Assigned visits</p>
        </div>

        <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-900 mt-1">{visitedCount}</div>
          <p className="text-[11px] text-emerald-700 mt-0.5">Visits completed</p>
        </div>

        <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 shadow-xs">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center justify-between">
            <span>Pending</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-900 mt-1">{pendingCount}</div>
          <p className="text-[11px] text-amber-700 mt-0.5">Awaiting visit</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Completion
            </span>
            <span className="text-xs font-bold text-blue-600">{percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-2">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Overall execution progress</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterState('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterState === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Visits ({total})
          </button>
          <button
            onClick={() => setFilterState('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterState === 'pending'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilterState('visited')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterState === 'visited'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Completed ({visitedCount})
          </button>
        </div>
      </div>

      {/* List of Visits */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No visits match this filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {total === 0
              ? 'Your visit plan is currently empty. Explore the All Schools directory to add schools.'
              : 'You have no visits in this category.'}
          </p>
          {total === 0 && (
            <button
              onClick={onNavigateToDirectory}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Browse All 214 Schools
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const { school } = item;
            const isEditingNotes = editingNotesUdise === school.udiseCode;

            return (
              <div
                key={school.udiseCode}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all space-y-4 ${
                  item.visited ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => onToggleVisited(school.udiseCode)}
                      className={`mt-0.5 p-2 rounded-xl transition-colors cursor-pointer ${
                        item.visited
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400 hover:bg-emerald-100 hover:text-emerald-700'
                      }`}
                      title={item.visited ? 'Mark as Pending' : 'Mark as Visited'}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3
                          onClick={() => onSelectSchool(school)}
                          className="font-bold text-base text-slate-900 hover:text-blue-600 cursor-pointer"
                        >
                          {school.schoolName}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.visited
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.visited ? 'VISITED' : 'PENDING'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {school.village}, GP: {school.lgdPanchayat} (PIN {school.pinCode}) | UDISE: {school.udiseCode}
                      </p>
                    </div>
                  </div>

                  {/* Actions on card */}
                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => onViewOnMap(school)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      title="View on Map"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={generateDirectionsUrl(school, userLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors"
                      title="Get Directions"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onRemoveItem(school.udiseCode)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                      title="Remove from Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scheduling & Notes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">
                      Scheduled Date:
                    </label>
                    <input
                      type="date"
                      value={item.plannedDate || ''}
                      onChange={(e) => onUpdateDate(school.udiseCode, e.target.value)}
                      className="w-full p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-500 font-medium">Field Visit Notes:</label>
                      {isEditingNotes ? (
                        <button
                          onClick={() => handleSaveNotes(school.udiseCode)}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartEditNotes(item)}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          {item.notes ? 'Edit Notes' : '+ Add Notes'}
                        </button>
                      )}
                    </div>

                    {isEditingNotes ? (
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Principal meeting outcome, student strength discussed, follow-up date..."
                        rows={2}
                        className="w-full p-2 rounded-lg border border-blue-300 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <div
                        onClick={() => handleStartEditNotes(item)}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 min-h-[36px] cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        {item.notes || (
                          <span className="text-slate-400 italic">
                            Click to add visit summary, principal contact, or follow-up notes...
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
