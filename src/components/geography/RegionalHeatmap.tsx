// src/components/geography/RegionalHeatmap.tsx

import React, { useEffect, useState } from 'react';
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
import { getDepartmentsInRegion,
    getIntensityColor,
    calculateRegionIntensity
} from '@/lib/geoDepartmentsUtils';
import { departmentIntensityData, regionalAnalytics } from '@/data/GeographyMockData';
import {
    DEPARTMENT_TO_REGION,
    COLOMBIA_REGIONS,
    RegionName
} from '@/data/ColombiaRegionMapping';
import { DepartmentGeography } from "@/types/geo";

interface GeoJSONFeature {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    properties: {
        NOMBRE_DPT: string;
    };
}

interface GeoJSONData {
    type: string;
    features: GeoJSONFeature[];
}

export function RegionalHeatmap() {
    const [selectedRegion, setSelectedRegion] = useState<RegionName | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [geoData, setGeoData] = useState<GeoJSONData | null>(null);

    useEffect(() => {
        const loadGeoData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL || '');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGeoData(data);
                setIsLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error desconocido al cargar el mapa');
                }
                setIsLoading(false);
            }
        };

        loadGeoData().catch(console.error);
    }, []);

    const getDepartmentColor = (departmentName: string) => {
        const normalizedName = normalizeText(departmentName);
        const departmentRegion = DEPARTMENT_TO_REGION[normalizedName];

        if (selectedRegion !== 'all' && departmentRegion !== selectedRegion) {
            return "#e5e5e5";
        }

        const intensity = departmentIntensityData[normalizedName] || 0;
        return getIntensityColor(intensity);
    };

    const getRegionStats = (region: RegionName) => {
        const avgIntensity = calculateRegionIntensity(region, departmentIntensityData);
        const departments = getDepartmentsInRegion(region);
        return {
            avgIntensity,
            departmentCount: departments.length,
            departments: departments
        };
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Mapa de {selectedRegion === 'all' ? 'Influencia Regional' : COLOMBIA_REGIONS[selectedRegion]}
                        </CardTitle>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                                <span className="text-sm">Alta</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                                <span className="text-sm">Media</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                                <span className="text-sm">Baja</span>
                            </div>
                        </div>
                    </div>
                    <Select value={selectedRegion} onValueChange={(value: RegionName | 'all') => setSelectedRegion(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por región" />
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
                {selectedRegion !== 'all' && (
                    <div className="text-sm text-muted-foreground mt-2">
                        Intensidad promedio: {getRegionStats(selectedRegion).avgIntensity}%
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="h-[600px] bg-muted/5 rounded-lg overflow-hidden relative">
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
                                        console.log("Geographies loaded:", geographies?.length);
                                        if (!geographies) return null;
                                        return geographies.map((geo: DepartmentGeography) => (
                                            <Tooltip key={geo.rsmKey}>
                                                <TooltipTrigger asChild>
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        fill={getDepartmentColor(geo.properties.NOMBRE_DPT)}
                                                        stroke="#FFF"
                                                        strokeWidth={0.5}
                                                        style={{
                                                            default: {
                                                                outline: "none",
                                                                transition: "all 250ms"
                                                            },
                                                            hover: {
                                                                fill: "hsl(var(--primary))",
                                                                outline: "none",
                                                                cursor: "pointer",
                                                                stroke: "#fff",
                                                                strokeWidth: 1.5
                                                            },
                                                            pressed: {
                                                                outline: "none"
                                                            }
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-black/90 border-0">
                                                    <div className="space-y-1.5 p-1">
                                                        <p className="text-base font-semibold text-white">{geo.properties.NOMBRE_DPT}</p>
                                                        <div className="space-y-1 text-sm">
                                                            <div className="flex justify-between items-center gap-4">
                                                                <span className="text-gray-400">Región</span>
                                                                <span className="text-white">
                                                                    {DEPARTMENT_TO_REGION[normalizeText(geo.properties.NOMBRE_DPT)]
                                                                        ? COLOMBIA_REGIONS[DEPARTMENT_TO_REGION[normalizeText(geo.properties.NOMBRE_DPT)]]: 'No definida'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center gap-4">
                                                                <span className="text-gray-400">Influencia</span>
                                                                <span className="text-white font-medium">
                                                                    {departmentIntensityData[normalizeText(geo.properties.NOMBRE_DPT)]
                                                                        ? `${departmentIntensityData[normalizeText(geo.properties.NOMBRE_DPT)]}%`: 'No disponible'}
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