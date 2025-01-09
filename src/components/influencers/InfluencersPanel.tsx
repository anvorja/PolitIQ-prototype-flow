// src/components/influencers/InfluencersPanel.tsx

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Users,
    MessageSquare,
    Network,
    ThumbsUp,
    Shield,
    TrendingUp,
    History,
    Twitter
} from 'lucide-react';
import { influencersData } from '@/data/InfluencersMockData';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {InfluencerInteractions} from "@/components/influencers/InfluencerInteractions";
import {InfluencerNetwork} from "@/components/influencers/InfluencerNetwork";

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('es-CO').format(num);
};

export function InfluencersPanel() {
    const [selectedType, setSelectedType] = useState<string>("all");

    const filteredInfluencers = selectedType === "all"
        ? influencersData
        : influencersData.filter(inf => inf.type === selectedType);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Influenciadores</h2>
                    <p className="text-muted-foreground">
                        Análisis y seguimiento de actores clave en la conversación política
                    </p>
                </div>
                <div className="flex gap-2">
                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="politician">Políticos</SelectItem>
                            <SelectItem value="analyst">Analistas</SelectItem>
                            <SelectItem value="media">Medios</SelectItem>
                            <SelectItem value="academic">Académicos</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>
                        <Users className="w-4 h-4 mr-2" />
                        Añadir Influenciador
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Influenciadores
                                </p>
                                <p className="text-2xl font-bold">
                                    {filteredInfluencers.length}
                                </p>
                            </div>
                            <Users className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Alcance Total
                                </p>
                                <p className="text-2xl font-bold">
                                    {formatNumber(
                                        filteredInfluencers.reduce((acc, inf) => acc + inf.followers, 0)
                                    )}
                                </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Engagement Promedio
                                </p>
                                <p className="text-2xl font-bold">
                                    {(filteredInfluencers.reduce((acc, inf) => acc + inf.engagement, 0) /
                                        filteredInfluencers.length).toFixed(1)}%
                                </p>
                            </div>
                            <MessageSquare className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Sentimiento Promedio
                                </p>
                                <p className="text-2xl font-bold">
                                    {(filteredInfluencers.reduce((acc, inf) => acc + inf.sentiment, 0) /
                                        filteredInfluencers.length).toFixed(1)}%
                                </p>
                            </div>
                            <ThumbsUp className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="profiles" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profiles" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Perfiles
                    </TabsTrigger>
                    <TabsTrigger value="interactions" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Interacciones
                    </TabsTrigger>
                    <TabsTrigger value="network" className="flex items-center gap-2">
                        <Network className="w-4 h-4" />
                        Red de Relaciones
                    </TabsTrigger>
                    <TabsTrigger value="trends" className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Tendencias
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profiles" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredInfluencers.map((influencer) => (
                            <Card key={influencer.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{influencer.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {influencer.handle}
                                                </p>
                                            </div>
                                            {influencer.verified && (
                                                <Shield className="w-4 h-4 text-blue-500" />
                                            )}
                                        </div>

                                        <div className="text-sm">
                                            <p className="font-medium">{influencer.role}</p>
                                            <p className="text-muted-foreground">
                                                {influencer.type.charAt(0).toUpperCase() +
                                                    influencer.type.slice(1)}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">Seguidores</p>
                                                <p className="font-medium">
                                                    {formatNumber(influencer.followers)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Menciones</p>
                                                <p className="font-medium">
                                                    {formatNumber(influencer.mentions)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Engagement</p>
                                                <p className="font-medium">{influencer.engagement}%</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Sentimiento</p>
                                                <p className="font-medium">{influencer.sentiment}%</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Temas Relevantes:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {influencer.relevantTopics.map((topic) => (
                                                    <span
                                                        key={topic}
                                                        className="text-xs px-2 py-1 rounded-full
                                                        bg-primary/10 text-primary"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-between items-center">
                                            <Button variant="outline" size="sm">
                                                <History className="w-4 h-4 mr-2" />
                                                Historial
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Twitter className="w-4 h-4 mr-2" />
                                                Ver Perfil
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="interactions" className="space-y-4">
                    <InfluencerInteractions />
                </TabsContent>

                <TabsContent value="network" className="space-y-4">
                    <InfluencerNetwork />
                </TabsContent>

                <TabsContent value="trends" className="space-y-4">
                    {/* TODO: Implementar visualización de tendencias en otros componentes */}
                    <Card>
                        <CardContent className="py-6">
                            <div className="text-center text-muted-foreground">
                                <p>Visualización de tendencias en desarrollo</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}