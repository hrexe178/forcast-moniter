'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { DateTime } from 'luxon';

interface ChartData {
    targetTime: string;
    actual: number;
    forecast: number;
}

interface ForecastChartProps {
    data: ChartData[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
    const formatXAxis = (tickItem: string) => {
        return DateTime.fromISO(tickItem).toFormat('dd MMM HH:mm');
    };

    return (
        <div className="w-full h-[300px] md:h-[500px] bg-white p-2 md:p-6 rounded-xl shadow-sm border border-slate-100">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="targetTime"
                        tickFormatter={formatXAxis}
                        angle={-45}
                        textAnchor="end"
                        interval="preserveStartEnd"
                        stroke="#64748b"
                        fontSize={12}
                    />
                    <YAxis
                        label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft', offset: 0, fill: '#64748b' }}
                        stroke="#64748b"
                        fontSize={12}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelFormatter={(label) => DateTime.fromISO(label).toFormat('dd MMM yyyy HH:mm')}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                        type="monotone"
                        dataKey="actual"
                        name="Actual Generation"
                        stroke="#3b82f6" // Blue
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="forecast"
                        name="Forecast Generation"
                        stroke="#10b981" // Green
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ForecastChart;
