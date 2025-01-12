// src/components/analytics/TopicsAnalysis.tsx
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { topicsAnalysisData } from '@/data/TopicsAnalysisMockData';
import { formatShortDate } from '@/lib/dateUtils';
import { translateMetricName, formatSentimentValue } from "@/lib/translateUtils";
import {CustomTooltip, RelatedTopicTooltip} from "@/components/analytics/Tooltips";
import {cn} from "@/lib/utils";

export function TopicsAnalysis() {
    const [selectedTopic, setSelectedTopic] = useState(topicsAnalysisData[0]);

    return (
        // otra propuesta
        <Card className={cn(
            "col-span-full",
            "dark:bg-gradient-to-br dark:from-card/90 dark:to-card/100"
        )}>
            {/*<Card className="col-span-full">*/}
            <CardHeader>
                <CardTitle>Análisis de Temas</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Selector de Temas */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {topicsAnalysisData.map((topic) => (
                        <button
                            key={topic.topic}
                            onClick={() => setSelectedTopic(topic)}
                            // className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                            //     selectedTopic.topic === topic.topic
                            //         ? 'bg-primary text-primary-foreground'
                            //         : 'bg-muted hover:bg-muted/80'
                            // }`}
                            // azul
                            className={cn(
                                "px-4 py-2 rounded-lg transition-colors whitespace-nowrap",
                                selectedTopic.topic === topic.topic
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                            )}
                        >
                            {topic.topic}
                        </button>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Métricas Principales */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Métricas Clave</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {translateMetricName('mentions')}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {selectedTopic.mentions.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {translateMetricName('sentiment')}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {formatSentimentValue(selectedTopic.sentiment)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Engagement</p>
                                    <p className="text-2xl font-bold">{selectedTopic.engagement}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Temas Relacionados */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Temas Relacionados</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={selectedTopic.relatedTopics}
                                        layout="vertical"
                                        margin={{ top: 5, right: 50, left: 100, bottom: 5 }}
                                        barSize={28}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            horizontal={true}
                                            vertical={true}
                                            className="opacity-20"
                                        />
                                        <XAxis
                                            type="number"
                                            domain={[0, 100]}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{
                                                fill: 'hsl(var(--muted-foreground))',
                                                fontSize: 13
                                            }}
                                            tickFormatter={(value) => `${value}%`}
                                            tickCount={5}
                                        />
                                        <YAxis
                                            dataKey="topic"
                                            type="category"
                                            width={80}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{
                                                fill: 'hsl(var(--foreground))',
                                                fontSize: 16,
                                                width: 100
                                            }}
                                            dx={-5}
                                        />
                                        <Tooltip
                                            content={<RelatedTopicTooltip />}
                                            cursor={{
                                                fill: 'hsl(var(--muted)/0.1)'
                                            }}
                                        />
                                        <Bar
                                            dataKey="strength"
                                            radius={[0, 4, 4, 0]}
                                            fill="hsl(var(--primary)/0.9)"  // Color más suave para modo light
                                            background={{
                                                fill: 'hsl(var(--muted)/0.1)'
                                            }}
                                            animationBegin={0}
                                            animationDuration={750}
                                            animationEasing="ease-out"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tendencia Temporal */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Tendencia Semanal</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Este gráfico muestra dos métricas clave a lo largo del tiempo:
                            </p>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-sm">
                                        {translateMetricName('mentions')} (línea azul): Cantidad de veces que se menciona el tema por día
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                                    <span className="text-sm">
                                        {translateMetricName('sentiment')} (línea roja): Porcentaje de aprobación del tema (0-100%)
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={selectedTopic.weeklyTrend}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatShortDate}
                                        />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend
                                            formatter={(value) => translateMetricName(value)}
                                        />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="mentions"
                                            stroke="hsl(var(--primary))"
                                            name="mentions"
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="sentiment"
                                            stroke="hsl(var(--destructive))"
                                            name="sentiment"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Influenciadores Principales */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Principales Influenciadores</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* ... */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedTopic.topInfluencers.map((influencer) => (
                                    <div
                                        key={influencer}
                                        className="p-4 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors"
                                    >
                                        <p className="font-medium">{influencer}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}