export interface KPICard {
    title: string;
    value: string | number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
    icon: string;
}

export interface SentimentData {
    label: string;
    value: number;
    color: string;
}

export interface TrendData {
    date: string;
    mentions: number;
    sentiment: number;
}

export interface TopicData {
    topic: string;
    count: number;
    sentiment: number;
    trend: 'up' | 'down' | 'neutral';
}

export interface AlertData {
    id: string;
    type: 'crisis' | 'opportunity' | 'trend' | 'sentiment';
    message: string;
    timestamp: string;
    priority: 'high' | 'medium' | 'low';
    status: 'new' | 'viewed' | 'handled';
}

export interface GeoData {
    region: string;
    mentions: number;
    sentiment: number;
    coordinates: [number, number];
}