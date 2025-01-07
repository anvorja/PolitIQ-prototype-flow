// src/components/hashtags/HashtagFilters.tsx
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { HashtagCategory } from "@/types/hashtags";

export interface Filters {
    category: string;
    timeRange: string;
    sentiment: string;
    engagement: string;
}

interface HashtagFiltersProps {
    filters: Filters;
    onFilterChangeAction: (key: keyof Filters, value: string) => void;
    categories: HashtagCategory[];
}

export function HashtagFilters({ filters, onFilterChangeAction, categories }: HashtagFiltersProps) {
    return (
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4 overflow-x-auto">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filtros:</span>
                </div>

                <Select
                    value={filters.category}
                    onValueChange={(value) => onFilterChangeAction('category', value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.timeRange}
                    onValueChange={(value) => onFilterChangeAction('timeRange', value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rango de tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="24h">Últimas 24 horas</SelectItem>
                        <SelectItem value="7d">Últimos 7 días</SelectItem>
                        <SelectItem value="30d">Últimos 30 días</SelectItem>
                        <SelectItem value="90d">Últimos 90 días</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.sentiment}
                    onValueChange={(value) => onFilterChangeAction('sentiment', value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sentimiento" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todo</SelectItem>
                        <SelectItem value="positive">Positivo</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negativo</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.engagement}
                    onValueChange={(value) => onFilterChangeAction('engagement', value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Engagement" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todo</SelectItem>
                        <SelectItem value="high">Alto</SelectItem>
                        <SelectItem value="medium">Medio</SelectItem>
                        <SelectItem value="low">Bajo</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}