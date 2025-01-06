// src/data/AlertsMockData.ts

import { AlertGroup } from '@/types/alerts';

export const alertGroups: AlertGroup[] = [
    {
        title: "Crisis y Ataques",
        description: "Alertas sobre crisis políticas y ataques de opositores",
        type: "crisis",
        alerts: [
            {
                id: "1",
                type: "crisis",
                priority: "high",
                title: "Desinformación sobre propuesta de reforma",
                description: "Se detectó una campaña de desinformación sobre la propuesta de reforma tributaria en redes sociales",
                timestamp: "2025-01-05T10:30:00",
                category: "Desinformación",
                relatedTopic: "Reforma Tributaria",
                changePercent: -15.3,
                region: "Nacional",
                source: "Twitter",
                reach: 250000,
                sentiment: 35,
                actions: [
                    "Emitir comunicado oficial aclaratorio",
                    "Activar campaña de fact-checking",
                    "Coordinar respuesta con aliados mediáticos"
                ],
                keywords: ["impuestos", "reforma", "fake news"],
                influencers: ["@PeriodistaInfluyente", "@LiderOpositor"]
            },
            {
                id: "2",
                type: "crisis",
                priority: "high",
                title: "Críticas a gestión en seguridad",
                description: "Aumento significativo de críticas sobre la gestión en seguridad en Bogotá",
                timestamp: "2025-01-05T09:15:00",
                category: "Seguridad",
                region: "Bogotá",
                changePercent: -12.8,
                reach: 180000,
                sentiment: 42,
                actions: [
                    "Publicar informe de resultados en seguridad",
                    "Coordinar entrevistas con medios locales"
                ]
            }
        ]
    },
    {
        title: "Cambios en Aprobación",
        description: "Alertas sobre cambios significativos en la aprobación",
        type: "sentiment",
        alerts: [
            {
                id: "3",
                type: "sentiment",
                priority: "medium",
                title: "Caída de aprobación en sector juvenil",
                description: "Se registra una disminución en la aprobación entre votantes de 18-25 años",
                timestamp: "2025-01-05T11:45:00",
                category: "Demografía",
                changePercent: -8.5,
                region: "Nacional",
                sentiment: 48,
                actions: [
                    "Reforzar comunicación en redes sociales",
                    "Organizar encuentros con líderes juveniles"
                ],
                keywords: ["jóvenes", "educación", "empleo"]
            },
            {
                id: "4",
                type: "sentiment",
                priority: "medium",
                title: "Mejora en aprobación sector rural",
                description: "Incremento en la aprobación en zonas rurales del departamento",
                timestamp: "2025-01-05T08:20:00",
                category: "Regional",
                region: "Antioquia",
                changePercent: 6.7,
                sentiment: 65
            }
        ]
    },
    {
        title: "Oportunidades",
        description: "Alertas sobre oportunidades políticas detectadas",
        type: "opportunity",
        alerts: [
            {
                id: "5",
                type: "opportunity",
                priority: "medium",
                title: "Alta demanda de información sobre vivienda",
                description: "Incremento significativo en búsquedas sobre programas de vivienda",
                timestamp: "2025-01-05T14:30:00",
                category: "Vivienda",
                changePercent: 23.4,
                region: "Nacional",
                reach: 150000,
                actions: [
                    "Preparar anuncios sobre programa de vivienda",
                    "Coordinar eventos en territorios clave"
                ]
            }
        ]
    },
    {
        title: "Tendencias Emergentes",
        description: "Alertas sobre temas emergentes que requieren atención",
        type: "trend",
        alerts: [
            {
                id: "6",
                type: "trend",
                priority: "medium",
                title: "Aumento en discusión sobre energías renovables",
                description: "Creciente interés en propuestas sobre transición energética",
                timestamp: "2025-01-05T13:15:00",
                category: "Medio Ambiente",
                changePercent: 18.9,
                reach: 120000,
                keywords: ["energía solar", "energía eólica", "transición"]
            }
        ]
    },
    {
        title: "Alertas Regionales",
        description: "Alertas específicas por región",
        type: "regional",
        alerts: [
            {
                id: "7",
                type: "regional",
                priority: "high",
                title: "Tensión social en Valle del Cauca",
                description: "Incremento de protestas por problemas de infraestructura",
                timestamp: "2025-01-05T15:45:00",
                category: "Infraestructura",
                region: "Valle del Cauca",
                city: "Cali",
                changePercent: -10.5,
                actions: [
                    "Convocar reunión con líderes locales",
                    "Preparar plan de respuesta rápida"
                ]
            }
        ]
    },
    {
        title: "Cobertura Mediática",
        description: "Alertas sobre cobertura en medios",
        type: "media",
        alerts: [
            {
                id: "8",
                type: "media",
                priority: "medium",
                title: "Aumento de cobertura negativa en medios nacionales",
                description: "Incremento en artículos críticos sobre política económica",
                timestamp: "2025-01-05T16:20:00",
                category: "Medios",
                region: "Nacional",
                changePercent: -7.8,
                source: "Prensa Nacional",
                reach: 300000,
                actions: [
                    "Coordinar entrevistas con medios clave",
                    "Preparar documento de respuesta"
                ]
            }
        ]
    }
];

