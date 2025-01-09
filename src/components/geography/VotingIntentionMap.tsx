// src/components/geography/VotingIntentionMap.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ComposableMap,
    Geographies,
    Geography,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { votingIntentions } from '@/data/GeographyMockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import type {
    CandidateName,
    PieDataEntry,
} from '@/types/geography';

// Colores para los candidatos
// Definimos el objeto de colores
const CANDIDATE_COLORS: Record<CandidateName, string> = {
    "Candidato A": "#3b82f6", // Azul
    "Candidato B": "#ef4444", // Rojo
    "Otros": "#22c55e",      // Verde
    "Indecisos": "#94a3b8"   // Gris
} as const;

// Función auxiliar para verificar si una string es un nombre de candidato válido
const isCandidateName = (name: string): name is CandidateName => {
    return Object.keys(CANDIDATE_COLORS).includes(name);
};

// Función para determinar el color del mapa basado en el margen de ventaja
const getMapColor = (margin: number, leadingCandidate: string) => {
    const baseColor = CANDIDATE_COLORS[leadingCandidate as CandidateName] || CANDIDATE_COLORS["Otros"];
    const intensity = Math.min(Math.abs(margin) / 20, 1); // Normalizar margen a un valor entre 0 y 1
    return `${baseColor}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`;
};

export function VotingIntentionMap() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>("all");

    const getRegionStats = (region: string) => {
        const data = votingIntentions.find(v => v.region === region);
        if (!data) return null;

        // Ordenar candidatos por porcentaje
        const sortedIntentions = [...data.intentions].sort((a, b) => b.percentage - a.percentage);
        const leadingCandidate = sortedIntentions[0];
        const marginColor = leadingCandidate.trend === 'up' ? 'text-green-500' :
            leadingCandidate.trend === 'down' ? 'text-red-500' :
                'text-yellow-500';

        // Datos para el gráfico circular con tipos asegurados
        const pieData: PieDataEntry[] = [
            ...sortedIntentions.map(intention => ({
                name: intention.candidate,
                value: intention.percentage
            })) as PieDataEntry[],
            {
                name: "Indecisos" as CandidateName,
                value: data.undecided
            }
        ];

        return {
            data,
            sortedIntentions,
            leadingCandidate,
            marginColor,
            pieData
        };
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Mapa y controles */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Intención de Voto por Región</CardTitle>
                        <Select
                            value={selectedRegion || "all"}  // Usar "all" como valor por defecto
                            onValueChange={(value) => setSelectedRegion(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar región" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las regiones</SelectItem>
                                {votingIntentions.map((region) => (
                                    <SelectItem key={region.region} value={region.region}>
                                        {region.region}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                                    <Geographies geography={process.env.NEXT_PUBLIC_COLOMBIA_GEO_URL}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => {
                                                const regionStats = getRegionStats(geo.properties.NOMBRE_DPT);
                                                const color = regionStats
                                                    ? getMapColor(
                                                        regionStats.data.margin,
                                                        regionStats.leadingCandidate.candidate
                                                    )
                                                    : "#e5e5e5";

                                                return (
                                                    <Tooltip key={geo.rsmKey}>
                                                        <TooltipTrigger>
                                                            <Geography
                                                                geography={geo}
                                                                fill={color}
                                                                stroke="#FFF"
                                                                strokeWidth={0.5}
                                                                style={{
                                                                    default: { outline: "none" },
                                                                    hover: {
                                                                        fill: "hsl(var(--primary))",
                                                                        outline: "none",
                                                                        cursor: "pointer"
                                                                    },
                                                                    pressed: { outline: "none" }
                                                                }}
                                                                onClick={() => setSelectedRegion(geo.properties.NOMBRE_DPT)}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <div className="space-y-1">
                                                                <p className="font-medium">
                                                                    {geo.properties.NOMBRE_DPT}
                                                                </p>
                                                                {regionStats && (
                                                                    <>
                                                                        <p className="text-sm">
                                                                            Líder: {regionStats.leadingCandidate.candidate}
                                                                            ({regionStats.leadingCandidate.percentage}%)
                                                                        </p>
                                                                        <p className="text-sm">
                                                                            Margen: {regionStats.data.margin}%
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                );
                                            })
                                        }
                                    </Geographies>
                                </TooltipProvider>
                            </ComposableMap>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Panel de estadísticas */}
            <div className="space-y-4">
                {/* Detalles de la región seleccionada */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detalles Regionales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedRegion ? (
                            <div className="space-y-6">
                                {(() => {
                                    const stats = getRegionStats(selectedRegion);
                                    if (!stats) return null;
                                    const { data, pieData, sortedIntentions, marginColor } = stats;

                                    return (
                                        <>
                                            <div className="text-center">
                                                <h3 className="text-lg font-medium">{selectedRegion}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.totalVoters.toLocaleString()} votantes registrados
                                                </p>
                                            </div>

                                            <div className="h-[200px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={pieData}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={60}
                                                            outerRadius={80}
                                                            fill="#8884d8"
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                            label
                                                        >
                                                            {pieData.map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={isCandidateName(entry.name) ? CANDIDATE_COLORS[entry.name] : CANDIDATE_COLORS["Otros"]}
                                                                />
                                                            ))}
                                                        </Pie>
                                                        <Legend />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>

                                            <div className="space-y-2">
                                                {sortedIntentions.map((intention) => (
                                                    <div
                                                        key={intention.candidate}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="w-3 h-3 rounded-full"
                                                                style={{
                                                                    backgroundColor: isCandidateName(intention.candidate)
                                                                        ? CANDIDATE_COLORS[intention.candidate]
                                                                        : CANDIDATE_COLORS["Otros"]
                                                                }}
                                                            />
                                                            <span>{intention.candidate}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span>{intention.percentage}%</span>
                                                            {intention.trend === 'up' ? (
                                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                            ) : intention.trend === 'down' ? (
                                                                <TrendingDown className="w-4 h-4 text-red-500" />
                                                            ) : (
                                                                <Minus className="w-4 h-4 text-yellow-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="flex items-center justify-between text-muted-foreground">
                                                    <span>Indecisos</span>
                                                    <span>{data.undecided}%</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-muted-foreground">
                                                            Abstención esperada
                                                        </span>
                                                        <span className="font-medium">
                                                            {data.abstentionRate}%
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-muted-foreground">
                                                            Margen actual
                                                        </span>
                                                        <span className={`font-medium ${marginColor}`}>
                                                            {data.margin}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-8">
                                <p>Selecciona una región en el mapa para ver los detalles</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Resumen nacional */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen Nacional</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            <div className="space-y-4">
                                {votingIntentions.map((region) => (
                                    <div key={region.region} className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <p className="font-medium">{region.region}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Margen: {region.margin}%
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm">
                                                {region.intentions[0].candidate}: {region.intentions[0].percentage}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}