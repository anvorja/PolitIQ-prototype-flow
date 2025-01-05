"use client"

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { colombiaGeoData, departmentIntensityData } from '@/data/ColombiaGeoMockData';
import type { DepartmentGeography, DepartmentName } from '@/types/geo';
import { normalizeText } from "@/lib/textUtils";

// Colores base para el mapa de calor
const ACTIVITY_COLORS = {
    high: "#ef4444",    // Rojo para alta actividad
    medium: "#eabb2e",  // Amarillo para media actividad
    low: "#22c55e",     // Verde para baja actividad
    default: "#e5e5e5"  // Gris claro para sin datos
};

// Función para determinar el color basado en la intensidad
const getIntensityColor = (intensity: number | undefined) => {
    if (intensity === undefined) return ACTIVITY_COLORS.default;
    if (intensity >= 70) return ACTIVITY_COLORS.high;
    if (intensity >= 40) return ACTIVITY_COLORS.medium;
    return ACTIVITY_COLORS.low;
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

    return (
        <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Distribución Geográfica de Menciones</CardTitle>
                <div className="map-legend">
                    <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: ACTIVITY_COLORS.high }} />
                        <span>Alta Actividad</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: ACTIVITY_COLORS.medium }} />
                        <span>Media Actividad</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: ACTIVITY_COLORS.low }} />
                        <span>Baja Actividad</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[600px] relative bg-muted/5 rounded-lg overflow-hidden">
                    <ComposableMap
                        projection="geoMercator"
                        className="w-full h-full"
                        projectionConfig={{
                            scale: 1800,
                            center: [-74.5, 4.5] // Coordenadas centradas en Colombia
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
                                            fill={getIntensityColor(intensity)}
                                            stroke="#FFF"
                                            strokeWidth={0.5}
                                            style={{
                                                default: {
                                                    outline: "none",
                                                    transition: "all 0.3s"
                                                },
                                                hover: {
                                                    fill: "hsl(var(--primary))",
                                                    cursor: "pointer",
                                                    strokeWidth: 1
                                                },
                                                pressed: {
                                                    outline: "none"
                                                }
                                            }}
                                            onMouseEnter={(evt) => {
                                                tooltipRef.current = {
                                                    x: evt.clientX,
                                                    y: evt.clientY
                                                };
                                                setTooltipContent(
                                                    `${rawName}\n${activityLevel}${intensity ? ` (${intensity}%)\n` : '\n'}Área: ${Math.round(geo.properties.HECTARES).toLocaleString()} ha`
                                                );
                                            }}
                                            onMouseMove={(evt) => {
                                                tooltipRef.current = {
                                                    x: evt.clientX,
                                                    y: evt.clientY
                                                };
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                        {/* Marcadores para las ciudades principales */}
                        {colombiaGeoData.map((city) => (
                            <Marker key={city.region} coordinates={city.coordinates}>
                                <circle r={3} className="map-marker" />
                            </Marker>
                        ))}
                    </ComposableMap>
                    {tooltipContent && (
                        <div
                            className="map-tooltip"
                            style={{
                                left: tooltipRef.current.x + 10,
                                top: tooltipRef.current.y + 10
                            }}
                        >
                            {tooltipContent}
                        </div>
                    )}
                </div>

                {/* Estadísticas por región */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {colombiaGeoData.map((region) => (
                        <div
                            key={region.region}
                            className="p-4 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors"
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