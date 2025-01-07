// src/components/reports/ReportPreview.tsx
"use client"

import React, { forwardRef, useImperativeHandle } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Report } from '@/types/reports';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReportPreviewProps {
    report: Report;
}

export type ReportPreviewRef = {
    generatePDF: () => Promise<void>;
};

export const ReportPreview = forwardRef<ReportPreviewRef, ReportPreviewProps>(({ report }, ref) => {
    const previewRef = React.useRef<HTMLDivElement>(null);

    const generatePDF = async () => {
        if (!previewRef.current) return;

        try {
            // Crear el PDF
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Capturar el contenido HTML como imagen
            const canvas = await html2canvas(previewRef.current, {
                scale: 2, // Mejor calidad
                useCORS: true,
                logging: false
            });

            // Ajustar dimensiones
            const imgWidth = 210; // A4 width
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Añadir la imagen al PDF
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Añadir pie de página
            pdf.setFontSize(10);
            pdf.text(
                `Generado por PolitIQ - ${format(new Date(), 'PPP', { locale: es })}`,
                pdf.internal.pageSize.getWidth() / 2,
                pdf.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );

            // Descargar el PDF
            pdf.save(`${report.config.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        } catch (error) {
            console.error('Error generando PDF:', error);
            throw new Error('No se pudo generar el PDF');
        }
    };

    // Exponer el método generatePDF al componente padre
    useImperativeHandle(ref, () => ({
        generatePDF
    }));

    return (
        <div ref={previewRef} className="p-8 bg-white">
            {/* Encabezado */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">{report.config.title}</h1>
                <p className="text-muted-foreground">{report.config.description}</p>
            </div>

            {/* Información General */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <h2 className="text-lg font-semibold mb-4">Información General</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Generado por:</span> {report.generatedBy}
                        </div>
                        <div>
                            <span className="font-medium">Fecha de generación:</span>{' '}
                            {format(new Date(report.createdAt), 'PPP', { locale: es })}
                        </div>
                        <div>
                            <span className="font-medium">Período del reporte:</span>{' '}
                            {format(new Date(report.config.dateRange.start), 'PP', { locale: es })} -{' '}
                            {format(new Date(report.config.dateRange.end), 'PP', { locale: es })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Secciones */}
            {report.config.sections.map((section, index) => (
                <Card key={index} className="mb-6">
                    <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">{section}</h2>
                        <div className="text-muted-foreground">
                            {/* Aquí iría el contenido real de cada sección */}
                            Contenido de la sección {section}
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Pie de página */}
            <div className="text-sm text-muted-foreground text-center mt-8 pt-4 border-t">
                <p>Documento generado por PolitIQ - {format(new Date(), 'PPP', { locale: es })}</p>
            </div>
        </div>
    );
});

ReportPreview.displayName = 'ReportPreview';