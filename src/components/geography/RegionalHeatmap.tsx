// src/components/geography/RegionalHeatmap.tsx

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    departmentIntensityData,
    regionalAnalytics
} from '@/data/GeographyMockData';
import { normalizeText } from '@/lib/textUtils';

const METRICS = {
    influence: {
        title: "Influencia",
        colors: {
            high: "#22c55e",    // Verde para alta influencia
            medium: "#eab308",   // Amarillo para media influencia
            low: "#ef4444",      // Rojo para baja influencia
            default: "#e5e5e5"   // Gris para sin datos
        }
    },
    awareness: {
        title: "Reconocimiento",
        colors: {
            high: "#3b82f6",    // Azul para alto reconocimiento
            medium: "#8b5cf6",   // Púrpura para medio reconocimiento
            low: "#ec4899",      // Rosa para bajo reconocimiento
            default: "#e5e5e5"   // Gris para sin datos
        }
    },
    favorability: {
        title: "Favorabilidad",
        colors: {
            high: "#06b6d4",    // Cyan para alta favorabilidad
            medium: "#14b8a6",   // Teal para media favorabilidad
            low: "#f43f5e",      // Rosa fuerte para baja favorabilidad
            default: "#e5e5e5"   // Gris para sin datos
        }
    }
};

const getMetricColor = (value: number, metric: keyof typeof METRICS) => {
    if (value === undefined) return METRICS[metric].colors.default;
    if (value >= 70) return METRICS[metric].colors.high;
    if (value >= 40) return METRICS[metric].colors.medium;
    return METRICS[metric].colors.low;
};

const getMetricLevel = (value: number) => {
    if (value === undefined) return "Sin datos";
    if (value >= 70) return "Alto";
    if (value >= 40) return "Medio";
    return "Bajo";
};

export function RegionalHeatmap() {
    const [selectedMetric, setSelectedMetric] = useState<keyof typeof METRICS>("influence");

    // En RegionalHeatmap.tsx, antes del return:
    console.log("Nombres en departmentIntensityData:", Object.keys(departmentIntensityData));
    console.log("Nombres en regionalAnalytics:", regionalAnalytics.map(r => r.region));

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mapa de {METRICS[selectedMetric].title} Regional</CardTitle>
                <div className="flex items-center gap-4">
                    <Select value={selectedMetric} onValueChange={(value: keyof typeof METRICS) => setSelectedMetric(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar métrica" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="influence">Influencia</SelectItem>
                            <SelectItem value="awareness">Reconocimiento</SelectItem>
                            <SelectItem value="favorability">Favorabilidad</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                        {Object.entries(METRICS[selectedMetric].colors).map(([level, color]) => (
                            level !== 'default' && (
                                <div key={level} className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                    <span className="text-sm capitalize">{level}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[600px] bg-muted/5 rounded-lg overflow-hidden">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 1800,
                            center: [-74.5, 4.5]
                        }}
                    >
                        <TooltipProvider>
                            {/*Nota: para un caso futura se usará el archivo .JSON*/}
                            {/*import colombiaGeoJson from '@/data/colombia-geo.json';*/}
                            {/*// Y usarlo directamente en RegionalHeatmap.tsx:*/}
                            {/*<Geographies geography={colombiaGeoJson}>*/}
                            {/*<Geographies geography={process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL || ""}>*/}
                            {/*    {({geographies}) =>*/}
                            {/*        geographies.map((geo) => {*/}
                            {/*            const regionData = regionalAnalytics.find(*/}
                            {/*                r => normalizeText(r.region) === normalizeText(geo.properties.NOMBRE_DPT)*/}
                            {/*            );*/}
                            {/*            let metricValue;*/}
                            {/*            switch (selectedMetric) {*/}
                            {/*                case 'influence':*/}
                            {/*                    metricValue = departmentIntensityData[normalizeText(geo.properties.NOMBRE_DPT)];*/}
                            {/*                    break;*/}
                            {/*                case 'awareness':*/}
                            {/*                    metricValue = regionData?.campaignMetrics.awarenessLevel;*/}
                            {/*                    break;*/}
                            {/*                case 'favorability':*/}
                            {/*                    metricValue = regionData?.campaignMetrics.favorability;*/}
                            {/*                    break;*/}
                            {/*            }*/}
                            <Geographies geography={process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL || ""}>
                                {({geographies}) => {
                                    // Log inicial de todos los nombres en nuestros datos
                                    console.log("Nombres en departmentIntensityData:", Object.keys(departmentIntensityData));
                                    console.log("Nombres en regionalAnalytics:", regionalAnalytics.map(r => r.region));

                                    return geographies.map((geo) => {
                                        // Debug para cada departamento
                                        const geoName = geo.properties.NOMBRE_DPT;
                                        const normalizedGeoName = normalizeText(geoName);
                                        const hasIntensityData = normalizedGeoName in departmentIntensityData;
                                        const hasRegionalData = regionalAnalytics.some(r =>
                                            normalizeText(r.region) === normalizedGeoName
                                        );

                                        console.log("Comparación de nombres:", {
                                            original: geoName,
                                            normalizado: normalizedGeoName,
                                            tieneIntensidad: hasIntensityData,
                                            tieneDatosRegionales: hasRegionalData,
                                            valorIntensidad: departmentIntensityData[normalizedGeoName],
                                            datosRegionales: regionalAnalytics.find(r =>
                                                normalizeText(r.region) === normalizedGeoName
                                            )
                                        });

                                        const regionData = regionalAnalytics.find(
                                            r => normalizeText(r.region) === normalizedGeoName
                                        );

                                        let metricValue;
                                        switch (selectedMetric) {
                                            case 'influence':
                                                metricValue = departmentIntensityData[normalizedGeoName];
                                                break;
                                            case 'awareness':
                                                metricValue = regionData?.campaignMetrics.awarenessLevel;
                                                break;
                                            case 'favorability':
                                                metricValue = regionData?.campaignMetrics.favorability;
                                                break;
                                        }

                                        return (
                                            <Tooltip key={geo.rsmKey}>
                                                <TooltipTrigger>
                                                    <Geography
                                                        geography={geo}
                                                        fill={getMetricColor(metricValue || 0, selectedMetric)}
                                                        stroke="#FFF"
                                                        strokeWidth={0.5}
                                                        style={{
                                                            default: {outline: "none"},
                                                            hover: {
                                                                fill: "hsl(var(--primary))",
                                                                outline: "none",
                                                                cursor: "pointer"
                                                            },
                                                            pressed: {outline: "none"}
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="space-y-1">
                                                        <p className="font-medium">{geoName}</p>
                                                        <p className="text-sm">
                                                            {METRICS[selectedMetric].title}: {getMetricLevel(metricValue || 0)}
                                                            {metricValue ? ` (${metricValue}%)` : ''}
                                                        </p>
                                                        {regionData && (
                                                            <>
                                                                <p className="text-sm">
                                                                    Población votante: {regionData.demographics.votingAge.toLocaleString()}
                                                                </p>
                                                                <p className="text-sm">
                                                                    Registrados: {regionData.demographics.registered.toLocaleString()}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    });
                                }}
                            </Geographies>
                        </TooltipProvider>
                    </ComposableMap>
                </div>

                {/* Métricas resumidas */}
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