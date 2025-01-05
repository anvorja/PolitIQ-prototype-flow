"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, TrendingUp, TrendingDown, Lightbulb, Bell } from 'lucide-react';
import { alertGroups } from '@/data/AlertsMockData';
import { formatLongDate } from '@/lib/dateUtils';
import type { Alert as AlertType } from '@/types/alerts';

const getAlertIcon = (type: AlertType['type']) => {
    switch (type) {
        case 'crisis':
            return AlertTriangle;
        case 'sentiment':
            return AlertCircle;
        case 'opportunity':
            return Lightbulb;
        case 'trend':
            return TrendingUp;
        default:
            return Bell;
    }
};

const getPriorityClass = (priority: AlertType['priority']) => {
    const baseClasses = "rounded px-2 py-1 text-xs font-medium";
    switch (priority) {
        case 'high':
            return `${baseClasses} bg-destructive/10 text-destructive`;
        case 'medium':
            return `${baseClasses} bg-yellow-500/10 text-yellow-500`;
        case 'low':
            return `${baseClasses} bg-green-500/10 text-green-500`;
        default:
            return `${baseClasses} bg-muted text-muted-foreground`;
    }
};

export function AlertsPanel() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Centro de Alertas</h2>
                    <p className="text-muted-foreground">
                        Gestiona y monitorea las alertas de la campaña
                    </p>
                </div>

                <div className="flex gap-2">
                    {/* Aquí podrían ir filtros o acciones */}
                </div>
            </div>

            {/* Alert Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {alertGroups.map((group) => (
                    <Card key={group.title} className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {group.title}
                                <span className="text-sm bg-muted rounded-full px-2 py-1">
                                    {group.alerts.length}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {group.alerts.map((alert) => {
                                const Icon = getAlertIcon(alert.type);
                                return (
                                    <div
                                        key={alert.id}
                                        className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-start gap-4">
                                            <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className="font-medium">{alert.title}</p>
                                                    <span className={getPriorityClass(alert.priority)}>
                                                        {alert.priority}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-muted-foreground">
                                                    {alert.description}
                                                </p>

                                                {alert.changePercent && (
                                                    <div className={`flex items-center text-sm ${
                                                        alert.changePercent > 0 ? 'text-green-500' : 'text-destructive'
                                                    }`}>
                                                        {alert.changePercent > 0 ? (
                                                            <TrendingUp className="w-4 h-4 mr-1" />
                                                        ) : (
                                                            <TrendingDown className="w-4 h-4 mr-1" />
                                                        )}
                                                        {Math.abs(alert.changePercent)}%
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                                                    <span>{alert.relatedTopic || alert.category}</span>
                                                    <span>{formatLongDate(alert.timestamp.split('T')[0])}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {group.alerts.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No hay alertas
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}