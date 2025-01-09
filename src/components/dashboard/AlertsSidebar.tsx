"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertTriangle,
    AlertCircle,
    TrendingUp,
    Lightbulb,
    Bell,
    ExternalLink,
    Map,
    Newspaper
} from 'lucide-react';
import { alertGroups } from '@/data/AlertsMockData';
import { formatShortDate } from '@/lib/dateUtils';
import type { Alert as AlertType } from '@/types/alerts';
import Link from 'next/link';

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
        case 'regional':
            return Map;
        case 'media':
            return Newspaper;
        default:
            return Bell;
    }
};

const getPriorityColor = (priority: AlertType['priority']) => {
    switch (priority) {
        case 'high':
            return 'text-destructive';
        case 'medium':
            return 'text-yellow-500';
        case 'low':
            return 'text-green-500';
        default:
            return 'text-muted-foreground';
    }
};

export function AlertsSidebar() {
    // Obtenemos todas las alertas de todos los grupos
    const allAlerts = alertGroups.flatMap(group => group.alerts);

    // Ordenamos por prioridad y fecha
    const recentAlerts = allAlerts
        .sort((a, b) => {
            // Primero por prioridad
            const priorityOrder: Record<AlertType['priority'], number> = {
                high: 0,
                medium: 1,
                low: 2
            };
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0) return priorityDiff;
            // Luego por fecha, más reciente primero
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        })
        .slice(0, 5); // Solo mostramos las 5 más recientes

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Alertas Recientes</CardTitle>
                <Link
                    href="/alerts"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                    Ver todas
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </CardHeader>
            <CardContent className="space-y-4">
                {recentAlerts.map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                        <div
                            key={alert.id}
                            className="flex items-start gap-3 p-3 rounded-lg
                                bg-gray-50 hover:bg-gray-100
                                dark:bg-muted/10 dark:hover:bg-accent/10
                                border border-border/40 hover:border-border/80
                                dark:border-border/20 dark:hover:border-border/40
                                transition-all cursor-pointer"
                        >
                            <div className={getPriorityColor(alert.priority)}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                    {alert.title}
                                </p>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {alert.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{alert.relatedTopic || alert.category}</span>
                                    <span>{formatShortDate(alert.timestamp.split('T')[0])}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {recentAlerts.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                        No hay alertas nuevas
                    </p>
                )}
            </CardContent>
        </Card>
    );
}