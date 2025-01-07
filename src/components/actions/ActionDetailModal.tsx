"use client"

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertCircle,
    Bell,
    Calendar,
    Clock,
    Users2,
    MessageCircle,
    Link as LinkIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import {ActionStatus, ActionTask} from '@/types/alertEvents';
import { useActionStore } from "@/store/actionsTakenStore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ActionDetailModalProps {
    action: ActionTask;
    isOpen: boolean;
    onCloseAction: () => void;
}

const translatePriority = (priority: string) => ({
    high: 'Alta',
    medium: 'Media',
    low: 'Baja'
})[priority];

export function ActionDetailModal({ action, isOpen, onCloseAction }: ActionDetailModalProps) {
    const updateAction = useActionStore(state => state.updateAction);

    const handleStatusChange = (newStatus: ActionStatus) => {
        updateAction(action.id, {
            status: newStatus,
            updatedAt: new Date().toISOString()
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <DialogTitle className="text-2xl font-bold">
                            {action.title}
                        </DialogTitle>
                        <Badge
                            variant={action.priority === 'high' ? 'destructive' :
                                action.priority === 'medium' ? 'secondary' : 'outline'}
                        >
                            {translatePriority(action.priority)}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Estado actual y acciones */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Estado Actual</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Select
                                    value={action.status}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Cambiar estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pendiente</SelectItem>
                                        <SelectItem value="in-progress">En Progreso</SelectItem>
                                        <SelectItem value="completed">Completada</SelectItem>
                                        <SelectItem value="cancelled">Cancelada</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">
                                    Última actualización: {format(new Date(action.updatedAt), 'PPP', { locale: es })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información general */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <p className="text-sm">{action.description}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <span>Fecha límite: {format(new Date(action.deadline), 'PPP', { locale: es })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span>Creada: {format(new Date(action.createdAt), 'PPP', { locale: es })}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Participantes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users2 className="w-5 h-5" />
                                Participantes Asignados
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {action.assignedTo.map((participant) => (
                                    <div
                                        key={participant.id}
                                        className="p-3 bg-muted rounded-lg"
                                    >
                                        <p className="font-medium">{participant.name}</p>
                                        <p className="text-sm text-muted-foreground">{participant.role}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notas */}
                    {action.notes && action.notes.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Notas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {action.notes.map((note, index) => (
                                        <div key={index} className="p-3 bg-muted rounded-lg">
                                            <p className="text-sm">{note}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Alerta Relacionada */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Alerta Relacionada
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link
                                href={`/alerts?id=${action.alertId}`}
                                className="p-3 bg-muted rounded-lg flex items-center justify-between hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Ver alerta original</span>
                                </div>
                                <LinkIcon className="w-4 h-4" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}