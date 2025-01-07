// src/app/hashtags/page.tsx
"use client"

import { Button } from "@/components/ui/button";
import { HashtagCategories } from "@/components/hashtags/HashtagCategories";
import { HashtagTrendsChart } from "@/components/hashtags/HashtagTrendsChart";
import { HashtagFilters } from "@/components/hashtags/HashtagFilters";
import { hashtagCategories } from "@/data/HashtagsMockData";
import { BarChart3, Hash, Users, Sparkles, Download, Share2, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useMemo } from 'react';

// Tipos para los filtros
interface Filters {
    category: string;
    timeRange: string;
    sentiment: string;
    engagement: string;
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};

export default function HashtagsPage() {

    // Estado para los filtros
    const [filters, setFilters] = useState<Filters>({
        category: "all",
        timeRange: "7d",
        sentiment: "all",
        engagement: "all"
    });

    // Filtrar categorías basadas en los filtros
    const filteredCategories = useMemo(() => {
        if (filters.category === "all") {
            return hashtagCategories;
        }
        return hashtagCategories.filter(category =>
            category.id === filters.category
        );
    }, [filters.category]);

    // Calcular totales con las categorías filtradas
    const totals = useMemo(() => ({
        hashtags: filteredCategories.reduce((acc, cat) => acc + cat.tags.length, 0),
        mentions: filteredCategories.reduce((acc, cat) => acc + cat.totalMentions, 0),
        reach: filteredCategories.reduce((acc, cat) =>
            acc + cat.tags.reduce((sum, tag) => sum + tag.reach, 0), 0
        ),
        avgSentiment: filteredCategories.length > 0
            ? filteredCategories.reduce((acc, cat) => acc + cat.avgSentiment, 0) /
            filteredCategories.length
            : 0
    }), [filteredCategories]);

    // Handler para actualizar filtros
    const handleFilterChangeAction = (key: keyof Filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center pb-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Análisis de Hashtags</h1>
                    <p className="text-muted-foreground mt-2">
                        Monitoreo y análisis de hashtags en tiempo real para campañas políticas
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                    </Button>
                    <Button size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Nuevo Seguimiento
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="py-6">
                    <HashtagFilters
                        filters={filters}
                        onFilterChangeAction={handleFilterChangeAction}
                        categories={hashtagCategories}
                    />
                </CardContent>
            </Card>

            {/* KPI Cards... */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Total Hashtags</p>
                                <p className="text-2xl font-bold">{totals.hashtags}</p>
                            </div>
                            <Hash className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Total Menciones</p>
                                <p className="text-2xl font-bold">{formatNumber(totals.mentions)}</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Alcance Total</p>
                                <p className="text-2xl font-bold">{formatNumber(totals.reach)}</p>
                            </div>
                            <Users className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Sentimiento Promedio</p>
                                <p className="text-2xl font-bold">{totals.avgSentiment.toFixed(1)}%</p>
                            </div>
                            <Sparkles className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Trends Chart */}
            <Card className="mb-8">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Tendencias de Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                    <HashtagTrendsChart />
                </CardContent>
            </Card>

            {/* Categories */}
            <HashtagCategories categories={filteredCategories}/>
        </div>
    );
}
