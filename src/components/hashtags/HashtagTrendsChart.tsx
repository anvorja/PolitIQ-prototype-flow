// // src/components/hashtags/HashtagTrendsChart.tsx
// "use client"
//
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useState } from 'react';
// import { hashtagTrends } from "@/data/HashtagsMockData";
//
// type TimeRange = 'hourly' | 'weekly' | 'monthly';
// type MetricType = 'mentions' | 'engagement' | 'sentiment';
//
// const timeRangeOptions = [
//     { value: 'hourly', label: 'Por Hora' },
//     { value: 'weekly', label: 'Semanal' },
//     { value: 'monthly', label: 'Mensual' }
// ];
//
// const metricOptions = [
//     { value: 'mentions', label: 'Menciones' },
//     { value: 'engagement', label: 'Engagement' },
//     { value: 'sentiment', label: 'Sentimiento' }
// ];
//
// export function HashtagTrendsChart() {
//     const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
//     const [metric, setMetric] = useState<MetricType>('mentions');
//
//     // Preparar datos para el gráfico
//     const chartData = hashtagTrends[timeRange].labels.map((label, index) => ({
//         name: label,
//         value: hashtagTrends[timeRange].datasets[metric][index]
//     }));
//
//     const getYAxisLabel = () => {
//         switch(metric) {
//             case 'mentions':
//                 return 'Menciones';
//             case 'engagement':
//                 return 'Engagement (%)';
//             case 'sentiment':
//                 return 'Sentimiento (%)';
//         }
//     };
//
//     return (
//         <div className="space-y-4">
//             <div className="flex justify-end gap-2">
//                 <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
//                     <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Rango de tiempo" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         {timeRangeOptions.map(option => (
//                             <SelectItem key={option.value} value={option.value}>
//                                 {option.label}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>
//                 <Select value={metric} onValueChange={(value) => setMetric(value as MetricType)}>
//                     <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Métrica" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         {metricOptions.map(option => (
//                             <SelectItem key={option.value} value={option.value}>
//                                 {option.label}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>
//             </div>
//
//             <div className="h-[400px] w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={chartData} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                             dataKey="name"
//                             tick={{ fontSize: 12 }}
//                         />
//                         <YAxis
//                             label={{
//                                 value: getYAxisLabel(),
//                                 angle: -90,
//                                 position: 'insideLeft',
//                                 style: { textAnchor: 'middle' }
//                             }}
//                             tick={{ fontSize: 12 }}
//                         />
//                         <Tooltip />
//                         <Line
//                             type="monotone"
//                             dataKey="value"
//                             stroke="#8884d8"
//                             strokeWidth={2}
//                             dot={{ r: 2 }}
//                             activeDot={{ r: 4 }}
//                         />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }

// src/components/hashtags/HashtagTrendsChart.tsx
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';
import { hashtagTrends } from '@/data/HashtagsMockData';
import type { HashtagCategory } from '@/types/hashtags';

type TimeRange = 'hourly' | 'weekly' | 'monthly';
type MetricType = 'mentions' | 'engagement' | 'sentiment';

interface HashtagTrendsChartProps {
    selectedCategory?: HashtagCategory;
}

export function HashtagTrendsChart({ selectedCategory }: HashtagTrendsChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
    const [metric, setMetric] = useState<MetricType>('mentions');

    // Obtener los datos según la categoría seleccionada
    const chartData = useMemo(() => {
        if (selectedCategory) {
            return hashtagTrends.byCategory[selectedCategory.id]?.[timeRange].map((point, index) => ({
                name: hashtagTrends[timeRange].labels[index],
                value: point[metric]
            })) || [];
        }
        return hashtagTrends[timeRange].labels.map((label, index) => ({
            name: label,
            value: hashtagTrends[timeRange].datasets[metric][index]
        }));
    }, [selectedCategory, timeRange, metric]);

    const formatValue = (value: number) => {
        if (metric === 'mentions') {
            return value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` :
                value >= 1000 ? `${(value / 1000).toFixed(1)}K` :
                    value.toString();
        }
        return `${value}%`;
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end gap-2">
                <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rango de tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="monthly">Mensual</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="hourly">Por Hora</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={metric} onValueChange={(value) => setMetric(value as MetricType)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mentions">Menciones</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="sentiment">Sentimiento</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={formatValue}
                            width={60}
                        />
                        <Tooltip
                            formatter={(value: number) => [formatValue(value),
                                metric === 'mentions' ? 'Menciones' :
                                    metric === 'engagement' ? 'Engagement' : 'Sentimiento'
                            ]}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}