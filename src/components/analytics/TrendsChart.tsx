// src/components/analytics/TrendsChart.tsx

"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    ComposedChart, TooltipProps
} from 'recharts';
import { trendData, topicTrends } from '@/data/TrendsMockData';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { formatShortDate } from "@/lib/dateUtils";
import { translateMetricName, formatSentimentValue } from "@/lib/translateUtils";
import { cn } from "@/lib/utils";

type CustomTooltipProps = TooltipProps<number, string> & {
    active?: boolean;
    payload?: Array<{
        value: number;
        name: string;
        dataKey: string;
    }>;
    label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
        <div className="min-w-[180px] rounded-lg border border-border/50 bg-popover/95 p-3 shadow-md backdrop-blur-sm">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
                {formatShortDate(label || '')}
            </p>
            <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                        {translateMetricName('mentions')}:
                    </span>
                    <span className="font-medium text-sm">
                        {payload[0]?.value?.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                        {translateMetricName('sentiment')}:
                    </span>
                    <span className={cn(
                        "font-medium text-sm",
                        Number(payload[1]?.value) >= 70 ? "text-emerald-500 dark:text-emerald-400" :
                            Number(payload[1]?.value) >= 50 ? "text-amber-500 dark:text-amber-400" :
                                "text-rose-500 dark:text-rose-400"
                    )}>
                        {formatSentimentValue(payload[1]?.value)}
                    </span>
                </div>
            </div>
        </div>
    );
};


export function TrendsChart() {
    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Tendencias de {translateMetricName('mentions')} y {translateMetricName('sentiment')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatShortDate}
                                fontSize={12}
                            />
                            <YAxis
                                yAxisId="left"
                                label={{
                                    value: translateMetricName('mentions'),
                                    angle: -90,
                                    position: 'insideLeft'
                                }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 100]}
                                label={{
                                    value: `${translateMetricName('sentiment')} %`,
                                    angle: 90,
                                    position: 'insideRight'
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                formatter={(value) => translateMetricName(value)}
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="mentions"
                                name="mentions"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.1}
                                stroke="hsl(var(--primary))"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="sentiment"
                                name="sentiment"
                                stroke="hsl(var(--destructive))"
                                strokeWidth={2}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                {/* Temas en tendencia */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {topicTrends.map((topic) => (
                        <div
                            key={topic.topic}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted/5"
                        >
                            <div>
                                <h3 className="font-medium">{topic.topic}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {topic.count.toLocaleString()} {translateMetricName('mentions').toLowerCase()}
                                </p>
                            </div>
                            <div className={`flex items-center ${
                                topic.trend === 'up' ? 'text-green-500' :
                                    topic.trend === 'down' ? 'text-red-500' :
                                        'text-yellow-500'
                            }`}>
                                {topic.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> :
                                    topic.trend === 'down' ? <TrendingDown className="w-4 h-4 mr-1" /> :
                                        <Minus className="w-4 h-4 mr-1" />}
                                {Math.abs(topic.changePercent)}%
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}