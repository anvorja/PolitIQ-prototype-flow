// src/components/geography/GeographyPanel.tsx

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Map,
    Activity,
    TrendingUp,
    AlertTriangle,
    Calendar,
    Users,
    Brain,
    BarChart3
} from 'lucide-react';

import { CriticalTopics } from '@/components/geography/CriticalTopics';
import {RegionalHeatmap} from "@/components/geography/RegionalHeatmap";
import { VotingIntentionMap } from '@/components/geography/VotingIntentionMap';
import { RegionalNeeds } from '@/components/geography/RegionalNeeds';
import { ElectoralStrengthMap } from '@/components/geography/ElectoralStrengthMap';
import { TerritorialEvents } from '@/components/geography/TerritorialEvents';
import { CompetitorAnalysis } from '@/components/geography/CompetitorAnalysis';
import { AIRecommendations } from '@/components/geography/AIRecommendations';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


export function GeographyPanel() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Análisis Geográfico</h2>
                    <p className="text-muted-foreground">
                        Monitoreo territorial y análisis estratégico por regiones
                    </p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[200px]">
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
                    <Button>
                        <Map className="w-4 h-4 mr-2"/>
                        Exportar Mapa
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="heatmap" className="space-y-4">
                <TabsList className="grid grid-cols-2 lg:grid-cols-8 w-full">
                    <TabsTrigger value="heatmap" className="flex items-center gap-2">
                        <Map className="w-4 h-4"/>
                        Influencia
                    </TabsTrigger>
                    <TabsTrigger value="topics" className="flex items-center gap-2">
                        <Activity className="w-4 h-4"/>
                        Temas
                    </TabsTrigger>
                    <TabsTrigger value="voting" className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4"/>
                        Votación
                    </TabsTrigger>
                    <TabsTrigger value="needs" className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Necesidades
                    </TabsTrigger>
                    <TabsTrigger value="strength" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Electoral
                    </TabsTrigger>
                    <TabsTrigger value="events" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Eventos
                    </TabsTrigger>
                    <TabsTrigger value="competitors" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Competencia
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        IA
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="heatmap">
                    <RegionalHeatmap />
                </TabsContent>

                <TabsContent value="topics">
                    <CriticalTopics />
                </TabsContent>

                <TabsContent value="voting">
                    <VotingIntentionMap />
                </TabsContent>

                <TabsContent value="needs">
                    <RegionalNeeds />
                </TabsContent>

                <TabsContent value="strength">
                    <ElectoralStrengthMap />
                </TabsContent>

                <TabsContent value="events">
                    <TerritorialEvents />
                </TabsContent>

                <TabsContent value="competitors">
                    <CompetitorAnalysis />
                </TabsContent>

                <TabsContent value="ai">
                    <AIRecommendations />
                </TabsContent>
            </Tabs>
        </div>
    );
}