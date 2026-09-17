import React, { useState, useRef } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SchoolRecord } from '../types';
import { parseSchoolsCSV, loadMasterSchoolsFromCSV } from '../data/schoolsData';
import * as XLSX from 'xlsx';

interface FileUploadProps {
  currentSchoolsCount: number;
  onUpdateSchools: (schools: SchoolRecord[], mode: 'replace' | 'merge') => void;
  onRestoreDefault: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  currentSchoolsCount,
  onUpdateSchools,
  onRestoreDefault,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsedPreview, setParsedPreview] = useState<SchoolRecord[] | null>(null);
  const [parsingErrors, setParsingErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = (file: File) => {
    setFileName(file.name);
    setParsingErrors([]);
    setParsedPreview(null);

    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const csvText = XLSX.utils.sheet_to_csv(worksheet);
          handleCsvText(csvText);
        } catch (err: any) {
          setParsingErrors(['Failed to parse Excel file: ' + err.message]);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        handleCsvText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCsvText = (csvString: string) => {
    const schools = parseSchoolsCSV(csvString);
    if (schools.length === 0) {
      setParsingErrors([
        'No valid school records could be parsed. Ensure the file contains columns like "School Name", "UDISE Code", "Block", "Village".',
      ]);
      return;
    }
    setParsedPreview(schools);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleApply = (mode: 'replace' | 'merge') => {
    if (!parsedPreview || parsedPreview.length === 0) return;
    onUpdateSchools(parsedPreview, mode);
    alert(
      mode === 'replace'
        ? `Successfully replaced master dataset with ${parsedPreview.length} schools!`
        : `Successfully merged dataset. Now loaded: ${currentSchoolsCount + parsedPreview.length} schools!`
    );
    setParsedPreview(null);
    setFileName(null);
  };

  const handleDownloadSample = () => {
    const sample = `Sr No.,School Name,UDISE Code,State,District,Block,Cluster,Village,PIN Code,Address,School Management,School Category,School Type,Classes From-To,Rural/Urban,School Status,LGD Village,LGD Panchayat / Gram Panchayat
1,Z.P. PRIMARY SCHOOL SAMPLE,27091100101,MAHARASHTRA,NAGPUR,RAMTEK,MANSAR,MANSAR,441106,AT POST MANSAR,Local Body,Primary only,Co-educational,1-5,Rural,Operational,MANSAR,MANSAR`;

    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sample_School_Dataset.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="file-upload-view" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dataset Management & Upload
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Import new or updated school rosters via CSV or Excel (.xlsx). The uploaded dataset is validated against geographic registries for location accuracy.
        </p>
      </div>

      {/* Upload Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-300 hover:border-blue-400 bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv, .xlsx, .xls"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              processFile(e.target.files[0]);
            }
          }}
        />

        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
          <Upload className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          Drop your school CSV or Excel file here
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Supports .CSV, .XLSX, and .XLS. Required columns: School Name, UDISE Code, Village, Block, PIN Code.
        </p>

        <div className="mt-4 flex items-center justify-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
            Browse File
          </span>
        </div>
      </div>

      {/* Action Bar with Restore & Sample */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-700">Current Master Dataset:</span>
          <span className="font-bold text-blue-600">{currentSchoolsCount} Schools Active</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadSample}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Template</span>
          </button>
          <button
            onClick={() => {
              if (confirm('Restore the default official RAMTEK.csv dataset?')) {
                onRestoreDefault();
                alert('Official RAMTEK.csv restored!');
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold flex items-center space-x-1 border border-amber-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Official RAMTEK.csv</span>
          </button>
        </div>
      </div>

      {/* Errors display */}
      {parsingErrors.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs space-y-1">
          <div className="font-bold flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Parsing Issue Detected:</span>
          </div>
          {parsingErrors.map((err, i) => (
            <p key={i} className="pl-5">
              • {err}
            </p>
          ))}
        </div>
      )}

      {/* Preview Section */}
      {parsedPreview && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                File Parsed Successfully
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Preview: {fileName} ({parsedPreview.length} Schools Detected)
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleApply('merge')}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs"
              >
                Merge with Existing
              </button>
              <button
                onClick={() => handleApply('replace')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
              >
                Replace Master Data
              </button>
            </div>
          </div>

          {/* Quick Preview Table */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-72">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-[11px] uppercase tracking-wider text-slate-600 sticky top-0">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">School Name</th>
                  <th className="p-2">UDISE</th>
                  <th className="p-2">Village</th>
                  <th className="p-2">GP</th>
                  <th className="p-2">Location Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parsedPreview.slice(0, 10).map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 font-mono text-slate-400">{s.srNo || idx + 1}</td>
                    <td className="p-2 font-semibold text-slate-900">{s.schoolName}</td>
                    <td className="p-2 font-mono">{s.udiseCode}</td>
                    <td className="p-2">{s.village}</td>
                    <td className="p-2">{s.lgdPanchayat}</td>
                    <td className="p-2 text-[10px] font-semibold text-blue-700">
                      {s.locationStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {parsedPreview.length > 10 && (
            <p className="text-xs text-slate-400 text-center">
              Showing first 10 of {parsedPreview.length} schools in preview.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
