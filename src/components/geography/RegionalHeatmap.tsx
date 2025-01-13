// src/components/geography/RegionalHeatmap.tsx
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { normalizeText } from '@/lib/textUtils';
import { departmentIntensityData, regionalAnalytics } from '@/data/GeographyMockData';
import {
    DEPARTMENT_TO_REGION,
    COLOMBIA_REGIONS,
    RegionName
} from '@/data/ColombiaRegionMapping';
import { DepartmentGeography } from "@/types/geo";
import { GeoJSONData, ActivityColors } from '@/types/regionalHeatmap';

// Colores actualizados para mejor contraste en ambos temas
const ACTIVITY_COLORS: ActivityColors = {
    light: {
        low: "#ef4444",      // Rojo más vibrante
        medium: "#f59e0b",    // Ámbar más cálido
        high: "#10b981",       // Esmeralda más suave
        default: "#e2e8f0"    // Gris claro neutral
    },
    dark: {
        low: "#dc2626",      // Rojo más oscuro
        medium: "#d97706",    // Ámbar más oscuro
        high: "#059669",       // Esmeralda más oscuro
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

export function RegionalHeatmap() {
    const [selectedRegion, setSelectedRegion] = useState<RegionName | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
    const { theme } = useTheme();
    const currentTheme = (theme === 'system' ? 'light' : theme) as 'light' | 'dark';

    useEffect(() => {
        let isSubscribed = true;

        const loadGeoData = async () => {
            if (!process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL) {
                setError('URL no configurada');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL);
                if (!response.ok) {
                    setError(`Error en la petición: ${response.status}`);
                    return;
                }

                const data = await response.json();
                if (isSubscribed) {
                    setGeoData(data);
                }
            } catch (err: unknown) {
                if (isSubscribed) {
                    setError(err instanceof Error ? err.message : 'Error desconocido al cargar el mapa');
                }
            } finally {
                if (isSubscribed) {
                    setIsLoading(false);
                }
            }
        };

        // Retornamos la promesa explícitamente
        void loadGeoData();
        // O alternativamente: loadGeoData().catch(() => {});

        return () => {
            isSubscribed = false;
        };
    }, []);

    const getDepartmentColor = (departmentName: string) => {
        const normalizedName = normalizeText(departmentName);
        const departmentRegion = DEPARTMENT_TO_REGION[normalizedName];

        if (selectedRegion !== 'all' && departmentRegion !== selectedRegion) {
            return ACTIVITY_COLORS[currentTheme].default;
        }

        const intensity = departmentIntensityData[normalizedName] || 0;
        return getIntensityColor(intensity, currentTheme);
    };

    return (
        <Card>
            <CardHeader className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-8">
                        <CardTitle>
                            Mapa de {selectedRegion === 'all' ? 'Influencia Regional' : COLOMBIA_REGIONS[selectedRegion]}
                        </CardTitle>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-600"/>
                                <span className="text-sm text-muted-foreground">Alta</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500 dark:bg-amber-600"/>
                                <span className="text-sm text-muted-foreground">Media</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500 dark:bg-red-600"/>
                                <span className="text-sm text-muted-foreground">Baja</span>
                            </div>
                        </div>
                    </div>
                    <Select value={selectedRegion} onValueChange={(value: RegionName | 'all') => setSelectedRegion(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por región"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las regiones</SelectItem>
                            <SelectItem value="andina">Región Andina</SelectItem>
                            <SelectItem value="caribe">Región Caribe</SelectItem>
                            <SelectItem value="pacifica">Región Pacífica</SelectItem>
                            <SelectItem value="orinoquia">Región Orinoquía</SelectItem>
                            <SelectItem value="amazonica">Región Amazónica</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent>
                <div className="h-[600px] bg-white dark:bg-black/40 rounded-lg overflow-hidden relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <p>Cargando mapa...</p>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="absolute inset-0 flex items-center justify-center text-red-500">
                            <p>Error: {error}</p>
                        </div>
                    )}
                    {!isLoading && !error && geoData && (
                        <ComposableMap
                            projection="geoMercator"
                            className="w-full h-full"
                            projectionConfig={{
                                scale: 1800,
                                center: [-74.5, 4.5]
                            }}
                        >
                            <TooltipProvider>
                                <Geographies geography={geoData}>
                                    {({geographies}) => {
                                        if (!geographies) return null;
                                        return geographies.map((geo: DepartmentGeography) => (
                                            <Tooltip key={geo.rsmKey}>
                                                <TooltipTrigger asChild>
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        style={{
                                                            default: {
                                                                fill: getDepartmentColor(geo.properties.NOMBRE_DPT),
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
                                                            {geo.properties.NOMBRE_DPT}
                                                        </p>
                                                        <div className="space-y-1 text-sm">
                                                            <div className="flex justify-between items-center gap-4">
                                                                <span className="text-gray-400">Región</span>
                                                                <span className="text-white">
                                                                    {DEPARTMENT_TO_REGION[normalizeText(geo.properties.NOMBRE_DPT)]
                                                                        ? COLOMBIA_REGIONS[DEPARTMENT_TO_REGION[normalizeText(geo.properties.NOMBRE_DPT)]]
                                                                        : 'No definida'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center gap-4">
                                                                <span className="text-gray-400">Influencia</span>
                                                                <span className="text-white font-medium">
                                                                    {departmentIntensityData[normalizeText(geo.properties.NOMBRE_DPT)]
                                                                        ? `${departmentIntensityData[normalizeText(geo.properties.NOMBRE_DPT)]}%`
                                                                        : 'No disponible'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        ));
                                    }}
                                </Geographies>
                            </TooltipProvider>
                        </ComposableMap>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {regionalAnalytics.slice(0, 3).map((region) => (
                        <Card key={region.region} className="p-4">
                            <h3 className="font-medium">{region.region}</h3>
                            <div className="mt-2 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Influencia</span>
                                    <span>{departmentIntensityData[normalizeText(region.region)]}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Reconocimiento</span>
                                    <span>{region.campaignMetrics.awarenessLevel}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Favorabilidad</span>
                                    <span>{region.campaignMetrics.favorability}%</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}