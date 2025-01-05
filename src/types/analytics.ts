export type InfluencerType = 'politician' | 'analyst' | 'media' | 'academic' | 'anonymous';

export interface Influencer {
    id: string;
    name: string;
    handle: string;
    type: InfluencerType;
    role?: string;
    avatarUrl?: string;
    followers: number;
    mentions: number;
    engagement: number;
    sentiment: number;
    relevantTopics: string[];
    specialization?: string[];
    recentMentions: number;
    changePercent: number;
    trend: 'up' | 'down' | 'stable';
    verified: boolean;
}

export type InfluencerSort = 'followers' | 'mentions' | 'engagement' | 'sentiment';