// src/types/influencers.ts

export type InfluencerType = 'politician' | 'analyst' | 'media' | 'academic' | 'anonymous';

export interface Influencer {
    id: string;
    name: string;
    handle: string;
    type: InfluencerType;
    role: string;
    followers: number;
    mentions: number;
    engagement: number;
    sentiment: number;
    relevantTopics: string[];
    specialization: string[];
    recentMentions: number;
    changePercent: number;
    trend: 'up' | 'down' | 'stable';
    verified: boolean;
}

export interface InfluencerInteraction {
    id: string;
    influencerId: string;
    authorName: string;
    handle: string;
    type: 'mention' | 'reply' | 'quote' | 'retweet';
    content: string;
    timestamp: string;
    reach: number;
    engagement: number;
    sentiment: number;
    relatedTopics: string[];
    avatarUrl: string;
}

export interface InfluencerRelation {
    source: string;
    target: string;
    strength: number;
    type: 'ally' | 'opponent' | 'neutral';
    interactions: number;
    lastInteraction: string;
}

export interface InfluencerTrend {
    influencerId: string;
    period: string;
    mentions: number;
    engagement: number;
    sentiment: number;
    reach: number;
}