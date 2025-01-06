// components/alerts/AlertDetailModal.tsx

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    AlertTriangle,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Users,
    MapPin,
    Calendar,
    Users2,
    Hash
} from 'lucide-react';
import type { Alert as AlertType } from '@/types/alerts';
import { formatLongDate } from '@/lib/dateUtils';

interface AlertDetailModalProps {
    alert: AlertType | null;
    onClose: () => void;
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};

export function AlertDetailModal({ alert, onClose }: AlertDetailModalProps) {
    if (!alert) return null;

    return (
        <Dialog open={Boolean(alert)} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        {alert.priority === 'high' && (
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                        )}
                        <DialogTitle>{alert.title}</DialogTitle>
                    </div>
                    <DialogDescription>
                        {alert.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Estadísticas principales */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {alert.reach && (
                            <div className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <Users className="w-4 h-4" />
                                    <span>Alcance</span>
                                </div>
                                <p className="text-2xl font-bold mt-1">
                                    {formatNumber(alert.reach)}
                                </p>
                            </div>
                        )}
                        {alert.sentiment && (
                            <div className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Aprobación</span>
                                </div>
                                <p className="text-2xl font-bold mt-1">
                                    {alert.sentiment}%
                                </p>
                            </div>
                        )}
                        {alert.changePercent && (
                            <div className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    {alert.changePercent > 0 ? (
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-destructive" />
                                    )}
                                    <span>Cambio</span>
                                </div>
                                <p className={`text-2xl font-bold mt-1 ${
                                    alert.changePercent > 0 ? 'text-green-500' : 'text-destructive'
                                }`}>
                                    {Math.abs(alert.changePercent)}%
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Metadatos */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{alert.region || alert.department || alert.city || 'Nacional'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatLongDate(alert.timestamp.split('T')[0])}</span>
                        </div>
                    </div>

                    {/* Keywords */}
                    {alert.keywords && alert.keywords.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium mb-2">Palabras Clave</h4>
                            <div className="flex flex-wrap gap-2">
                                {alert.keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="text-xs px-2 py-1 rounded-full bg-muted flex items-center gap-1"
                                    >
                                        <Hash className="w-3 h-3" />
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Influencers */}
                    {alert.influencers && alert.influencers.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium mb-2">Influenciadores</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {alert.influencers.map((influencer) => (
                                    <div
                                        key={influencer}
                                        className="flex items-center gap-2 p-2 bg-muted rounded-lg text-sm"
                                    >
                                        <Users2 className="w-4 h-4" />
                                        {influencer}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Acciones Recomendadas */}
                    {alert.actions && alert.actions.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium mb-2">Acciones Recomendadas</h4>
                            <div className="space-y-2">
                                {alert.actions.map((action, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2 p-3 bg-muted rounded-lg text-sm"
                                    >
                                        <span className="font-medium">{index + 1}.</span>
                                        <span>{action}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button>
                            Tomar Acción
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}