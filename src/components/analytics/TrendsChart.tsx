// analytics/TrendsChart.tsx

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
    ComposedChart
} from 'recharts';
import { trendData, topicTrends } from '@/data/TrendsMockData';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import {formatShortDate} from "@/lib/dateUtils";

export function TrendsChart() {
    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Tendencias de Menciones y Sentimiento</CardTitle>
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
                                    value: 'Menciones',
                                    angle: -90,
                                    position: 'insideLeft'
                                }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 100]}
                                label={{
                                    value: 'Sentimiento %',
                                    angle: 90,
                                    position: 'insideRight'
                                }}
                            />
                            <Tooltip
                                formatter={(value: number, name: string) => {
                                    if (name === "sentiment") return `${value}%`;
                                    return value.toLocaleString();
                                }}
                                labelFormatter={formatShortDate}
                            />
                            <Legend />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="mentions"
                                name="Menciones"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.1}
                                stroke="hsl(var(--primary))"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="sentiment"
                                name="Sentimiento"
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
                                    {topic.count.toLocaleString()} menciones
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