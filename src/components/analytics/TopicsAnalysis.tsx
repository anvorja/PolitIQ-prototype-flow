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

export function TopicsAnalysis() {
    const [selectedTopic, setSelectedTopic] = useState(topicsAnalysisData[0]);

    return (
        <Card className="col-span-full">
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
                            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                                selectedTopic.topic === topic.topic
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted hover:bg-muted/80'
                            }`}
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
                                    <p className="text-sm text-muted-foreground">Menciones</p>
                                    <p className="text-2xl font-bold">{selectedTopic.mentions.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Sentimiento</p>
                                    <p className="text-2xl font-bold">{selectedTopic.sentiment}%</p>
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
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={selectedTopic.relatedTopics}
                                        layout="vertical"
                                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" domain={[0, 100]} />
                                        <YAxis dataKey="topic" type="category" width={100} />
                                        <Tooltip
                                            formatter={(value: number) => [`${value}%`, 'Relación']}
                                        />
                                        <Bar
                                            dataKey="strength"
                                            fill="hsl(var(--primary))"
                                            radius={[0, 4, 4, 0]}
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
                                        <Tooltip
                                            labelFormatter={formatShortDate}
                                            formatter={(value: number, name: string) => [
                                                name === 'sentiment' ? `${value}%` : value,
                                                name === 'sentiment' ? 'Sentimiento' : 'Menciones'
                                            ]}
                                        />
                                        <Legend />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="mentions"
                                            stroke="hsl(var(--primary))"
                                            name="Menciones"
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="sentiment"
                                            stroke="hsl(var(--destructive))"
                                            name="Sentimiento"
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