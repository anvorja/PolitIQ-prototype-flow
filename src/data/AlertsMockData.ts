import { Alert, AlertGroup } from '@/types/alerts';

export const alertsData: Alert[] = [
    {
        id: "1",
        type: "crisis",
        title: "Caída brusca en sentimiento",
        description: "Se detectó una caída significativa en el sentimiento positivo respecto a 'Seguridad Ciudadana'",
        priority: "high",
        status: "new",
        timestamp: "2024-01-07T14:30:00",
        relatedTopic: "Seguridad Ciudadana",
        changePercent: -15.3
    },
    {
        id: "2",
        type: "trend",
        title: "Tema emergente detectado",
        description: "El tema 'Transporte Público' está ganando tracción rápidamente en redes sociales",
        priority: "medium",
        status: "viewed",
        timestamp: "2024-01-07T13:15:00",
        relatedTopic: "Transporte Público",
        changePercent: 25.8
    },
    {
        id: "3",
        type: "opportunity",
        title: "Alta resonancia positiva",
        description: "La propuesta sobre 'Educación Gratuita' está recibiendo una recepción muy positiva",
        priority: "medium",
        status: "new",
        timestamp: "2024-01-07T12:00:00",
        relatedTopic: "Educación",
        changePercent: 32.1
    },
    {
        id: "4",
        type: "sentiment",
        title: "Mejora en percepción",
        description: "Aumento notable en sentimiento positivo en la región 'Valle del Cauca'",
        priority: "low",
        status: "handled",
        timestamp: "2024-01-07T11:30:00",
        category: "Regional",
        changePercent: 8.7
    },
    {
        id: "5",
        type: "trend",
        title: "Hashtag en tendencia",
        description: "#MejorEducación se está volviendo tendencia en múltiples ciudades",
        priority: "medium",
        status: "new",
        timestamp: "2024-01-07T10:45:00",
        category: "Social Media"
    },
    {
        id: "6",
        type: "crisis",
        title: "Tema crítico emergente",
        description: "Incremento en menciones negativas sobre 'Seguridad en el Transporte'",
        priority: "high",
        status: "new",
        timestamp: "2024-01-07T10:15:00",
        relatedTopic: "Transporte",
        changePercent: -12.4
    }
];

export const alertGroups: AlertGroup[] = [
    {
        title: "Nuevas Alertas",
        alerts: alertsData.filter(alert => alert.status === "new")
    },
    {
        title: "En Revisión",
        alerts: alertsData.filter(alert => alert.status === "viewed")
    },
    {
        title: "Atendidas",
        alerts: alertsData.filter(alert => alert.status === "handled")
    }
];