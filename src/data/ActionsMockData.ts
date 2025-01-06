// src/data/ActionsMockData.ts

import { ActionTask } from '@/types/alertEvents';

export const mockActions: ActionTask[] = [
    {
        id: "action1",
        alertId: "1", // Relacionada con la alerta de desinformación
        type: "press-release",
        title: "Comunicado oficial sobre reforma tributaria",
        description: "Preparar y distribuir comunicado oficial aclarando puntos clave de la reforma tributaria",
        priority: "high",
        status: "in-progress",
        createdAt: "2025-01-05T11:00:00",
        updatedAt: "2025-01-05T11:30:00",
        deadline: "2025-01-06T14:00:00",
        assignedTo: [
            {
                id: "1",
                name: "Carolina Rodríguez",
                role: "Director de Comunicaciones",
                email: "carolina.rodriguez@ejemplo.com"
            },
            {
                id: "4",
                name: "Juan Carlos Gómez",
                role: "Asesor Legal",
                email: "jc.gomez@ejemplo.com"
            }
        ],
        responses: [],
        notes: ["Se requiere validación del equipo legal antes de publicación"]
    },
    {
        id: "action2",
        alertId: "1",
        type: "social-media",
        title: "Campaña fact-checking en redes",
        description: "Desarrollar campaña de fact-checking para contrarrestar desinformación",
        priority: "high",
        status: "pending",
        createdAt: "2025-01-05T11:15:00",
        updatedAt: "2025-01-05T11:15:00",
        deadline: "2025-01-06T12:00:00",
        assignedTo: [
            {
                id: "2",
                name: "Andrés Martínez",
                role: "Coordinador de Redes Sociales",
                email: "andres.martinez@ejemplo.com"
            }
        ],
        responses: [],
        notes: ["Coordinar mensajes clave con el equipo de comunicaciones"]
    },
    {
        id: "action3",
        alertId: "2",
        type: "emergency-meeting",
        title: "Reunión emergencia seguridad Bogotá",
        description: "Convocar reunión con equipo de seguridad y comunicaciones",
        priority: "high",
        status: "completed",
        createdAt: "2025-01-05T09:30:00",
        updatedAt: "2025-01-05T11:00:00",
        deadline: "2025-01-05T12:00:00",
        assignedTo: [
            {
                id: "1",
                name: "Carolina Rodríguez",
                role: "Director de Comunicaciones",
                email: "carolina.rodriguez@ejemplo.com"
            },
            {
                id: "3",
                name: "María Fernanda López",
                role: "Estratega Político",
                email: "mf.lopez@ejemplo.com"
            }
        ],
        responses: [],
        notes: ["Se definió estrategia de comunicación para próximos días"]
    },
    {
        id: "action4",
        alertId: "3",
        type: "engagement-event",
        title: "Evento juventudes sector universitario",
        description: "Organizar encuentro con líderes estudiantiles",
        priority: "medium",
        status: "in-progress",
        createdAt: "2025-01-05T12:00:00",
        updatedAt: "2025-01-05T14:00:00",
        deadline: "2025-01-08T17:00:00",
        assignedTo: [
            {
                id: "5",
                name: "Patricia Valencia",
                role: "Coordinadora Regional",
                email: "p.valencia@ejemplo.com"
            }
        ],
        responses: [],
        notes: ["Contactar universidades principales para coordinar espacios"]
    },
    {
        id: "action5",
        alertId: "7",
        type: "coordination",
        title: "Coordinación respuesta Valle del Cauca",
        description: "Establecer mesa de diálogo con líderes locales",
        priority: "high",
        status: "pending",
        createdAt: "2025-01-05T16:00:00",
        updatedAt: "2025-01-05T16:00:00",
        deadline: "2025-01-07T09:00:00",
        assignedTo: [
            {
                id: "5",
                name: "Patricia Valencia",
                role: "Coordinadora Regional",
                email: "p.valencia@ejemplo.com"
            },
            {
                id: "3",
                name: "María Fernanda López",
                role: "Estratega Político",
                email: "mf.lopez@ejemplo.com"
            }
        ],
        responses: [],
        notes: ["Preparar agenda y puntos clave para la reunión"]
    }
];