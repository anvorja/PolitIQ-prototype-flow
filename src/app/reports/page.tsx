// src/app/reports/page.tsx

"use client"

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    FileText,
    Download,
    Filter,
    Plus,
    Calendar,
    FileSpreadsheet,
    Clock,
    AlertCircle,
    CheckCircle,
    XCircle,
    RotateCcw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {ReportFormat, ReportStatus, ReportType, Report} from '@/types/reports';
import { mockReports, reportTemplates } from '@/data/ReportsMockData';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";
import {useToast} from "@/hooks/use-toast";
import {NewReportModal, newReportSchema} from "@/components/reports/NewReportModal";
import {z} from "zod";
import {ReportDetailModal} from "@/components/reports/ReportDetailModal";


// Utilidades para traducción y UI
const translateStatus = (status: ReportStatus): string => ({
    generating: 'Generando',
    completed: 'Completado',
    failed: 'Error',
    scheduled: 'Programado'
})[status];

const getStatusColor = (status: ReportStatus): string => ({
    generating: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    scheduled: 'bg-yellow-100 text-yellow-800'
})[status];

const getStatusIcon = (status: ReportStatus) => ({
    generating: RotateCcw,
    completed: CheckCircle,
    failed: XCircle,
    scheduled: Clock
})[status];

const formatIcon = (format: ReportFormat) => ({
    pdf: FileText,
    excel: FileSpreadsheet,
    csv: FileText
})[format];

export default function ReportsPage() {
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
    const [showNewReportModal, setShowNewReportModal] = useState(false);
    const { toast } = useToast();
    const [reports, setReports] = useState(mockReports);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);


    // Filtrar reportes
    const filteredReports = reports
        .filter(report =>
            (typeFilter === 'all' || report.config.type === typeFilter) &&
            (statusFilter === 'all' || report.status === statusFilter)
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const handleCreateReport = async (data: z.infer<typeof newReportSchema>) => {
        try {
            // Validar fechas
            if (data.dateRange.end < data.dateRange.start) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "El rango de fechas no es válido"
                });
                return;
            }

            // Generar ID único
            const reportId = `report-${Date.now()}`;

            // Crear objeto de reporte
            const newReport: Report = {
                id: reportId,
                config: {
                    id: reportId,
                    type: data.type as ReportType,
                    title: data.title,
                    description: data.description,
                    dateRange: {
                        start: data.dateRange.start.toISOString(),
                        end: data.dateRange.end.toISOString()
                    },
                    format: data.format,
                    sections: data.sections,
                },
                status: 'generating',
                createdAt: new Date().toISOString(),
                generatedBy: 'Usuario Actual' // Esto debería venir de un contexto de autenticación
            };

            // Añadir el nuevo reporte a la lista
            setReports(prev => [newReport, ...prev]);

            // Notificar inicio
            toast({
                title: "Reporte en generación",
                description: `Tu reporte "${data.title}" comenzará a generarse en breve.`,
            });

            // Simular proceso de generación
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Actualizar estado del reporte en completado
            setReports(prev => prev.map(report => {
                if (report.id === reportId) {
                    return {
                        ...report,
                        status: 'completed',
                        completedAt: new Date().toISOString(),
                        downloadUrl: `/reports/${reportId}.${data.format}`
                    };
                }
                return report;
            }));

            // Notificar éxito
            toast({
                title: "Reporte generado",
                description: "Tu reporte se ha generado exitosamente.",
                variant: "success"
            });
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error
                    ? error.message
                    : "Hubo un error al generar el reporte. Intenta nuevamente.",
            });
        }
    };

    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Centro de Reportes</h1>
                    <p className="text-muted-foreground">
                        Gestión y generación de reportes de campaña
                    </p>
                </div>

                <Button className="flex items-center gap-2"
                        onClick={() => setShowNewReportModal(true)}
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Reporte
                </Button>
            </div>

            {/* Filtros y Controles */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4 items-center">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <Select
                            value={typeFilter}
                            onValueChange={setTypeFilter}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Tipo de reporte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los tipos</SelectItem>
                                {reportTemplates.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                        {template.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={statusFilter}
                            onValueChange={(value: ReportStatus | 'all') => setStatusFilter(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="completed">Completados</SelectItem>
                                <SelectItem value="generating">En proceso</SelectItem>
                                <SelectItem value="scheduled">Programados</SelectItem>
                                <SelectItem value="failed">Con errores</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Lista de Reportes */}
            <div className="grid gap-4">
                {filteredReports.map((report) => {
                    const StatusIcon = getStatusIcon(report.status);
                    const FormatIcon = formatIcon(report.config.format);

                    return (
                        <Card key={report.id}
                              className="hover:bg-accent/5 transition-colors cursor-pointer"
                              onClick={() => setSelectedReport(report)}>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <FormatIcon className="w-4 h-4 text-muted-foreground" />
                                                <h3 className="font-semibold">
                                                    {report.config.title}
                                                </h3>
                                            </div>
                                            {report.config.description && (
                                                <p className="text-sm text-muted-foreground">
                                                    {report.config.description}
                                                </p>
                                            )}
                                        </div>
                                        <Badge
                                            className={`flex items-center gap-1 ${getStatusColor(report.status)}`}
                                        >
                                            <StatusIcon className="w-4 h-4" />
                                            {translateStatus(report.status)}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {format(new Date(report.createdAt), 'PPP', { locale: es })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <FileText className="w-4 h-4" />
                                            <span>{report.config.sections.length} secciones</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span>Por: {report.generatedBy}</span>
                                        </div>
                                        {report.status === 'completed' && report.downloadUrl && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                Descargar
                                            </Button>
                                        )}
                                        {report.status === 'failed' && report.error && (
                                            <div className="flex items-center gap-2 text-destructive">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{report.error}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                {filteredReports.length === 0 && (
                    <Card>
                        <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
                            No hay reportes que coincidan con los filtros seleccionados
                        </CardContent>
                    </Card>
                )}
            </div>
            <NewReportModal
                isOpen={showNewReportModal}
                onCloseAction={() => setShowNewReportModal(false)}
                onSubmitAction={handleCreateReport}
            />
            <ReportDetailModal
                report={selectedReport}
                isOpen={!!selectedReport}
                onCloseAction={() => setSelectedReport(null)}
            />
        </div>
    );
}