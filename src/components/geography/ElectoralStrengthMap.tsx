import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
    Users,
    UserCheck,
    AlertTriangle,
    Filter
} from 'lucide-react';
import { electoralStrengths } from '@/data/GeographyMockData';

// Función para obtener color basado en la fuerza electoral
const getStrengthColor = (strength: number) => {
    if (strength >= 70) return "text-green-500";
    if (strength >= 40) return "text-yellow-500";
    return "text-red-500";
};

export function ElectoralStrengthMap() {
    const [selectedRegion, setSelectedRegion] = useState<string>(electoralStrengths[0].region);
    const [selectedMetric, setSelectedMetric] = useState<string>("strength");

    const currentRegion = electoralStrengths.find(r => r.region === selectedRegion);

    if (!currentRegion) return null;

    // Preparar datos para el gráfico histórico
    const historicalData = currentRegion.historicalPerformance.map(h => ({
        year: h.year,
        votes: h.votes,
        percentage: h.percentage
    }));

    // Preparar datos para el gráfico demográfico
    const demographicData = currentRegion.demographics.map(d => ({
        category: d.category,
        strength: d.strength,
        voters: d.potentialVoters
    }));

    return (
        <div className="space-y-4">
            {/* Controles */}
            <Card>
                <CardContent className="py-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Filtros:</span>
                        </div>
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Región" />
                            </SelectTrigger>
                            <SelectContent>
                                {electoralStrengths.map(region => (
                                    <SelectItem key={region.region} value={region.region}>
                                        {region.region}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Métrica" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="strength">Fortaleza Electoral</SelectItem>
                                <SelectItem value="voters">Votantes Potenciales</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Grid principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Panel de métricas clave */}
                <Card>
                    <CardHeader>
                        <CardTitle>Métricas Clave</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">
                                        Fortaleza General
                                    </span>
                                    <span className={`font-medium ${getStrengthColor(currentRegion.overallStrength)}`}>
                                        {currentRegion.overallStrength}%
                                    </span>
                                </div>
                                <Progress
                                    value={currentRegion.overallStrength}
                                    className="h-2"
                                />
                            </div>

                            <div className="pt-4 space-y-4">
                                <div>
                                    <p className="text-sm font-medium mb-2">Aliados Clave</p>
                                    <div className="space-y-1">
                                        {currentRegion.keyAllies.map((ally, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <UserCheck className="w-4 h-4 text-green-500" />
                                                <span>{ally}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium mb-2">Desafíos</p>
                                    <div className="space-y-1">
                                        {currentRegion.challenges.map((challenge, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                                <span>{challenge}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Gráfico histórico */}
                <Card>
                    <CardHeader>
                        <CardTitle>Desempeño Histórico</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={historicalData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="percentage"
                                        name="Porcentaje"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="votes"
                                        name="Votos"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Análisis demográfico */}
                <Card>
                    <CardHeader>
                        <CardTitle>Análisis Demográfico</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={demographicData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey={selectedMetric === "strength" ? "strength" : "voters"}
                                        name={selectedMetric === "strength" ? "Fortaleza %" : "Votantes"}
                                        fill="hsl(var(--primary))"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <ScrollArea className="h-[120px] mt-4">
                            <div className="space-y-2">
                                {demographicData.map((demo, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span>{demo.category}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={getStrengthColor(demo.strength)}>
                                                {demo.strength}%
                                            </span>
                                            <span className="text-muted-foreground">
                                                {demo.voters.toLocaleString()} votantes
                                            </span>
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