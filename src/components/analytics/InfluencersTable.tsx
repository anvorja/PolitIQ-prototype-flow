"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, BadgeCheck, Users, MessageCircle, BarChart } from 'lucide-react';
import { influencersData } from '@/data/InfluencersMockData';
import type { InfluencerSort, InfluencerType } from '@/types/analytics';

// Función para formatear números grandes
function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Función para obtener el color de tipo
const getTypeColor = (type: InfluencerType): string => {
    const colors = {
        politician: 'text-blue-500',
        analyst: 'text-purple-500',
        media: 'text-orange-500',
        academic: 'text-green-500',
        anonymous: 'text-gray-500'
    };
    return colors[type];
};

// Función para obtener el texto del tipo en español
const getTypeText = (type: InfluencerType): string => {
    const texts = {
        politician: 'Político',
        analyst: 'Analista',
        media: 'Medio',
        academic: 'Académico',
        anonymous: 'Anónimo'
    };
    return texts[type];
};

export function InfluencersTable() {
    const [sortBy, setSortBy] = useState<InfluencerSort>('mentions');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filter, setFilter] = useState<InfluencerType | 'all'>('all');

    // Filtrar y ordenar influenciadores
    const filteredAndSortedInfluencers = [...influencersData]
        .filter(inf => filter === 'all' || inf.type === filter)
        .sort((a, b) => {
            const factor = sortOrder === 'asc' ? 1 : -1;
            return (a[sortBy] - b[sortBy]) * factor;
        });

    const handleSort = (key: InfluencerSort) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('desc');
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Influenciadores Clave</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Análisis de actores principales en la conversación política
                    </p>
                </div>
                <div className="flex gap-2">
                    {(['all', 'politician', 'analyst', 'media', 'academic'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                filter === type
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted hover:bg-muted/80'
                            }`}
                        >
                            {type === 'all' ? 'Todos' : getTypeText(type)}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4">Influenciador</th>
                            <th className="text-right py-3 px-4 cursor-pointer hover:text-primary transition-colors"
                                onClick={() => handleSort('followers')}>
                                <div className="flex items-center justify-end gap-1">
                                    <Users className="w-4 h-4" />
                                    Seguidores
                                </div>
                            </th>
                            <th className="text-right py-3 px-4 cursor-pointer hover:text-primary transition-colors"
                                onClick={() => handleSort('mentions')}>
                                <div className="flex items-center justify-end gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    Menciones
                                </div>
                            </th>
                            <th className="text-right py-3 px-4 cursor-pointer hover:text-primary transition-colors"
                                onClick={() => handleSort('engagement')}>
                                <div className="flex items-center justify-end gap-1">
                                    <BarChart className="w-4 h-4" />
                                    Engagement
                                </div>
                            </th>
                            <th className="text-right py-3 px-4">Tendencia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAndSortedInfluencers.map((influencer) => (
                            <tr key={influencer.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <td className="py-3 px-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">{influencer.name}</span>
                                            {influencer.verified && (
                                                <BadgeCheck className="w-4 h-4 text-blue-500" />
                                            )}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                                {influencer.handle}
                                            </span>
                                        <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-xs px-2 py-0.5 rounded-full bg-muted ${getTypeColor(influencer.type)}`}>
                                                    {getTypeText(influencer.type)}
                                                </span>
                                            <span className="text-xs text-muted-foreground">
                                                    {influencer.role}
                                                </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {influencer.relevantTopics.slice(0, 3).map((topic) => (
                                                <span key={topic} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                                        {topic}
                                                    </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right py-3 px-4">
                                    {formatNumber(influencer.followers)}
                                </td>
                                <td className="text-right py-3 px-4">
                                    {formatNumber(influencer.mentions)}
                                </td>
                                <td className="text-right py-3 px-4">
                                    {influencer.engagement}%
                                </td>
                                <td className="text-right py-3 px-4">
                                    <div className={`flex items-center justify-end ${
                                        influencer.trend === 'up' ? 'text-green-500' :
                                            influencer.trend === 'down' ? 'text-red-500' :
                                                'text-yellow-500'
                                    }`}>
                                        {influencer.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> :
                                            influencer.trend === 'down' ? <TrendingDown className="w-4 h-4 mr-1" /> :
                                                <Minus className="w-4 h-4 mr-1" />}
                                        {Math.abs(influencer.changePercent)}%
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}