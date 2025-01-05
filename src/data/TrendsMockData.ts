import { TrendDataPoint, TopicTrend } from '@/types/trends';

// Datos de tendencias temporales
export const trendData: TrendDataPoint[] = [
    {
        date: "2024-01-01",
        mentions: 1250,
        sentiment: 75,
        positives: 750,
        negatives: 200,
        neutrals: 300
    },
    {
        date: "2024-01-02",
        mentions: 1480,
        sentiment: 72,
        positives: 850,
        negatives: 280,
        neutrals: 350
    },
    {
        date: "2024-01-03",
        mentions: 1320,
        sentiment: 68,
        positives: 720,
        negatives: 400,
        neutrals: 200
    },
    {
        date: "2024-01-04",
        mentions: 1650,
        sentiment: 71,
        positives: 920,
        negatives: 330,
        neutrals: 400
    },
    {
        date: "2024-01-05",
        mentions: 1890,
        sentiment: 77,
        positives: 1150,
        negatives: 290,
        neutrals: 450
    },
    {
        date: "2024-01-06",
        mentions: 2100,
        sentiment: 73,
        positives: 1200,
        negatives: 450,
        neutrals: 450
    },
    {
        date: "2024-01-07",
        mentions: 1950,
        sentiment: 69,
        positives: 1050,
        negatives: 500,
        neutrals: 400
    }
];

// Temas en tendencia (actualizados para coincidir con relevantTopics)
export const topicTrends: TopicTrend[] = [
    {
        topic: "Economía",
        count: 2850,
        trend: "up",
        changePercent: 15.3
    },
    {
        topic: "Seguridad",
        count: 2420,
        trend: "stable",
        changePercent: 2.1
    },
    {
        topic: "Educación",
        count: 1950,
        trend: "up",
        changePercent: 12.7
    },
    {
        topic: "Política",
        count: 2680,
        trend: "up",
        changePercent: 8.5
    },
    {
        topic: "Desarrollo",
        count: 1580,
        trend: "down",
        changePercent: -3.2
    },
    {
        topic: "Derechos",
        count: 1420,
        trend: "up",
        changePercent: 7.4
    },
    {
        topic: "Género",
        count: 1280,
        trend: "up",
        changePercent: 5.8
    },
    {
        topic: "Empleo",
        count: 1680,
        trend: "stable",
        changePercent: 1.2
    },
    {
        topic: "Paz",
        count: 1450,
        trend: "down",
        changePercent: -4.5
    }
];