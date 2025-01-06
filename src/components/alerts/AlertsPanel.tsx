// alerts/AlertsPanel.ts

"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    AlertTriangle,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Lightbulb,
    Bell,
    Map,
    Newspaper,
    Users,
    Share2,
    MapPin,
    Users2
} from 'lucide-react';
import { alertGroups } from '@/data/AlertsMockData';
import { formatLongDate } from '@/lib/dateUtils';
import type { Alert as AlertType } from '@/types/alerts';
import { AlertDetailModal } from "@/components/alerts/AlertDetailModal";

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

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};

export function AlertsPanel() {
    const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(null);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Centro de Alertas</h2>
                    <p className="text-muted-foreground">
                        Monitoreo en tiempo real de situaciones que requieren atención
                    </p>
                </div>

                <div className="flex gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Alcance Total: {formatNumber(alertGroups.reduce((acc, group) =>
                            acc + group.alerts.reduce((sum, alert) => sum + (alert.reach || 0), 0), 0
                        ))}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        <span>Alertas Activas: {alertGroups.reduce((acc, group) => acc + group.alerts.length, 0)}</span>
                    </div>
                </div>
            </div>

            {/* Alert Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alertGroups.map((group) => (
                    <Card key={group.title} className="col-span-1">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    {React.createElement(getAlertIcon(group.type), { className: "w-5 h-5" })}
                                    {group.title}
                                </CardTitle>
                                <span className="text-sm bg-muted rounded-full px-2 py-1">
                                    {group.alerts.length}
                                </span>
                            </div>
                            <CardDescription>{group.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {group.alerts.map((alert) => {
                                const Icon = getAlertIcon(alert.type);
                                return (
                                    <div
                                        key={alert.id}
                                        className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
                                        onClick={() => setSelectedAlert(alert)}
                                    >
                                        <div className="flex items-start gap-4">
                                            <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                {/* Header with Title and Priority */}
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className="font-medium">{alert.title}</p>
                                                    <span className={getPriorityClass(alert.priority)}>
                                                        {alert.priority}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p className="text-sm text-muted-foreground">
                                                    {alert.description}
                                                </p>

                                                {/* Stats Grid */}
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    {alert.reach && (
                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <Users className="w-4 h-4" />
                                                            <span>Alcance: {formatNumber(alert.reach)}</span>
                                                        </div>
                                                    )}
                                                    {alert.sentiment && (
                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <AlertCircle className="w-4 h-4" />
                                                            <span>Aprobación: {alert.sentiment}%</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Change Percent if exists */}
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

                                                {/* Keywords */}
                                                {alert.keywords && alert.keywords.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {alert.keywords.map((keyword) => (
                                                            <span
                                                                key={keyword}
                                                                className="text-xs px-2 py-1 rounded-full bg-muted"
                                                            >
                                                                #{keyword}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Influencers */}
                                                {alert.influencers && alert.influencers.length > 0 && (
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Users2 className="w-4 h-4" />
                                                        <div className="flex gap-2">
                                                            {alert.influencers.map((influencer) => (
                                                                <span key={influencer}>{influencer}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Location and Date */}
                                                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{alert.region || alert.department || alert.city || 'Nacional'}</span>
                                                    </div>
                                                    <span>{formatLongDate(alert.timestamp.split('T')[0])}</span>
                                                </div>

                                                {/* Actions if exist */}
                                                {alert.actions && alert.actions.length > 0 && (
                                                    <div className="mt-3 pt-3 border-t">
                                                        <p className="text-xs font-medium mb-2">Acciones Recomendadas:</p>
                                                        <ul className="text-xs text-muted-foreground space-y-1">
                                                            {alert.actions.map((action, index) => (
                                                                <li key={index} className="flex items-start">
                                                                    <span className="mr-2">•</span>
                                                                    {action}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {group.alerts.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No hay alertas activas
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal de detalles */}
            <AlertDetailModal
                alert={selectedAlert}
                onClose={() => setSelectedAlert(null)}
            />
        </div>
    );
}