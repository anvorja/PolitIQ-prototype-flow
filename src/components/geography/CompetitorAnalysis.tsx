import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    LineChart,
    Line,
    Legend
} from 'recharts';
import {
    Building2,
    Calendar
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { localCompetitors } from '@/data/GeographyMockData';

// Función para obtener color basado en la fuerza
const getStrengthColor = (strength: number) => {
    if (strength >= 70) return "text-red-500";    // Alto riesgo
    if (strength >= 40) return "text-yellow-500"; // Riesgo medio
    return "text-green-500";                      // Bajo riesgo
};

const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-CO', {
        day: 'numeric',
        month: 'short'
    }).format(new Date(dateString));
};

export function CompetitorAnalysis() {
    const [selectedRegion, setSelectedRegion] = useState<string>("all");
    const [selectedParty, setSelectedParty] = useState<string>("all");

    // Filtrar competidores
    const filteredCompetitors = localCompetitors.filter(competitor => {
        if (selectedRegion !== "all" && competitor.region !== selectedRegion) return false;
        return !(selectedParty !== "all" && competitor.party !== selectedParty);

    });

    // Obtener listas únicas para filtros
    const uniqueParties = Array.from(new Set(localCompetitors.map(c => c.party)));
    const uniqueRegions = Array.from(new Set(localCompetitors.map(c => c.region)));

    return (
        <div className="space-y-4">
            {/* Panel de control */}
            <Card>
                <CardContent className="py-6">
                    <div className="flex items-center gap-4">
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filtrar por región" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las regiones</SelectItem>
                                {uniqueRegions.map(region => (
                                    <SelectItem key={region} value={region}>
                                        {region}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedParty} onValueChange={setSelectedParty}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filtrar por partido" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los partidos</SelectItem>
                                {uniqueParties.map(party => (
                                    <SelectItem key={party} value={party}>
                                        {party}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Lista de competidores */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Competidores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[700px] pr-4">
                            <div className="space-y-4">
                                {filteredCompetitors.map((competitor) => (
                                    <Card key={competitor.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="pt-6">
                                            <div className="space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {competitor.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Building2 className="w-4 h-4" />
                                                            {competitor.party}
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary">
                                                        {competitor.currentPosition || 'Candidato'}
                                                    </Badge>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm text-muted-foreground">
                                                            Fuerza Electoral
                                                        </span>
                                                        <span className={`font-medium ${getStrengthColor(competitor.strength)}`}>
                                                            {competitor.strength}%
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={competitor.strength}
                                                        className={`h-2 ${
                                                            competitor.strength >= 70 ? "[&>div]:bg-red-500" :
                                                                competitor.strength >= 40 ? "[&>div]:bg-yellow-500" :
                                                                    "[&>div]:bg-green-500"
                                                        }`}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium">Base de Apoyo:</p>
                                                    {competitor.supportBase.map((base, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-center text-sm"
                                                        >
                                                            <span className="text-muted-foreground">
                                                                {base.demographic}
                                                            </span>
                                                            <span>{base.level}%</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium mb-2">
                                                        Propuestas Principales:
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {competitor.keyProposals.map((proposal, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {proposal}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="pt-2 border-t">
                                                    <p className="text-sm font-medium mb-2">
                                                        Actividad Reciente:
                                                    </p>
                                                    <div className="space-y-2">
                                                        {competitor.recentActivities.map((activity, index) => (
                                                            <div
                                                                key={index}
                                                                className="text-sm flex items-start gap-2"
                                                            >
                                                                <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                                                <div className="flex-1">
                                                                    <p>{activity.activity}</p>
                                                                    <div className="flex items-center justify-between text-muted-foreground">
                                                                        <span>{formatDate(activity.date)}</span>
                                                                        <span>Impacto: {activity.impact}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Gráficos y análisis */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Fuerza electoral por región */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Fuerza Electoral por Región</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={filteredCompetitors}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="region" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="strength"
                                            name="Fuerza Electoral"
                                            fill="hsl(var(--primary))"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Análisis comparativo */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Base de apoyo */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Base de Apoyo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={filteredCompetitors[0]?.supportBase || []}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="demographic" />
                                            <PolarRadiusAxis />
                                            <Radar
                                                name="Nivel de Apoyo"
                                                dataKey="level"
                                                stroke="hsl(var(--primary))"
                                                fill="hsl(var(--primary))"
                                                fillOpacity={0.6}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tendencias de actividad */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tendencias de Actividad</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={filteredCompetitors[0]?.recentActivities || []}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="impact"
                                                name="Impacto"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}