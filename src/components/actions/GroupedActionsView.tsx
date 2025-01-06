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
                                        className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                                        onClick={() => onActionClick(action)}
                                    >
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium">{action.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {action.description}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Badge
                                                        variant={action.priority === 'high' ? 'destructive' :
                                                            action.priority === 'medium' ? 'secondary' : 'outline'}
                                                    >
                                                        {translatePriority(action.priority)}
                                                    </Badge>
                                                    <Badge className={getStatusColor(action.status)}>
                                                        {translateStatus(action.status)}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Límite: {format(new Date(action.deadline), 'PPP', { locale: es })}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users2 className="w-4 h-4" />
                                                    <span>Asignados: {action.assignedTo.length} personas</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>Actualizado: {format(new Date(action.updatedAt), 'PPP', { locale: es })}</span>
                                                </div>
                                            </div>
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