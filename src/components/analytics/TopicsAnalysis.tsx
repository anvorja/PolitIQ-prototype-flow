// analytics/TopicsAnalysis.tsx

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
import {cn} from "@/lib/utils";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        name: string;
        dataKey: string;
    }>;
    label?: string;
}

interface RelatedTopicTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        name: string;
        payload: {
            topic: string;
            strength: number;
        };
    }>;
    label?: string;
}

const RelatedTopicTooltip: React.FC<RelatedTopicTooltipProps> = ({ active, payload }) => {
    if (!active || !payload?.[0]) return null;

    const data = payload[0].payload;

    return (
        <div className="min-w-[180px] rounded-lg border border-border/50 bg-popover/95 p-3 shadow-md backdrop-blur-sm">
            <p className="mb-2 text-sm font-medium">
                {data.topic}
            </p>
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                    Relación:
                </span>
                <span className={cn(
                    "font-medium text-sm",
                    data.strength >= 70 ? "text-emerald-500 dark:text-emerald-400" :
                        data.strength >= 40 ? "text-amber-500 dark:text-amber-400" :
                            "text-rose-500 dark:text-rose-400"
                )}>
                    {data.strength}%
                </span>
            </div>
            {/* Barra de progreso */}
            <div className="mt-2 h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full",
                        data.strength >= 70 ? "bg-emerald-500" :
                            data.strength >= 40 ? "bg-amber-500" :
                                "bg-rose-500"
                    )}
                    style={{ width: `${data.strength}%` }}
                />
            </div>
        </div>
    );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    // Encuentra los valores de mentions y sentiment
    const mentions = payload.find(p => p.dataKey === 'mentions')?.value;
    const sentiment = payload.find(p => p.dataKey === 'sentiment')?.value;

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
                    <span className="font-medium text-sm text-primary">
                        {mentions?.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                        {translateMetricName('sentiment')}:
                    </span>
                    <span className={cn(
                        "font-medium text-sm",
                        Number(sentiment) >= 70 ? "text-emerald-500 dark:text-emerald-400" :
                            Number(sentiment) >= 50 ? "text-amber-500 dark:text-amber-400" :
                                "text-rose-500 dark:text-rose-400"
                    )}>
                        {formatSentimentValue(sentiment || 0)}
                    </span>
                </div>
            </div>
        </div>
    );
};

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
                        <CardContent>

                            {/* Temas Relacionados */}
                            {/*<Card>*/}
                            {/*    <CardHeader>*/}
                            {/*        <CardTitle className="text-lg"></CardTitle>*/}
                            {/*    </CardHeader>*/}
                            {/*    <CardContent>*/}
                            {/*        <div className="h-[200px]">*/}
                            {/*            <ResponsiveContainer width="100%" height="100%">*/}
                            {/*                <BarChart*/}
                            {/*                    data={selectedTopic.relatedTopics}*/}
                            {/*                    layout="vertical"*/}
                            {/*                    margin={{ top: 5, right: 25, left: 140, bottom: 5 }}*/}
                            {/*                    barSize={24}  // Ajustado el tamaño de las barras*/}
                            {/*                >*/}
                            {/*                    <CartesianGrid*/}
                            {/*                        strokeDasharray="3 3"*/}
                            {/*                        horizontal={true}*/}
                            {/*                        vertical={true}*/}
                            {/*                        className="opacity-20"  // Más sutil*/}
                            {/*                    />*/}
                            {/*                    <XAxis*/}
                            {/*                        type="number"*/}
                            {/*                        domain={[0, 100]}*/}
                            {/*                        tickLine={false}*/}
                            {/*                        axisLine={false}*/}
                            {/*                        tick={{*/}
                            {/*                            fill: 'hsl(var(--muted-foreground))',*/}
                            {/*                            fontSize: 13  // Aumentado*/}
                            {/*                        }}*/}
                            {/*                        tickFormatter={(value) => `${value}%`}*/}
                            {/*                        tickCount={5}  // Controla cuántos ticks mostrar*/}
                            {/*                    />*/}
                            {/*                    <YAxis*/}
                            {/*                        dataKey="topic"*/}
                            {/*                        type="category"*/}
                            {/*                        width={130}  // Aumentado para textos largos*/}
                            {/*                        tickLine={false}*/}
                            {/*                        axisLine={false}*/}
                            {/*                        tick={{*/}
                            {/*                            fill: 'hsl(var(--foreground))',  // Mejor contraste*/}
                            {/*                            fontSize: 14,  // Aumentado*/}
                            {/*                            width: 120,*/}
                            {/*                            letterSpacing: '-0.01em'*/}
                            {/*                        }}*/}
                            {/*                    />*/}
                            {/*                    <Tooltip*/}
                            {/*                        content={<RelatedTopicTooltip />}*/}
                            {/*                        cursor={{*/}
                            {/*                            fill: 'hsl(var(--muted)/0.1)'*/}
                            {/*                        }}*/}
                            {/*                    />*/}
                            {/*                    <Bar*/}
                            {/*                        dataKey="strength"*/}
                            {/*                        radius={[0, 4, 4, 0]}*/}
                            {/*                        fill="hsl(var(--primary))"*/}
                            {/*                        background={{*/}
                            {/*                            fill: 'hsl(var(--muted)/0.1)'*/}
                            {/*                        }}*/}
                            {/*                        animationBegin={0}*/}
                            {/*                        animationDuration={750}*/}
                            {/*                        animationEasing="ease-out"*/}
                            {/*                    />*/}
                            {/*                </BarChart>*/}
                            {/*            </ResponsiveContainer>*/}
                            {/*        </div>*/}
                            {/*    </CardContent>*/}
                            {/*</Card>*/}
                            {/* Temas Relacionados */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg"></CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0"> {/* Removido padding top extra */}
                                    <div className="h-[250px]"> {/* Altura ajustada */}
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={selectedTopic.relatedTopics}
                                                layout="vertical"
                                                margin={{ top: 5, right: 25, left: 140, bottom: 5 }}
                                                barSize={28}  // Barras más prominentes
                                            >
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    horizontal={true}
                                                    vertical={true}
                                                    className="opacity-15"
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
                                                    width={130}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tick={{
                                                        fill: 'hsl(var(--foreground))',
                                                        fontSize: 14,
                                                        width: 120
                                                    }}
                                                    dx={-5}  // Ajuste fino de la posición del texto
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
                                                    fill="hsl(var(--primary))"
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