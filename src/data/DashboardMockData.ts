import { AlertData, GeoData, KPICard, SentimentData, TopicData, TrendData } from "@/types/dashboard";

export const kpiCardsData: KPICard[] = [
    {
        title: "Menciones Totales",
        value: "12,847",
        change: 12.5,
        trend: "up",
        icon: "trending-up"
    },
    {
        title: "Sentimiento General",
        value: "72%",
        change: 5.2,
        trend: "up",
        icon: "smile"
    },
    {
        title: "Alcance",
        value: "1.2M",
        change: -2.3,
        trend: "down",
        icon: "users"
    },
    {
        title: "Temas Activos",
        value: "24",
        change: 8.1,
        trend: "up",
        icon: "hash"
    }
];

export const sentimentData: SentimentData[] = [
    { label: "Positivo", value: 45, color: "rgb(34, 197, 94)" },
    { label: "Neutral", value: 35, color: "rgb(234, 179, 8)" },
    { label: "Negativo", value: 20, color: "rgb(239, 68, 68)" }
];

export const trendData: TrendData[] = [
    { date: "2024-01-01", mentions: 1200, sentiment: 75 },
    { date: "2024-01-02", mentions: 1350, sentiment: 72 },
    { date: "2024-01-03", mentions: 1100, sentiment: 78 },
    { date: "2024-01-04", mentions: 1500, sentiment: 71 },
    { date: "2024-01-05", mentions: 1420, sentiment: 74 },
    { date: "2024-01-06", mentions: 1650, sentiment: 76 },
    { date: "2024-01-07", mentions: 1800, sentiment: 73 }
];

export const topTopicsData: TopicData[] = [
    { topic: "Seguridad Ciudadana", count: 2456, sentiment: 65, trend: "up" },
    { topic: "Empleo", count: 2100, sentiment: 72, trend: "up" },
    { topic: "Educación", count: 1890, sentiment: 81, trend: "neutral" },
    { topic: "Transporte", count: 1654, sentiment: 58, trend: "down" },
    { topic: "Salud", count: 1432, sentiment: 75, trend: "up" }
];

export const recentAlertsData: AlertData[] = [
    {
        id: "1",
        type: "trend",
        message: "Aumento significativo en menciones sobre 'seguridad'",
        timestamp: "2024-01-07T14:30:00",
        priority: "high",
        status: "new"
    },
    {
        id: "2",
        type: "sentiment",
        message: "Caída en sentimiento positivo respecto a 'transporte'",
        timestamp: "2024-01-07T13:15:00",
        priority: "medium",
        status: "viewed"
    },
    {
        id: "3",
        type: "opportunity",
        message: "Alta resonancia positiva de propuesta educativa",
        timestamp: "2024-01-07T12:00:00",
        priority: "high",
        status: "handled"
    }
];

export const geoData: GeoData[] = [
    {
        region: "Región Norte",
        mentions: 3500,
        sentiment: 75,
        coordinates: [-74.5, 4.5]
    },
    {
        region: "Región Sur",
        mentions: 2800,
        sentiment: 68,
        coordinates: [-74.8, 4.3]
    },
    {
        region: "Región Este",
        mentions: 3200,
        sentiment: 72,
        coordinates: [-74.2, 4.6]
    },
    {
        region: "Región Oeste",
        mentions: 2950,
        sentiment: 70,
        coordinates: [-74.9, 4.7]
    }
];