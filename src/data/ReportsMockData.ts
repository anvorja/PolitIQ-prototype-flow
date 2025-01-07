// src/data/ReportsMockData.ts

import { Report } from '@/types/reports';

export const reportTemplates = [
    {
        id: 'executive',
        title: 'Resumen Ejecutivo',
        description: 'Vista general de la campaña con KPIs principales',
        sections: [
            'Métricas Clave',
            'Tendencias de Aprobación',
            'Alertas Principales',
            'Acciones Tomadas'
        ]
    },
    {
        id: 'crisis',
        title: 'Gestión de Crisis',
        description: 'Análisis de situaciones críticas y respuestas',
        sections: [
            'Alertas Críticas',
            'Acciones de Respuesta',
            'Impacto Mediático',
            'Efectividad de Respuesta'
        ]
    },
    {
        id: 'territorial',
        title: 'Análisis Territorial',
        description: 'Desempeño por regiones y departamentos',
        sections: [
            'Mapa de Calor',
            'Temas por Región',
            'Líderes Locales',
            'Eventos Territoriales'
        ]
    },
    {
        id: 'metrics',
        title: 'Métricas de Campaña',
        description: 'Indicadores clave de desempeño de campaña',
        sections: [
            'Alcance Digital',
            'Engagement',
            'Conversión de Mensaje',
            'Efectividad de Propuestas'
        ]
    },
    {
        id: 'competition',
        title: 'Análisis de Competencia',
        description: 'Comparativo con otros candidatos',
        sections: [
            'Share of Voice',
            'Comparativo de Propuestas',
            'Diferenciadores',
            'Oportunidades'
        ]
    }
];

export const mockReports: Report[] = [
    {
        id: '1',
        config: {
            id: 'exec-report-1',
            type: 'executive',
            title: 'Resumen Semanal de Campaña',
            description: 'Análisis general del desempeño de la campaña',
            dateRange: {
                start: '2025-01-01',
                end: '2025-01-07'
            },
            format: 'pdf',
            sections: [
                'Métricas Clave',
                'Tendencias de Aprobación',
                'Alertas Principales',
                'Acciones Tomadas'
            ],
            filters: {
                region: 'nacional',
                includeMetrics: true
            }
        },
        status: 'completed',
        createdAt: '2025-01-08T10:00:00',
        completedAt: '2025-01-08T10:05:00',
        downloadUrl: '/reports/exec-report-1.pdf',
        generatedBy: 'Administrador'
    },
    {
        id: '2',
        config: {
            id: 'crisis-report-1',
            type: 'crisis',
            title: 'Informe de Crisis - Desinformación Reforma',
            description: 'Análisis detallado de la crisis de desinformación sobre la reforma tributaria',
            dateRange: {
                start: '2025-01-05',
                end: '2025-01-06'
            },
            format: 'pdf',
            sections: [
                'Origen de la Crisis',
                'Propagación en Redes',
                'Acciones Tomadas',
                'Impacto en Aprobación',
                'Recomendaciones'
            ]
        },
        status: 'completed',
        createdAt: '2025-01-06T15:00:00',
        completedAt: '2025-01-06T15:10:00',
        downloadUrl: '/reports/crisis-report-1.pdf',
        generatedBy: 'Director de Comunicaciones'
    },
    {
        id: '3',
        config: {
            id: 'territorial-report-1',
            type: 'territorial',
            title: 'Análisis Territorial - Región Caribe',
            description: 'Evaluación completa del desempeño en la región Caribe',
            dateRange: {
                start: '2025-01-01',
                end: '2025-01-15'
            },
            format: 'excel',
            sections: [
                'Aprobación por Departamento',
                'Temas Críticos Locales',
                'Líderes Regionales',
                'Eventos Realizados',
                'Necesidades Identificadas'
            ],
            filters: {
                region: 'caribe',
                departments: ['Atlántico', 'Bolívar', 'Magdalena', 'La Guajira']
            }
        },
        status: 'completed',
        createdAt: '2025-01-16T09:00:00',
        completedAt: '2025-01-16T09:15:00',
        downloadUrl: '/reports/territorial-report-1.xlsx',
        generatedBy: 'Coordinador Regional'
    },
    {
        id: '4',
        config: {
            id: 'metrics-report-1',
            type: 'metrics',
            title: 'Métricas de Campaña Digital',
            description: 'Análisis del desempeño en redes sociales y medios digitales',
            dateRange: {
                start: '2025-01-01',
                end: '2025-01-31'
            },
            format: 'pdf',
            sections: [
                'Alcance en Redes Sociales',
                'Engagement por Plataforma',
                'Efectividad de Hashtags',
                'Mensajes más Exitosos',
                'Demografía de Seguidores'
            ]
        },
        status: 'generating',
        createdAt: '2025-02-01T08:00:00',
        generatedBy: 'Coordinador de Redes Sociales'
    },
    {
        id: '5',
        config: {
            id: 'competition-report-1',
            type: 'competition',
            title: 'Análisis Comparativo de Candidatos',
            description: 'Comparación detallada con principales competidores',
            dateRange: {
                start: '2025-01-01',
                end: '2025-01-31'
            },
            format: 'pdf',
            sections: [
                'Share of Voice',
                'Comparativo de Propuestas',
                'Fortalezas y Debilidades',
                'Oportunidades Identificadas',
                'Amenazas Potenciales'
            ],
            filters: {
                competitors: ['Candidato A', 'Candidato B', 'Candidato C']
            }
        },
        status: 'scheduled',
        createdAt: '2025-01-31T23:00:00',
        generatedBy: 'Analista Político'
    },
    {
        id: '6',
        config: {
            id: 'custom-report-1',
            type: 'custom',
            title: 'Análisis de Propuesta Educativa',
            description: 'Evaluación del impacto y recepción de la propuesta de educación',
            dateRange: {
                start: '2025-01-15',
                end: '2025-01-30'
            },
            format: 'excel',
            sections: [
                'Resumen de la Propuesta',
                'Recepción en Medios',
                'Análisis de Sentimiento',
                'Feedback de Expertos',
                'Comparación con Otras Propuestas',
                'Recomendaciones'
            ],
            filters: {
                topic: 'educación',
                includeMedia: true,
                includeExperts: true
            }
        },
        status: 'failed',
        createdAt: '2025-01-31T14:00:00',
        error: 'Error en la recopilación de datos de medios',
        generatedBy: 'Asesor de Políticas'
    },
    {
        id: '7',
        config: {
            id: 'metrics-report-2',
            type: 'metrics',
            title: 'Efectividad de Eventos Presenciales',
            description: 'Análisis del impacto de eventos y encuentros ciudadanos',
            dateRange: {
                start: '2025-01-01',
                end: '2025-01-31'
            },
            format: 'pdf',
            sections: [
                'Resumen de Eventos',
                'Asistencia y Participación',
                'Impacto en Redes Sociales',
                'Cobertura Mediática',
                'Compromisos Adquiridos',
                'Seguimiento Post-Evento'
            ]
        },
        status: 'completed',
        createdAt: '2025-02-01T10:00:00',
        completedAt: '2025-02-01T10:20:00',
        downloadUrl: '/reports/metrics-report-2.pdf',
        generatedBy: 'Coordinador de Eventos'
    }
];