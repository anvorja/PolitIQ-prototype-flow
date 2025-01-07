// src/components/hashtags/HashtagCategories.tsx
"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {HashtagCategory} from "@/types/hashtags";

// Interfaces para el tooltip
interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        value: number;
        dataKey: string;
        payload: {
            date: string;
            mentions: number;
        };
    }[];
    label?: string;
}

const getTrendIcon = (trend: 'up' | 'down' | 'stable', className: string = "w-4 h-4") => {
    switch (trend) {
        case 'up':
            return <TrendingUp className={`${className} text-green-500`} />;
        case 'down':
            return <TrendingDown className={`${className} text-destructive`} />;
        case 'stable':
            return <Minus className={`${className} text-yellow-500`} />;
    }
};

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${date.toLocaleString('es', { month: 'short' })}`;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border rounded-lg shadow-lg p-3">
                <p className="text-sm font-medium">{formatDate(label || '')}</p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-primary">
                        {formatNumber(payload[0].value)}
                    </span> menciones
                </p>
            </div>
        );
    }
    return null;
};

export function HashtagCategories({ categories }: { categories: HashtagCategory[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categories.map((category) => (
                <Card key={category.id} className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <h3 className="font-semibold text-base">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-muted-foreground">menciones totales</p>
                            <p className="text-xl font-bold">{formatNumber(category.totalMentions)}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {category.tags.map((tag) => (
                                <div key={tag.id} className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-semibold">#{tag.tag}</span>
                                            <span className="flex items-center gap-1">
                                                {getTrendIcon(tag.trend)}
                                                <span className={`text-sm ${
                                                    tag.changePercent > 0 ? 'text-green-500' :
                                                        tag.changePercent < 0 ? 'text-destructive' :
                                                            'text-yellow-500'
                                                }`}>
                                                    {tag.changePercent > 0 ? '+' : ''}
                                                    {tag.changePercent}%
                                                </span>
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span>{formatNumber(tag.mentions)} menciones</span>
                                            <span>{formatNumber(tag.reach)} alcance</span>
                                            <span>{tag.engagement}% engagement</span>
                                            <span>{tag.sentiment}% sentimiento</span>
                                        </div>
                                    </div>

                                    {/* Gráfica de línea */}
                                    <div className="mt-4 h-[200px] w-full bg-muted/10 rounded-lg p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={tag.timeline}>
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    vertical={false}
                                                    stroke="#888888"
                                                    opacity={0.2}
                                                />
                                                <XAxis
                                                    dataKey="date"
                                                    tickFormatter={formatDate}
                                                    tick={{ fontSize: 12 }}
                                                    stroke="#888888"
                                                    padding={{ left: 10, right: 10 }}
                                                />
                                                <YAxis
                                                    width={50}
                                                    tick={{ fontSize: 12 }}
                                                    stroke="#888888"
                                                    tickFormatter={formatNumber}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="mentions"
                                                    stroke="#8884d8"
                                                    strokeWidth={2}
                                                    dot={{ r: 3, fill: '#8884d8' }}
                                                    activeDot={{ r: 6 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Tags relacionados */}
                                    <div className="flex flex-wrap gap-2">
                                        {tag.relatedTags.map((relatedTag) => (
                                            <span
                                                key={relatedTag}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted"
                                            >
                                                #{relatedTag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Top influencers */}
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Top Influencers:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {tag.topInfluencers.map((influencer) => (
                                                <span
                                                    key={influencer}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                                >
                                                    {influencer}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}