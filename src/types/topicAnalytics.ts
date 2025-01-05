export interface TopicAnalysis {
    topic: string;
    mentions: number;
    sentiment: number;
    engagement: number;
    topInfluencers: string[];
    relatedTopics: {
        topic: string;
        strength: number; // 0-100 para indicar qué tan relacionados están
    }[];
    weeklyTrend: {
        date: string;
        mentions: number;
        sentiment: number;
    }[];
}