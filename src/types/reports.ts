// src/types/reports.ts

export type ReportType =
    | 'executive'     // Resumen ejecutivo
    | 'crisis'        // Gestión de crisis
    | 'territorial'   // Análisis territorial
    | 'metrics'       // Métricas de campaña
    | 'competition'   // Análisis de competencia
    | 'custom';       // Personalizado

export type ReportFormat = 'pdf' | 'excel' | 'csv';

export type ReportStatus = 'generating' | 'completed' | 'failed' | 'scheduled';

// Definir tipos específicos para los filtros
export type ReportFilter = {
    region?: string;
    departments?: string[];
    includeMetrics?: boolean;
    competitors?: string[];
    topic?: string;
    includeMedia?: boolean;
    includeExperts?: boolean;
    [key: string]: unknown;
};

export interface ReportConfig {
    id: string;
    type: ReportType;
    title: string;
    description?: string;
    dateRange: {
        start: string;
        end: string;
    };
    format: ReportFormat;
    sections: string[];
    filters?: ReportFilter;
}

export interface Report {
    id: string;
    config: ReportConfig;
    status: ReportStatus;
    createdAt: string;
    completedAt?: string;
    downloadUrl?: string;
    error?: string;
    generatedBy: string;
}