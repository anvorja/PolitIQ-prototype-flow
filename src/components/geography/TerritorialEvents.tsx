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
    Calendar,
    CheckCircle2,
    Clock,
    Filter,
    MapPin,
    Plus,
    Users,
    XCircle,
    Calendar as CalendarIcon,
    ThumbsUp
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { territorialEvents } from '@/data/GeographyMockData';

// Configuración de estados de eventos
const EVENT_STATUS_CONFIG = {
    scheduled: {
        label: "Programado",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        icon: Calendar
    },
    "in-progress": {
        label: "En Curso",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        icon: Clock
    },
    completed: {
        label: "Completado",
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        icon: CheckCircle2
    },
    cancelled: {
        label: "Cancelado",
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        icon: XCircle
    }
};

// Configuración de tipos de eventos
const EVENT_TYPE_CONFIG = {
    rally: {
        label: "Manifestación",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    meeting: {
        label: "Reunión",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    debate: {
        label: "Debate",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10"
    },
    community: {
        label: "Comunitario",
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    },
    other: {
        label: "Otro",
        color: "text-gray-500",
        bgColor: "bg-gray-500/10"
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export function TerritorialEvents() {
    const [selectedRegion, setSelectedRegion] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    // Filtrar eventos
    const filteredEvents = territorialEvents.filter(event => {
        if (selectedRegion !== "all" && event.location.region !== selectedRegion) return false;
        if (selectedType !== "all" && event.type !== selectedType) return false;
        return !(selectedStatus !== "all" && event.status !== selectedStatus);

    });

    // Agrupar eventos por estado
    const eventsByStatus = {
        scheduled: filteredEvents.filter(e => e.status === 'scheduled'),
        inProgress: filteredEvents.filter(e => e.status === 'in-progress'),
        completed: filteredEvents.filter(e => e.status === 'completed'),
        cancelled: filteredEvents.filter(e => e.status === 'cancelled')
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
                            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Región" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las regiones</SelectItem>
                                    {Array.from(new Set(territorialEvents.map(e => e.location.region)))
                                        .map(region => (
                                            <SelectItem key={region} value={region}>
                                                {region}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los tipos</SelectItem>
                                    {Object.entries(EVENT_TYPE_CONFIG).map(([key, config]) => (
                                        <SelectItem key={key} value={key}>
                                            {config.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    {Object.entries(EVENT_STATUS_CONFIG).map(([key, config]) => (
                                        <SelectItem key={key} value={key}>
                                            {config.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Evento
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Grid de eventos */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Programados */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-500" />
                                Programados
                            </CardTitle>
                            <Badge variant="secondary">
                                {eventsByStatus.scheduled.length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-4">
                                {eventsByStatus.scheduled.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* En Curso */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-yellow-500" />
                                En Curso
                            </CardTitle>
                            <Badge variant="secondary">
                                {eventsByStatus.inProgress.length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-4">
                                {eventsByStatus.inProgress.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Completados */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                Completados
                            </CardTitle>
                            <Badge variant="secondary">
                                {eventsByStatus.completed.length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-4">
                                {eventsByStatus.completed.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Cancelados */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-red-500" />
                                Cancelados
                            </CardTitle>
                            <Badge variant="secondary">
                                {eventsByStatus.cancelled.length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-4">
                                {eventsByStatus.cancelled.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Componente de tarjeta de evento
function EventCard({ event }: { event: typeof territorialEvents[0] }) {
    const typeConfig = EVENT_TYPE_CONFIG[event.type];
    const statusConfig = EVENT_STATUS_CONFIG[event.status];
    const StatusIcon = statusConfig.icon;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                {event.location.venue}
                            </div>
                        </div>
                        <Badge
                            variant="secondary"
                            className={`${typeConfig.color} ${typeConfig.bgColor}`}
                        >
                            {typeConfig.label}
                        </Badge>
                    </div>

                    <p className="text-sm">{event.description}</p>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{event.expectedAttendance.toLocaleString()}</span>
                        </div>
                    </div>

                    {event.outcomes && (
                        <div className="pt-2 border-t space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Asistencia Real:</span>
                                <span>{event.outcomes.actualAttendance.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Sentimiento:</span>
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{event.outcomes.sentiment}%</span>
                                </div>
                            </div>
                            {event.outcomes.keyTakeaways.length > 0 && (
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground">
                                        Conclusiones Clave:
                                    </span>
                                    <ul className="text-sm space-y-1">
                                        {event.outcomes.keyTakeaways.map((takeaway, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                {takeaway}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            {event.organizer}
                        </span>
                        <div className={`flex items-center gap-1 ${statusConfig.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="text-sm">{statusConfig.label}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}