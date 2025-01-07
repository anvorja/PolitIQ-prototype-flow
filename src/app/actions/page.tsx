// src/app/actions/page.tsx

"use client"

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useActionStore } from "@/store/actionsTakenStore";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    Clock,
    Filter,
    Users2,
    XCircle,
    ArrowDownAZ,
    ArrowUpAZ,
    LayoutGrid,
    LayoutList, Database, Cloud,
} from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ActionStatus, ActionPriority, ActionTask } from "@/types/alertEvents";
import { Button } from "@/components/ui/button";
import { ActionDetailModal } from "@/components/actions/ActionDetailModal";
import { GroupedActionsView } from "@/components/actions/GroupedActionsView";

type SortField = 'deadline' | 'priority' | 'status' | 'createdAt';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'list' | 'grouped';

interface SortConfig {
    field: SortField;
    order: SortOrder;
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

const getStatusIcon = (status: ActionStatus) => ({
    pending: Clock,
    'in-progress': AlertCircle,
    completed: CheckCircle2,
    cancelled: XCircle
})[status];

export default function ActionsPage() {

    const {
        getCurrentActions,
        getCurrentAlerts,
        useMockData,
        toggleDataSource,
        initializeStore
    } = useActionStore();

    // Estado local
    const [statusFilter, setStatusFilter] = useState<ActionStatus | 'all'>('all');
    const [priorityFilter, setPriorityFilter] = useState<ActionPriority | 'all'>('all');
    const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'deadline', order: 'asc' });
    const [selectedAction, setSelectedAction] = useState<ActionTask | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    // Obtener datos actuales
    const actions = getCurrentActions();
    const alerts = getCurrentAlerts();

    // Inicializar store
    React.useEffect(() => {
        initializeStore();
    }, [initializeStore]);

    const sortActions = (a: ActionTask, b: ActionTask) => {
        const order = sortConfig.order === 'asc' ? 1 : -1;

        switch (sortConfig.field) {
            case 'deadline':
                return (new Date(a.deadline).getTime() - new Date(b.deadline).getTime()) * order;
            case 'priority': {
                const priorityOrder: Record<ActionPriority, number> = { high: 0, medium: 1, low: 2 };
                return (priorityOrder[a.priority] - priorityOrder[b.priority]) * order;
            }
            case 'status': {
                const statusOrder: Record<ActionStatus, number> = {
                    pending: 0,
                    'in-progress': 1,
                    completed: 2,
                    cancelled: 3
                };
                return (statusOrder[a.status] - statusOrder[b.status]) * order;
            }
            case 'createdAt':
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
            default:
                return 0;
        }
    };

    const handleSort = (field: SortField) => {
        setSortConfig(current => ({
            field,
            order: current.field === field && current.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredAndSortedActions = actions
        .filter(action => {
            const matchStatus = statusFilter === 'all' || action.status === statusFilter;
            const matchPriority = priorityFilter === 'all' || action.priority === priorityFilter;
            return matchStatus && matchPriority;
        })
        .sort(sortActions);

    const SortButton = ({ field, label }: { field: SortField, label: string }) => (
        <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${sortConfig.field === field ? 'text-primary' : ''}`}
            onClick={() => handleSort(field)}
        >
            {label}
            {sortConfig.field === field && (
                sortConfig.order === 'asc' ? <ArrowUpAZ className="h-4 w-4" /> : <ArrowDownAZ className="h-4 w-4" />
            )}
        </Button>
    );

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Centro de Acciones</h1>
                    <p className="text-muted-foreground">
                        Seguimiento y gestión de acciones tomadas
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleDataSource}
                        className="flex items-center gap-2"
                    >
                        {useMockData ? (
                            <>
                                <Database className="w-4 h-4" />
                                Usando datos de prueba
                            </>
                        ) : (
                            <>
                                <Cloud className="w-4 h-4" />
                                Usando datos reales
                            </>
                        )}
                    </Button>
                    <div className="text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="ml-1 font-medium">{actions.length}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground">Pendientes:</span>
                        <span className="ml-1 font-medium">
                        {actions.filter(a => a.status === 'pending').length}
                    </span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground">Completadas:</span>
                        <span className="ml-1 font-medium">
                        {actions.filter(a => a.status === 'completed').length}
                    </span>
                    </div>
                </div>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4 items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <Select
                                value={statusFilter}
                                onValueChange={(value: ActionStatus | 'all') => setStatusFilter(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filtrar por estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    {['pending', 'in-progress', 'completed', 'cancelled'].map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {translateStatus(status as ActionStatus)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={priorityFilter}
                                onValueChange={(value: ActionPriority | 'all') => setPriorityFilter(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filtrar por prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las prioridades</SelectItem>
                                    {['high', 'medium', 'low'].map((priority) => (
                                        <SelectItem key={priority} value={priority}>
                                            {translatePriority(priority as ActionPriority)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border rounded-md p-1">
                                <Button
                                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="gap-2"
                                >
                                    <LayoutList className="h-4 w-4" />
                                    Lista
                                </Button>
                                <Button
                                    variant={viewMode === 'grouped' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grouped')}
                                    className="gap-2"
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                    Agrupada
                                </Button>
                            </div>
                            <div className="h-6 w-px bg-border" />
                            <div className="flex items-center gap-4">
                                <SortButton field="deadline" label="Fecha límite" />
                                <SortButton field="priority" label="Prioridad" />
                                <SortButton field="status" label="Estado" />
                                <SortButton field="createdAt" label="Fecha de creación" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {viewMode === 'grouped' ? (
                <GroupedActionsView
                    actions={filteredAndSortedActions}
                    alerts={alerts}
                    onActionClick={setSelectedAction}
                />
            ) : (
                <div className="grid gap-4">
                    {filteredAndSortedActions.map(action => {
                        const StatusIcon = getStatusIcon(action.status);
                        return (
                            <Card
                                key={action.id}
                                className="hover:bg-accent/5 transition-colors cursor-pointer"
                                onClick={() => setSelectedAction(action)}
                            >
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                                    {action.title}
                                                    <Badge
                                                        variant={action.priority === 'high' ? 'destructive' :
                                                            action.priority === 'medium' ? 'secondary' : 'outline'}
                                                    >
                                                        {translatePriority(action.priority)}
                                                    </Badge>
                                                </h3>
                                                <p className="text-sm text-muted-foreground">{action.description}</p>
                                            </div>
                                            <Badge
                                                className={`flex items-center gap-1 ${getStatusColor(action.status)}`}
                                            >
                                                <StatusIcon className="w-4 h-4" />
                                                {translateStatus(action.status)}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                <span>Límite: {format(new Date(action.deadline), 'PPP', { locale: es })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Users2 className="w-4 h-4" />
                                                <span>Asignados: {action.assignedTo.length} personas</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span>Creado: {format(new Date(action.createdAt), 'PPP', { locale: es })}</span>
                                            </div>
                                            {action.notes && action.notes.length > 0 && (
                                                <div className="md:col-span-2 text-muted-foreground">
                                                    Notas: {action.notes[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}

                    {filteredAndSortedActions.length === 0 && (
                        <Card>
                            <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
                                No hay acciones que coincidan con los filtros seleccionados
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {selectedAction && (
                <ActionDetailModal
                    action={selectedAction}
                    isOpen={!!selectedAction}
                    onCloseAction={() => setSelectedAction(null)}
                />
            )}
        </div>
    );
}