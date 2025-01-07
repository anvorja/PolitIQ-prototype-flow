// src/components/reports/ReportDetailModal.tsx
"use client"

import React, { useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Report } from '@/types/reports';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    Calendar,
    FileText,
    Clock,
    Calendar as CalendarIcon,
    FileSpreadsheet,
    User,
    ListChecks,
    Share,
    Download,
    Eye
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ReportPreview, ReportPreviewRef } from './ReportPreview';

interface ReportDetailModalProps {
    report: Report | null;
    isOpen: boolean;
    onCloseAction: () => void;
}

const formatIcon = (format: string) => {
    const icons = {
        pdf: FileText,
        excel: FileSpreadsheet,
        csv: FileText
    };
    return icons[format as keyof typeof icons] || FileText;
};

export function ReportDetailModal({ report, isOpen, onCloseAction }: ReportDetailModalProps) {
    const {toast} = useToast();
    const [showPreview, setShowPreview] = React.useState(false);
    const previewRef = useRef<ReportPreviewRef>(null);

    if (!report) return null;

    const IconComponent = formatIcon(report.config.format);

    // Función para manejar la previsualización y generación del PDF
    const handlePDFGeneration = async () => {
        try {
            // Mostrar la previsualización temporalmente
            setShowPreview(true);

            // Esperar a que el componente se monte
            await new Promise(resolve => setTimeout(resolve, 100));

            if (previewRef.current) {
                await previewRef.current.generatePDF();
                toast({
                    title: "PDF generado",
                    description: "Tu reporte ha sido generado exitosamente",
                });
                // Volver a la vista de detalles
                setShowPreview(false);
            } else {
                throw new Error('No se pudo inicializar la generación del PDF');
            }
        } catch (error) {
            console.error('Error generando PDF:', error);
            toast({
                title: "Error en la generación",
                description: "No se pudo generar el PDF. Por favor, intenta nuevamente.",
                variant: "destructive"
            });
            setShowPreview(false);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: report.config.title,
            text: report.config.description || 'Reporte compartido desde PolitIQ',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(
                    `${shareData.title}\n${shareData.text}\n${shareData.url}`
                );
                toast({
                    title: "Enlace copiado",
                    description: "El enlace del reporte ha sido copiado al portapapeles",
                });
            }
        } catch (error) {
            console.error('Error al compartir:', error);
            toast({
                title: "Error al compartir",
                description: "No se pudo compartir el reporte",
                variant: "destructive"
            });
        }
    };

    const handleDownload = async () => {
        try {
            const fileName = report.config.title.toLowerCase().replace(/\s+/g, '-');

            switch (report.config.format) {
                case 'pdf':
                    await handlePDFGeneration();
                    break;

                case 'excel':
                    try {
                        const ExcelJS = (await import('exceljs')).default;
                        const workbook = new ExcelJS.Workbook();

                        // Configurar propiedades del documento
                        workbook.creator = 'PolitIQ';
                        workbook.lastModifiedBy = report.generatedBy;
                        workbook.created = new Date(report.createdAt);
                        workbook.modified = new Date();

                        // Crear hoja de información general
                        const infoSheet = workbook.addWorksheet('Información General');

                        // Añadir información general
                        const rows = [
                            ['Título', report.config.title],
                            ['Descripción', report.config.description || ''],
                            ['Generado por', report.generatedBy],
                            ['Fecha de generación', format(new Date(report.createdAt), 'PPP', {locale: es})],
                            ['Período', `${format(new Date(report.config.dateRange.start), 'PP', {locale: es})} - ${format(new Date(report.config.dateRange.end), 'PP', {locale: es})}`],
                            [''], // Línea en blanco
                            ['Secciones incluidas:']
                        ];

                        // Añadir las filas y aplicar estilos
                        rows.forEach((row, index) => {
                            const rowData = infoSheet.addRow(row);
                            if (index === 0 || index === 6) { // Aplicar estilo a títulos
                                rowData.eachCell(cell => {
                                    cell.font = {bold: true, size: 12};
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: {argb: 'FFE6E6E6'}
                                    };
                                });
                            }
                        });

                        // Añadir secciones a la información
                        report.config.sections.forEach(section => {
                            infoSheet.addRow([section]);
                        });

                        // Aplicar estilos globales
                        infoSheet.getColumn(1).width = 20;
                        infoSheet.getColumn(2).width = 50;

                        // Crear una hoja para cada sección
                        report.config.sections.forEach(section => {
                            const sectionSheet = workbook.addWorksheet(section.slice(0, 31));

                            // Añadir título con estilo
                            const titleRow = sectionSheet.addRow([section]);
                            titleRow.font = {bold: true, size: 14};
                            titleRow.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {argb: 'FFE6E6E6'}
                            };

                            sectionSheet.addRow(['']); // Línea en blanco
                            sectionSheet.addRow(['Contenido de ejemplo para:', section]);

                            // Ajustar ancho de columnas
                            sectionSheet.columns.forEach(column => {
                                column.width = 30;
                            });
                        });

                        // Generar y descargar el archivo
                        const buffer = await workbook.xlsx.writeBuffer();
                        const blob = new Blob([buffer], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${fileName}.xlsx`;
                        link.click();
                        window.URL.revokeObjectURL(url);

                    } catch (error) {
                        console.error('Error generando Excel:', error);
                        toast({
                            title: "Error en la generación",
                            description: "No se pudo generar el archivo Excel",
                            variant: "destructive"
                        });
                        return; // En lugar de throw, usamos return para la salida del CASE
                    }
                    break;

                case 'csv':
                    // Crear contenido CSV
                    const csvRows = [
                        ['Reporte:', report.config.title],
                        ['Descripción:', report.config.description || ''],
                        ['Generado por:', report.generatedBy],
                        ['Fecha de generación:', format(new Date(report.createdAt), 'PPP', {locale: es})],
                        ['Período:', `${format(new Date(report.config.dateRange.start), 'PP', {locale: es})} - ${format(new Date(report.config.dateRange.end), 'PP', {locale: es})}`],
                        [''], // Línea en blanco
                        ['Secciones:'],
                        ...report.config.sections.map(section => [section])
                    ];

                    const csvContent = csvRows.map(row => row.join(',')).join('\n');
                    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${fileName}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    break;
            }

            toast({
                title: "Archivo generado",
                description: "Tu reporte ha sido generado exitosamente",
            });
        } catch (error) {
            console.error('Error al generar el archivo:', error);
            toast({
                title: "Error en la generación",
                description: error instanceof Error ? error.message : "No se pudo generar el reporte",
                variant: "destructive"
            });
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <IconComponent className="w-5 h-5" />
                        {report.config.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Mantener ReportPreview siempre montado pero oculto */}
                    <div className={showPreview ? "block" : "hidden"}>
                        <ReportPreview ref={previewRef} report={report} />
                    </div>

                    {/* Contenido principal */}
                    {!showPreview && (
                        <>
                            {/* Descripción */}
                            {report.config.description && (
                                <p className="text-muted-foreground">
                                    {report.config.description}
                                </p>
                            )}

                            {/* Información General */}
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-4">Información General</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="w-4 h-4" />
                                            <span>Generado por: {report.generatedBy}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span>Creado: {format(new Date(report.createdAt), 'PPP', { locale: es })}</span>
                                        </div>
                                        {report.completedAt && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>Completado: {format(new Date(report.completedAt), 'PPP', { locale: es })}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Rango de Fechas */}
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-4">Rango del Reporte</h3>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">Desde</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {format(new Date(report.config.dateRange.start), 'PPP', { locale: es })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">Hasta</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {format(new Date(report.config.dateRange.end), 'PPP', { locale: es })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Secciones */}
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-4">Secciones Incluidas</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {report.config.sections.map((section, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <ListChecks className="w-4 h-4 text-muted-foreground" />
                                                <span>{section}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    <Separator />

                    {/* Acciones */}
                    <div className="flex justify-end gap-2">
                        {report.status === 'completed' && (
                            <>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={() => setShowPreview(!showPreview)}
                                >
                                    <Eye className="w-4 h-4" />
                                    {showPreview ? 'Ver Detalles' : 'Ver Previsualización'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={handleShare}
                                >
                                    <Share className="w-4 h-4" />
                                    Compartir
                                </Button>
                                <Button
                                    className="flex items-center gap-2"
                                    onClick={handleDownload}
                                >
                                    <Download className="w-4 h-4" />
                                    Descargar {report.config.format.toUpperCase()}
                                </Button>
                            </>
                        )}
                        <Button variant="outline" onClick={onCloseAction}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}