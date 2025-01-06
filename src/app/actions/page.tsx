// src/app/actions/page.tsx

// "use client"
//
// import { format } from 'date-fns';
// import { es } from 'date-fns/locale';
// import {useActionStore} from "@/store/actionsTakenStore";
//
// export default function ActionsPage() {
//     const actions = useActionStore(state => state.actions);
//
//     return (
//         <div className="container mx-auto py-6">
//             <h1 className="text-2xl font-bold mb-6">Seguimiento de Acciones</h1>
//
//             <div className="grid gap-4">
//                 {actions.map(action => (
//                     <div
//                         key={action.id}
//                         className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                     >
//                         <div className="flex justify-between items-start mb-2">
//                             <h3 className="text-lg font-semibold">{action.title}</h3>
//                             <span className={`px-2 py-1 rounded text-sm ${
//                                 action.priority === 'high' ? 'bg-red-100 text-red-800' :
//                                     action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//                                         'bg-green-100 text-green-800'
//                             }`}>
//                                 {action.priority === 'high' ? 'Alta' :
//                                     action.priority === 'medium' ? 'Media' : 'Baja'}
//                             </span>
//                         </div>
//
//                         <p className="text-gray-600 mb-2">{action.description}</p>
//
//                         <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
//                             <div>Fecha límite: {format(new Date(action.deadline), 'PPP', { locale: es })}</div>
//                             <div>Estado: {action.status}</div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

"use client"

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useActionStore } from "@/store/actionsTakenStore";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ActionStatus } from "@/types/alertEvents";

// Función auxiliar para obtener el color según el estado
const getStatusColor = (status: ActionStatus) => {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status];
};

// Función auxiliar para traducir el estado
const translateStatus = (status: ActionStatus) => {
    const translations = {
        'pending': 'Pendiente',
        'in-progress': 'En Progreso',
        'completed': 'Completada',
        'cancelled': 'Cancelada'
    };
    return translations[status];
};

// Función para obtener el ícono según el estado
const getStatusIcon = (status: ActionStatus) => {
    const icons = {
        'pending': Clock,
        'in-progress': AlertCircle,
        'completed': CheckCircle2,
        'cancelled': XCircle
    };
    return icons[status];
};

export default function ActionsPage() {
    const actions = useActionStore(state => state.actions);
    const [statusFilter, setStatusFilter] = useState<ActionStatus | 'all'>('all');
    const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

    // Filtrar acciones
    const filteredActions = actions.filter(action => {
        const matchStatus = statusFilter === 'all' || action.status === statusFilter;
        const matchPriority = priorityFilter === 'all' || action.priority === priorityFilter;
        return matchStatus && matchPriority;
    });

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Centro de Acciones</h1>
                    <p className="text-muted-foreground">
                        Seguimiento y gestión de acciones tomadas
                    </p>
                </div>

                {/* Estadísticas resumidas */}
                <div className="flex gap-4">
                    <div className="text-sm">
                        <span className="text-muted-foreground">Total Acciones:</span>
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

            {/* Filtros */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4 items-center">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <div className="flex gap-4">
                            <Select
                                value={statusFilter}
                                onValueChange={(value: ActionStatus | 'all') => setStatusFilter(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filtrar por estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    <SelectItem value="pending">Pendientes</SelectItem>
                                    <SelectItem value="in-progress">En Progreso</SelectItem>
                                    <SelectItem value="completed">Completadas</SelectItem>
                                    <SelectItem value="cancelled">Canceladas</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={priorityFilter}
                                onValueChange={(value: 'all' | 'high' | 'medium' | 'low') => setPriorityFilter(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filtrar por prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las prioridades</SelectItem>
                                    <SelectItem value="high">Alta</SelectItem>
                                    <SelectItem value="medium">Media</SelectItem>
                                    <SelectItem value="low">Baja</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Lista de Acciones */}
            <div className="grid gap-4">
                {filteredActions.map(action => {
                    const StatusIcon = getStatusIcon(action.status);
                    return (
                        <Card key={action.id} className="hover:bg-accent/5 transition-colors">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="flex items-center gap-2">
                                            {action.title}
                                            <Badge
                                                variant={action.priority === 'high' ? 'destructive' :
                                                    action.priority === 'medium' ? 'secondary' : 'outline'}
                                            >
                                                {action.priority === 'high' ? 'Alta' :
                                                    action.priority === 'medium' ? 'Media' : 'Baja'}
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription>{action.description}</CardDescription>
                                    </div>
                                    <Badge
                                        className={`flex items-center gap-1 ${getStatusColor(action.status)}`}
                                    >
                                        <StatusIcon className="w-4 h-4" />
                                        {translateStatus(action.status)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>Límite: {format(new Date(action.deadline), 'PPP', { locale: es })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users2 className="w-4 h-4" />
                                        <span>Asignados: {action.assignedTo.length} personas</span>
                                    </div>
                                    {action.notes && action.notes.length > 0 && (
                                        <div className="col-span-2 text-muted-foreground">
                                            Notas: {action.notes[0]}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                {filteredActions.length === 0 && (
                    <Card>
                        <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
                            No hay acciones que coincidan con los filtros seleccionados
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}