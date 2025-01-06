// types/alertEvents.ts

import { AlertType } from "@/types/alerts";

export type ActionStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export type ActionPriority = 'high' | 'medium' | 'low';

export type ActionType =
    | 'emergency-meeting'    // Reunión de emergencia
    | 'press-release'        // Comunicado de prensa
    | 'social-media'         // Respuesta en redes sociales
    | 'engagement-event'     // Evento de acercamiento
    | 'message-adjustment'   // Ajuste de mensajes
    | 'monitoring'          // Monitoreo específico
    | 'coordination'        // Coordinación con aliados
    | 'legal'              // Acción legal
    | 'custom';            // Acción personalizada

export interface ActionParticipant {
    id: string;
    name: string;
    role: string;
    email: string;
}

export interface ActionResponse {
    id: string;
    platform: string;
    content: string;
    status: 'draft' | 'approved' | 'published';
    publishDate?: string;
    responsibleUser: string;
    approvedBy?: string;
}

export interface ActionTask {
    id: string;
    alertId: string;
    type: ActionType;
    title: string;
    description: string;
    priority: ActionPriority;
    status: ActionStatus;
    createdAt: string;
    updatedAt: string;
    deadline: string;
    assignedTo: ActionParticipant[];
    responses: ActionResponse[];
    notes: string[];
    relatedDocuments?: string[];
    budget?: number;
    results?: {
        reach?: number;
        engagement?: number;
        sentiment?: number;
        effectiveness?: number;
    };
}

export const ACTION_CONFIG: Record<AlertType, {
    title: string;
    description: string;
    availableActions: {
        id: ActionType;
        label: string;
        description: string;
        requiredRoles?: string[];
    }[];
}> = {
    crisis: {
        title: "Acciones de Crisis",
        description: "Respuestas inmediatas para situaciones críticas",
        availableActions: [
            {
                id: 'emergency-meeting',
                label: 'Convocar Reunión de Emergencia',
                description: 'Reunión urgente con equipo clave para definir estrategia',
                requiredRoles: ['director', 'communications', 'strategy']
            },
            {
                id: 'press-release',
                label: 'Preparar Comunicado de Prensa',
                description: 'Elaborar y distribuir comunicado oficial',
                requiredRoles: ['communications', 'legal']
            },
            {
                id: 'social-media',
                label: 'Respuesta en Redes Sociales',
                description: 'Preparar y ejecutar estrategia de respuesta en redes sociales',
                requiredRoles: ['social-media', 'communications']
            }
        ]
    },
    sentiment: {
        title: "Acciones de Gestión de Aprobación",
        description: "Estrategias para mejorar la percepción",
        availableActions: [
            {
                id: 'engagement-event',
                label: 'Programar Evento de Acercamiento',
                description: 'Organizar evento para conectar con la comunidad'
            },
            {
                id: 'message-adjustment',
                label: 'Ajustar Mensajes de Campaña',
                description: 'Refinar la estrategia de comunicación'
            },
            {
                id: 'monitoring',
                label: 'Monitoreo Especial',
                description: 'Implementar seguimiento detallado de la percepción'
            }
        ]
    },
    opportunity: {
        title: "Acciones de Oportunidad",
        description: "Acciones para capitalizar oportunidades identificadas",
        availableActions: [
            {
                id: 'engagement-event',
                label: 'Organizar Evento',
                description: 'Planificar y ejecutar evento relacionado'
            },
            {
                id: 'social-media',
                label: 'Campaña en Redes',
                description: 'Desarrollar campaña específica en redes sociales'
            }
        ]
    },
    trend: {
        title: "Acciones sobre Tendencias",
        description: "Respuestas a tendencias emergentes",
        availableActions: [
            {
                id: 'monitoring',
                label: 'Monitoreo de Tendencia',
                description: 'Seguimiento detallado de la evolución de la tendencia'
            },
            {
                id: 'message-adjustment',
                label: 'Adaptación de Mensajes',
                description: 'Alinear mensajes con la tendencia actual'
            }
        ]
    },
    regional: {
        title: "Acciones Regionales",
        description: "Intervenciones específicas por región",
        availableActions: [
            {
                id: 'coordination',
                label: 'Coordinación Local',
                description: 'Coordinar acciones con equipos locales'
            },
            {
                id: 'engagement-event',
                label: 'Evento Regional',
                description: 'Organizar evento en la región afectada'
            }
        ]
    },
    media: {
        title: "Acciones de Medios",
        description: "Respuestas a cobertura mediática",
        availableActions: [
            {
                id: 'press-release',
                label: 'Comunicado de Prensa',
                description: 'Preparar y distribuir comunicado oficial'
            },
            {
                id: 'coordination',
                label: 'Coordinación con Medios',
                description: 'Gestionar relaciones con medios clave'
            }
        ]
    }
};