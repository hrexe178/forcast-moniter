'use client';

import React from 'react';

interface ControlsProps {
    horizon: number;
    setHorizon: (val: number) => void;
    startTime: string;
    setStartTime: (val: string) => void;
    endTime: string;
    setEndTime: (val: string) => void;
    onFetch: () => void;
    loading: boolean;
}

const Controls: React.FC<ControlsProps> = ({
    horizon,
    setHorizon,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    onFetch,
    loading
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8 items-end">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Start Time</label>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">End Time</label>
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Forecast Horizon: {horizon}h</label>
                <input
                    type="range"
                    min="0"
                    max="48"
                    value={horizon}
                    onChange={(e) => setHorizon(parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                    <span>0h</span>
                    <span>48h</span>
                </div>
            </div>
            <div>
                <button
                    onClick={onFetch}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed h-[42px]"
                >
                    {loading ? 'Fetching...' : 'Update Data'}
                </button>
            </div>
        </div>
    );
};

export default Controls;
