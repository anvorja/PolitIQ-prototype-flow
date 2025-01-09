// src/components/geography/RegionalNeeds.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Clock,
    Filter,
    Users,
    Building2
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { regionalNeeds } from '@/data/GeographyMockData';
import {BadgeVariant} from "@/types/uiAIRecomendations";

// Configuración de colores y estilos por prioridad
const PRIORITY_CONFIG = {
    high: {
        color: "text-red-500",
        bgColor: "bg-red-500",
        badge: "destructive" as BadgeVariant,
        icon: AlertTriangle
    },
    medium: {
        color: "text-yellow-500",
        bgColor: "bg-yellow-500",
        badge: "secondary" as BadgeVariant,
        icon: Clock
    },
    low: {
        color: "text-green-500",
        bgColor: "bg-green-500",
        badge: "default" as BadgeVariant,
        icon: CheckCircle2
    },
    critical: {  // Agregar esta configuración también
        color: "text-red-700",
        bgColor: "bg-red-700",
        badge: "destructive" as BadgeVariant,
        icon: AlertTriangle
    }
};

// Configuración de estados
const STATUS_CONFIG = {
    pending: {
        label: "Pendiente",
        color: "text-red-500",
        icon: AlertTriangle
    },
    "in-progress": {
        label: "En Progreso",
        color: "text-yellow-500",
        icon: Clock
    },
    addressed: {
        label: "Atendido",
        color: "text-green-500",
        icon: CheckCircle2
    }
};

export function RegionalNeeds() {
    const [selectedRegion, setSelectedRegion] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedPriority, setSelectedPriority] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    // Obtener categorías únicas
    const categories = Array.from(new Set(regionalNeeds.map(need => need.category)));

    // Filtrar necesidades según selecciones
    const filteredNeeds = regionalNeeds.filter(need => {
        if (selectedRegion !== "all" && need.region !== selectedRegion) return false;
        if (selectedCategory !== "all" && need.category !== selectedCategory) return false;
        if (selectedPriority !== "all" && need.priority !== selectedPriority) return false;
        return !(selectedStatus !== "all" && need.status !== selectedStatus);

    });

    // Calcular estadísticas
    const stats = {
        total: filteredNeeds.length,
        pending: filteredNeeds.filter(n => n.status === 'pending').length,
        inProgress: filteredNeeds.filter(n => n.status === 'in-progress').length,
        addressed: filteredNeeds.filter(n => n.status === 'addressed').length,
        highPriority: filteredNeeds.filter(n => n.priority === 'high').length
    };

    return (
        <div className="space-y-4">
            {/* Filtros */}
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
                                <SelectItem value="all">Todas las regiones</SelectItem>
                                {Array.from(new Set(regionalNeeds.map(need => need.region)))
                                    .map(region => (
                                        <SelectItem key={region} value={region}>
                                            {region}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las categorías</SelectItem>
                                {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                        {category}
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
                                <SelectItem value="critical">Crítica</SelectItem>
                                <SelectItem value="high">Alta</SelectItem>
                                <SelectItem value="medium">Media</SelectItem>
                                <SelectItem value="low">Baja</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="pending">Pendiente</SelectItem>
                                <SelectItem value="in-progress">En Progreso</SelectItem>
                                <SelectItem value="addressed">Atendido</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Grid de contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Panel de estadísticas */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Total</span>
                                    <span className="font-medium">{stats.total}</span>
                                </div>
                                <Progress
                                    value={100}
                                    className="h-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Pendientes</span>
                                    <span className="font-medium text-red-500">{stats.pending}</span>
                                </div>
                                <Progress
                                    value={(stats.pending / stats.total) * 100}
                                    className="h-2 bg-muted [&>div]:bg-red-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">En Progreso</span>
                                    <span className="font-medium text-yellow-500">{stats.inProgress}</span>
                                </div>
                                <Progress
                                    value={(stats.inProgress / stats.total) * 100}
                                    className="h-2 bg-muted [&>div]:bg-yellow-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Atendidas</span>
                                    <span className="font-medium text-green-500">{stats.addressed}</span>
                                </div>
                                <Progress
                                    value={(stats.addressed / stats.total) * 100}
                                    className="h-2 bg-muted [&>div]:bg-green-500"
                                />
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Alta Prioridad</span>
                                    <Badge variant="destructive">
                                        {stats.highPriority}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de necesidades */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Necesidades Regionales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-4">
                                {filteredNeeds.map((need) => {
                                    const priorityConfig = PRIORITY_CONFIG[need.priority];
                                    const statusConfig = STATUS_CONFIG[need.status];
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <Card key={need.id} className="relative hover:shadow-md transition-shadow">
                                            <CardContent className="pt-6">
                                                <div className="absolute -top-2 -right-2">
                                                    <Badge variant={priorityConfig.badge}>
                                                        {need.priority.toUpperCase()}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium">{need.region}</h3>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Building2 className="w-4 h-4" />
                                                                {need.category}
                                                            </div>
                                                        </div>
                                                        <div className={`flex items-center gap-1 ${statusConfig.color}`}>
                                                            <StatusIcon className="w-4 h-4" />
                                                            <span className="text-sm">{statusConfig.label}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm">{need.description}</p>

                                                    <div className="flex justify-between items-center text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4 text-muted-foreground" />
                                                            <span>
                                                                {need.affectedPopulation.toLocaleString()} afectados
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-muted-foreground">Impacto:</span>
                                                            <span className="font-medium">{need.impact}%</span>
                                                        </div>
                                                    </div>

                                                    {need.proposedSolutions && (
                                                        <div className="pt-2 border-t">
                                                            <p className="text-sm font-medium mb-2">
                                                                Soluciones Propuestas:
                                                            </p>
                                                            <div className="space-y-1">
                                                                {need.proposedSolutions.map((solution, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex items-center gap-2 text-sm"
                                                                    >
                                                                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                                                        <span>{solution}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
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