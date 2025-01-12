// src/components/analytics/TrendsChart.tsx

"use client"

import React from 'react';
import { useTheme } from "next-themes"
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
    ComposedChart,
} from 'recharts';
import { trendData, topicTrends } from '@/data/TrendsMockData';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { formatShortDate } from "@/lib/dateUtils";
import { translateMetricName } from "@/lib/translateUtils";
import {TrendsChartTooltip} from "@/components/analytics/Tooltips";
import {cn} from "@/lib/utils";

export function TrendsChart() {

    const { theme } = useTheme();
    // Función para personalizar el color del texto en la leyenda
    const renderColorfulLegendText = (value: string) => {
        const translatedValue = translateMetricName(value);
        return (
            <span className={cn(
                value === 'sentiment' ? 'text-red-500' : 'text-primary'
            )}>
                {translatedValue}
            </span>
        );
    };

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
                            <Tooltip content={<TrendsChartTooltip />} />
                            <Legend
                                formatter={renderColorfulLegendText}
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="mentions"
                                name="mentions"
                                fill="hsl(var(--primary))"
                                // fillOpacity={0.13}
                                fillOpacity={theme === 'dark' ? 0.1 : 0.08} // Ajustar opacidad según tema
                                stroke="hsl(var(--primary))"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="sentiment"
                                name="sentiment"
                                stroke="rgb(244, 63, 94)"
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