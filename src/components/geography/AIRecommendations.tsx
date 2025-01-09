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
import { Button } from "@/components/ui/button";
import {
    Brain,
    AlertTriangle,
    MessageSquare,
    ArrowRight,
    RefreshCcw,
    Filter,
    Target,
    Workflow
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { aiRecommendations } from '@/data/GeographyMockData';
import {BadgeVariant} from "@/types/uiAIRecomendations";

// Configuración de tipos de recomendación
const RECOMMENDATION_CONFIG = {
    strategy: {
        label: "Estrategia",
        icon: Target,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    action: {
        label: "Acción",
        icon: Workflow,
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    },
    response: {
        label: "Respuesta",
        icon: MessageSquare,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    warning: {
        label: "Advertencia",
        icon: AlertTriangle,
        color: "text-red-500",
        bgColor: "bg-red-500/10"
    }
};

// Configuración de prioridades
const PRIORITY_CONFIG = {
    critical: {
        label: "Crítica",
        color: "text-red-500",
        bgColor: "bg-red-500",
        badge: "destructive" as BadgeVariant
    },
    high: {
        label: "Alta",
        color: "text-orange-500",
        bgColor: "bg-orange-500",
        badge: "secondary" as BadgeVariant
    },
    medium: {
        label: "Media",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500",
        badge: "outline" as BadgeVariant
    },
    low: {
        label: "Baja",
        color: "text-green-500",
        bgColor: "bg-green-500",
        badge: "default" as BadgeVariant
    }
};

export function AIRecommendations() {
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedPriority, setSelectedPriority] = useState<string>("all");

    // Filtrar recomendaciones
    const filteredRecommendations = aiRecommendations.filter(rec => {
        if (selectedType !== "all" && rec.type !== selectedType) return false;
        return !(selectedPriority !== "all" && rec.priority !== selectedPriority);

    });

    // Agrupar por tipo para estadísticas
    const stats = {
        total: filteredRecommendations.length,
        critical: filteredRecommendations.filter(r => r.priority === 'critical').length,
        byType: Object.keys(RECOMMENDATION_CONFIG).reduce((acc, type) => ({
            ...acc,
            [type]: filteredRecommendations.filter(r => r.type === type).length
        }), {} as Record<string, number>)
    };

    return (
        <div className="space-y-4">
            {/* Panel de control */}
            <Card>
                <CardContent className="py-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Filtros:</span>
                            </div>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los tipos</SelectItem>
                                    {Object.entries(RECOMMENDATION_CONFIG).map(([key, config]) => (
                                        <SelectItem key={key} value={key}>
                                            {config.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las prioridades</SelectItem>
                                    {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                                        <SelectItem key={key} value={key}>
                                            {config.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button>
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Actualizar Análisis
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Panel de estadísticas */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">
                                        Total Recomendaciones
                                    </span>
                                    <span className="font-medium">{stats.total}</span>
                                </div>
                                <Progress value={100} className="h-2" />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">
                                        Prioridad Crítica
                                    </span>
                                    <span className="font-medium text-red-500">
                                        {stats.critical}
                                    </span>
                                </div>
                                <Progress
                                    value={(stats.critical / stats.total) * 100}
                                    className="h-2 [&>]:bg-red-500"
                                />
                            </div>

                            <div className="pt-4 border-t space-y-2">
                                {Object.entries(RECOMMENDATION_CONFIG).map(([type, config]) => (
                                    <div
                                        key={type}
                                        className="flex justify-between items-center text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            {React.createElement(config.icon, {
                                                className: `w-4 h-4 ${config.color}`
                                            })}
                                            <span>{config.label}</span>
                                        </div>
                                        <span>{stats.byType[type] || 0}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de recomendaciones */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            Recomendaciones IA
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-4">
                                {filteredRecommendations.map((recommendation) => {
                                    const typeConfig = RECOMMENDATION_CONFIG[recommendation.type];
                                    const priorityConfig = PRIORITY_CONFIG[recommendation.priority];
                                    const TypeIcon = typeConfig.icon;

                                    return (
                                        <Card
                                            key={recommendation.id}
                                            className="hover:shadow-md transition-shadow"
                                        >
                                            <CardContent className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <TypeIcon
                                                                    className={`w-5 h-5 ${typeConfig.color}`}
                                                                />
                                                                <h3 className="font-medium">
                                                                    {recommendation.title}
                                                                </h3>
                                                            </div>
                                                            <Badge
                                                                variant={priorityConfig.badge}
                                                                className="mt-1"
                                                            >
                                                                {priorityConfig.label}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <Brain className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                Confianza: {recommendation.confidence}%
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm">
                                                        {recommendation.description}
                                                    </p>

                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">
                                                            Fundamento:
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {recommendation.rationale}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">
                                                            Acciones Sugeridas:
                                                        </p>
                                                        <div className="space-y-1">
                                                            {recommendation.suggestedActions.map((action, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center gap-2 text-sm"
                                                                >
                                                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                                                    <span>{action}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="pt-2 border-t">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <div>
                                                                <p className="font-medium">
                                                                    Resultado Predicho:
                                                                </p>
                                                                <p className="text-muted-foreground">
                                                                    {recommendation.predictedOutcome}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-muted-foreground">
                                                                    Basado en:
                                                                </p>
                                                                <div className="flex gap-1">
                                                                    {recommendation.relatedData.map((data, index) => (
                                                                        <Badge
                                                                            key={index}
                                                                            variant="secondary"
                                                                            className="text-xs"
                                                                        >
                                                                            {data.category}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}