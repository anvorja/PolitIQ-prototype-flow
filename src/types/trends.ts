export interface TrendDataPoint {
    date: string;         // Formato: YYYY-MM-DD
    mentions: number;     // Número total de menciones
    sentiment: number;    // Porcentaje de sentimiento positivo (0-100)
    positives: number;    // Menciones positivas
    negatives: number;    // Menciones negativas
    neutrals: number;     // Menciones neutrales
}

export interface TopicTrend {
    topic: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
}