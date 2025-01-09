// src/components/dashboard/GeoHeatmap.tsx
"use client"

import React, { useState, useRef } from 'react';
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
    const [tooltipContent, setTooltipContent] = useState("");
    const tooltipRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const mapRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const currentTheme = (theme === 'system' ? 'light' : theme) as 'light' | 'dark';

    const getRelativeCoordinates = (evt: React.MouseEvent | MouseEvent) => {
        if (mapRef.current) {
            const rect = mapRef.current.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        return { x: 0, y: 0 };
    };

    return (
        <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Distribución Geográfica de Menciones</CardTitle>
                <div className="flex items-center gap-4">
                    {/* Leyenda actualizada */}
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
                        <Geographies geography={process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo: DepartmentGeography) => {
                                    const rawName = geo.properties.NOMBRE_DPT;
                                    const normalizedName = normalizeText(rawName) as DepartmentName;
                                    const intensity = departmentIntensityData[normalizedName];
                                    const activityLevel = getActivityLevel(intensity);

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
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
                                                        ? "hsl(0,25%,73%)" // para dark mode
                                                        : "hsl(220 13% 91%)", // para light mode
                                                    stroke: currentTheme === 'dark'
                                                        ? "hsl(0,25%,73%)" // Borde para dark mode
                                                        : "hsl(0,0%,99%)", // Borde para light mode
                                                    strokeWidth: 1,
                                                    outline: "none",
                                                    cursor: "pointer"
                                                }
                                            }}
                                            onMouseEnter={(evt) => {
                                                tooltipRef.current = getRelativeCoordinates(evt);
                                                setTooltipContent(
                                                    `${rawName}\n${activityLevel}${intensity ? ` (${intensity}%)\n` : '\n'}Área: ${Math.round(geo.properties.HECTARES).toLocaleString()} ha`
                                                );
                                            }}
                                            onMouseMove={(evt) => {
                                                tooltipRef.current = getRelativeCoordinates(evt);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
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


                    {tooltipContent && (
                        <div
                            className="absolute z-10 px-3 py-2 text-sm bg-popover/95 border border-border
                                     rounded-lg shadow-lg dark:shadow-primary/10 pointer-events-none"
                            style={{
                                left: `${tooltipRef.current.x}px`,
                                top: `${tooltipRef.current.y}px`,
                                transform: 'translate(10px, -50%)',
                                whiteSpace: 'pre-line'
                            }}
                        >
                            {tooltipContent}
                        </div>
                    )}
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