// src/components/dashboard/GeoHeatmap.tsx
"use client"

import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from 'next-themes';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { colombiaGeoData, departmentIntensityData } from '@/data/ColombiaGeoMockData';
import type { DepartmentGeography, DepartmentName } from '@/types/geo';
import { normalizeText } from "@/lib/textUtils";
import {cn} from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Colores actualizados para mejor contraste en ambos temas
const ACTIVITY_COLORS = {
    light: {
        high: "#ef4444",      // Rojo más vibrante
        medium: "#f59e0b",    // Ámbar más cálido
        low: "#10b981",       // Esmeralda más suave
        default: "#e2e8f0"    // Gris claro neutral
    },
    dark: {
        high: "#dc2626",      // Rojo más oscuro
        medium: "#d97706",    // Ámbar más oscuro
        low: "#059669",       // Esmeralda más oscuro
        default: "#1e293b"    // Slate oscuro
    }
};

// Función actualizada para determinar el color basado en la intensidad y el tema
const getIntensityColor = (intensity: number | undefined, theme: 'light' | 'dark') => {
    const colors = ACTIVITY_COLORS[theme];
    if (intensity === undefined) return colors.default;
    if (intensity >= 70) return colors.high;
    if (intensity >= 40) return colors.medium;
    return colors.low;
};

// Función para obtener el nivel de actividad como texto
const getActivityLevel = (intensity: number | undefined) => {
    if (intensity === undefined) return "Sin datos";
    if (intensity >= 70) return "Alta actividad";
    if (intensity >= 40) return "Media actividad";
    return "Baja actividad";
};

export function GeoHeatmap() {

    const mapRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const currentTheme = (theme === 'system' ? 'light' : theme) as 'light' | 'dark';

    return (
        <Card className={cn(
            "col-span-full",
            "dark:bg-gradient-to-br dark:from-card/90 dark:to-card/100"
        )}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Distribución Geográfica de Menciones</CardTitle>
                <div className="flex items-center gap-4">
                    <div className="legend-item">
                        <div className="h-3 w-3 rounded-full bg-red-500 dark:bg-red-600" />
                        <span className="text-sm text-muted-foreground">Alta Actividad</span>
                    </div>
                    <div className="legend-item">
                        <div className="h-3 w-3 rounded-full bg-amber-500 dark:bg-amber-600" />
                        <span className="text-sm text-muted-foreground">Media Actividad</span>
                    </div>
                    <div className="legend-item">
                        <div className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-600" />
                        <span className="text-sm text-muted-foreground">Baja Actividad</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div ref={mapRef} className="h-[600px] relative bg-white dark:bg-black/40 rounded-lg overflow-hidden">
                    <ComposableMap
                        projection="geoMercator"
                        className="w-full h-full"
                        projectionConfig={{
                            scale: 1800,
                            center: [-74.5, 4.5]
                        }}
                    >
                        <TooltipProvider>
                            <Geographies geography={process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL}>
                                {({ geographies }) =>
                                    geographies.map((geo: DepartmentGeography) => {
                                        const rawName = geo.properties.NOMBRE_DPT;
                                        const normalizedName = normalizeText(rawName) as DepartmentName;
                                        const intensity = departmentIntensityData[normalizedName];
                                        const activityLevel = getActivityLevel(intensity);

                                        return (
                                            <Tooltip key={geo.rsmKey}>
                                                <TooltipTrigger asChild>
                                                    <Geography
                                                        geography={geo}
                                                        className="transition-colors duration-200"
                                                        style={{
                                                            default: {
                                                                fill: getIntensityColor(intensity, currentTheme),
                                                                stroke: "hsl(var(--border))",
                                                                strokeWidth: 0.5,
                                                                outline: "none",
                                                            },
                                                            hover: {
                                                                fill: currentTheme === 'dark'
                                                                    ? "hsl(0,25%,73%)"
                                                                    : "hsl(220 13% 91%)",
                                                                stroke: currentTheme === 'dark'
                                                                    ? "hsl(0,25%,73%)"
                                                                    : "hsl(0,0%,99%)",
                                                                strokeWidth: 1,
                                                                outline: "none",
                                                                cursor: "pointer"
                                                            }
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-black/90 border-0">
                                                    <div className="space-y-1.5 p-1">
                                                        <p className="text-base font-semibold text-white">
                                                            {rawName}
                                                        </p>
                                                        <div className="space-y-1 text-sm">
                                                            <div className="flex justify-between items-center gap-4">
                                                                <span className="text-gray-400">Actividad</span>
                                                                <span className="text-white font-medium">
                                                                {activityLevel}
                                                            </span>
                                                            </div>
                                                            <div className="flex justify-between items-center gap-4">
                                                                <span className="text-gray-400">Intensidad</span>
                                                                <span className="text-white font-medium">
                                                                {intensity ? `${intensity}%` : 'No disponible'}
                                                            </span>
                                                            </div>
                                                            <div className="flex justify-between items-center gap-4">
                                                                <span className="text-gray-400">Área</span>
                                                                <span className="text-white">
                                                                {Math.round(geo.properties.HECTARES).toLocaleString()} ha
                                                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    })
                                }
                            </Geographies>
                        </TooltipProvider>

                        {/* Marcadores actualizados */}
                        {colombiaGeoData.map((city) => (
                            <Marker key={city.region} coordinates={city.coordinates}>
                                <circle
                                    r={3}
                                    className="fill-primary stroke-background stroke-2 hover:r-4 transition-all"
                                />
                            </Marker>
                        ))}
                    </ComposableMap>
                </div>

                {/* Estadísticas actualizadas */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {colombiaGeoData.map((region) => (
                        <div
                            key={region.region}
                            className="p-4 rounded-lg bg-muted/5 dark:bg-muted/10 hover:bg-muted/10 dark:hover:bg-muted/20
                                 border border-border/40 dark:border-border/20
                                 transition-colors"
                        >
                            <div className="font-medium">{region.region}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                                {region.mentions.toLocaleString()} menciones
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Sentimiento: {region.sentiment}%
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}