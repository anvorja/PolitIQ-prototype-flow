import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { regionalTopics } from '@/data/GeographyMockData';

export function CriticalTopics() {
    const [selectedRegion, setSelectedRegion] = useState("all");

    const filteredTopics = selectedRegion === "all"
        ? regionalTopics
        : regionalTopics.filter(topic => topic.affectedRegions.includes(selectedRegion));

    // Ordenar temas por intensidad
    const sortedTopics = [...filteredTopics].sort((a, b) => b.intensity - a.intensity);

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Temas Críticos por Región</CardTitle>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por región" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las regiones</SelectItem>
                            <SelectItem value="Bogotá">Bogotá</SelectItem>
                            <SelectItem value="Medellín">Medellín</SelectItem>
                            <SelectItem value="Cali">Cali</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Gráfico de barras */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardContent className="pt-6">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={sortedTopics}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="name"
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
                                            />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="intensity" fill="hsl(var(--primary))">
                                                {sortedTopics.map((topic, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            topic.intensity >= 70 ? "#ef4444" :
                                                                topic.intensity >= 40 ? "#eab308" :
                                                                    "#22c55e"
                                                        }
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Lista detallada de temas */}
                        <div className="space-y-4">
                            {sortedTopics.map((topic) => (
                                <Card key={topic.id} className="relative">
                                    {topic.intensity >= 70 && (
                                        <div className="absolute -top-2 -right-2">
                                            <Badge variant="destructive" className="flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                Crítico
                                            </Badge>
                                        </div>
                                    )}
                                    <CardContent className="pt-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium">{topic.name}</h3>
                                                <div className="flex items-center gap-1 text-sm">
                                                    {topic.trend === "up" ? (
                                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                                    ) : topic.trend === "down" ? (
                                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                                    ) : (
                                                        <Minus className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                    {topic.changePercent}%
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {topic.description}
                                            </p>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Intensidad</span>
                                                <span className="font-medium">{topic.intensity}%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Sentimiento</span>
                                                <span className="font-medium">{topic.sentiment}%</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 pt-2">
                                                {topic.relatedTopics.map((relatedTopic) => (
                                                    <Badge
                                                        key={relatedTopic}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {relatedTopic}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-1 pt-1">
                                                {topic.affectedRegions.map((region) => (
                                                    <Badge
                                                        key={region}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {region}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}