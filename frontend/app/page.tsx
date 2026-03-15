'use client';

import { useState, useEffect, useCallback } from 'react';
import { DateTime } from 'luxon';
import ForecastChart from '../components/ForecastChart';
import Controls from '../components/Controls';
import { fetchMergedData, MergedData } from '../lib/api';
import { Wind, Activity, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<MergedData[]>([]);
  const [horizon, setHorizon] = useState(4);
  const [startTime, setStartTime] = useState('2024-01-01T00:00');
  const [endTime, setEndTime] = useState('2024-01-07T00:00');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const merged = await fetchMergedData(
        horizon,
        DateTime.fromISO(startTime).toUTC().toISO()!,
        DateTime.fromISO(endTime).toUTC().toISO()!
      );
      setData(merged);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data from the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [horizon, startTime, endTime]);

  useEffect(() => {
    loadData();
  }, []); // Initial load

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 md:gap-3">
              <Wind className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />
              Wind Forecast Monitor
            </h1>
            <p className="text-slate-500 mt-1">Real-time analysis of UK wind generation vs forecasted output.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 flex items-center gap-4 text-sm font-medium text-slate-600 shadow-sm">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" /> Live Data
            </span>
            <span className="w-px h-4 bg-slate-200"></span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" /> Jan 2024
            </span>
          </div>
        </div>

        {/* Filters */}
        <Controls
          horizon={horizon}
          setHorizon={setHorizon}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onFetch={loadData}
          loading={loading}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-start gap-4 mb-8">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 md:p-8 border border-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Generation vs Forecast</h2>
            {data.length > 0 && (
              <div className="text-sm text-slate-400 font-medium">
                {data.length} Data Points
              </div>
            )}
          </div>

          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-xl">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-semibold text-slate-600">Syncing with BMRS...</p>
                </div>
              </div>
            )}

            {!loading && data.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-32 text-slate-400 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200">
                <Wind className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">No data found for the selected range.</p>
                <p className="text-sm">Try adjusting your filters or checking the horizon value.</p>
              </div>
            )}

            <ForecastChart data={data} />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Metric Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Avg Actual</span>
                <span className="text-lg font-bold text-blue-600">
                  {data.length > 0 ? (data.reduce((acc, d) => acc + d.actual, 0) / data.length).toFixed(1) : '0'} MW
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Avg Forecast</span>
                <span className="text-lg font-bold text-green-600">
                  {data.length > 0 ? (data.reduce((acc, d) => acc + d.forecast, 0) / data.length).toFixed(1) : '0'} MW
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm md:col-span-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Note on Forecast Horizon</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              For example, if the horizon is set to 4h, the dashboard will display the latest forecast that was published
              at least 4 hours before the target extraction window.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
