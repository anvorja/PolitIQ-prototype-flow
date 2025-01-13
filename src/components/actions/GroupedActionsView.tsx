// src/components/actions/GroupedActionsView.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
    Users2,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ActionStatus, ActionPriority, ActionTask } from "@/types/alertEvents";
import {Alert} from "@/types/alerts";
import {cn} from "@/lib/utils";

interface GroupedActionsViewProps {
    actions: ActionTask[];
    onActionClick: (action: ActionTask) => void;
    alerts?: Record<string, Alert>;  // Map de alertId -> Alert
}

const translateStatus = (status: ActionStatus): string => ({
    pending: 'Pendiente',
    'in-progress': 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada'
})[status];

const translatePriority = (priority: ActionPriority): string => ({
    high: 'Alta',
    medium: 'Media',
    low: 'Baja'
})[priority];

const getStatusColor = (status: ActionStatus): string => ({
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
})[status];

export function GroupedActionsView({ actions, onActionClick, alerts = {} }: GroupedActionsViewProps) {
    const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set());

    // Agrupar acciones por alertId
    const groupedActions = React.useMemo(() => {
        const groups = new Map<string, ActionTask[]>();

        actions.forEach(action => {
            const currentGroup = groups.get(action.alertId) || [];
            groups.set(action.alertId, [...currentGroup, action]);
        });

        return Array.from(groups.entries()).map(([alertId, groupActions]) => ({
            alertId,
            actions: groupActions,
            title: alerts?.[groupActions[0].alertId]?.title || `Alerta ${groupActions[0].alertId}`,
            totalActions: groupActions.length,
            pendingActions: groupActions.filter(a => a.status === 'pending').length,
            completedActions: groupActions.filter(a => a.status === 'completed').length,
        }));
    }, [actions, alerts]);

    const toggleGroup = (alertId: string) => {
        setExpandedGroups(current => {
            const newSet = new Set(current);
            if (newSet.has(alertId)) {
                newSet.delete(alertId);
            } else {
                newSet.add(alertId);
            }
            return newSet;
        });
    };

    return (
        <div className="space-y-6">
            {groupedActions.map(group => (
                <Card key={group.alertId}>
                    <CardHeader className="cursor-pointer" onClick={() => toggleGroup(group.alertId)}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {expandedGroups.has(group.alertId) ?
                                    <ChevronDown className="w-5 h-5" /> :
                                    <ChevronRight className="w-5 h-5" />
                                }
                                <div>
                                    <CardTitle className="text-lg">{group.title}</CardTitle>
                                    <CardDescription>
                                        <div className="space-y-1">
                                            <div>
                                                {group.totalActions} acciones totales • {group.pendingActions} pendientes • {group.completedActions} completadas
                                            </div>
                                            {alerts?.[group.alertId] && (
                                                <div className="text-sm">
                                                    {alerts[group.alertId].description}
                                                </div>
                                            )}
                                        </div>
                                    </CardDescription>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    {expandedGroups.has(group.alertId) && (
                        <CardContent>
                            <div className="space-y-4">
                                {group.actions.map(action => (
                                    <div
                                        key={action.id}
                                        className={cn(
                                            "p-4 rounded-lg border",
                                            "bg-card hover:bg-accent/5",
                                            "transition-all duration-200 cursor-pointer",
                                            "group" // Añadimos grupo para efectos hover
                                        )}
                                        onClick={() => onActionClick(action)}
                                    >
                                        <div className="space-y-4">
                                            {/* Header con título y badges */}
                                            <div className="flex justify-between items-start gap-4">
                                                <div
                                                    className="min-w-0 flex-1"> {/* Añadimos min-w-0 y flex-1 para manejar el overflow */}
                                                    <h4 className="font-medium truncate">{action.title}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                                        {action.description}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 flex-shrink-0"> {/* flex-shrink-0 para mantener los badges */}
                                                    <Badge
                                                        variant={action.priority === 'high' ? 'destructive' :
                                                            action.priority === 'medium' ? 'secondary' : 'outline'}
                                                        className="transition-colors duration-200"
                                                    >
                                                        {translatePriority(action.priority)}
                                                    </Badge>
                                                    <Badge className={cn(
                                                        getStatusColor(action.status),
                                                        "transition-colors duration-200"
                                                    )}>{translateStatus(action.status)}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Notas (si existen) */}
                                            {action.notes && action.notes.length > 0 && (
                                                <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-2">
                                                    <div className={cn(
                                                        "flex items-start gap-2",  // Cambiamos a flex para mejor alineación
                                                        "line-clamp-2",
                                                        "text-ellipsis overflow-hidden",
                                                        "break-all", // Cambiamos a break-all para manejar mejor las cadenas largas sin espacios
                                                        "max-w-full"
                                                    )}>
                                                        <span className="font-medium flex-shrink-0">Notas:</span>
                                                        <span className="break-all">{action.notes[0]}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">
                                                        Límite: {format(new Date(action.deadline), 'PP', { locale: es })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users2 className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">
                                                        {action.assignedTo.length} {action.assignedTo.length === 1 ? 'persona' : 'personas'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">
                                                        Creado: {format(new Date(action.createdAt), 'PP', { locale: es })}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Hover Action Indicator */}
                                            <div className={cn(
                                                "h-1 w-0 bg-primary mt-2 rounded-full",
                                                "transition-all duration-300",
                                                "group-hover:w-full"
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    );
}