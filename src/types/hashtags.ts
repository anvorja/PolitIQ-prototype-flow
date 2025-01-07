// src/types/hashtags.ts

export interface HashtagAnalysis {
    id: string;
    tag: string;
    mentions: number;
    reach: number;
    engagement: number;
    sentiment: number;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
    relatedTags: string[];
    topInfluencers: string[];
    categories: string[];
    timeline: HashtagTimelinePoint[];
}

export interface HashtagTimelinePoint {
    date: string;
    mentions: number;
    engagement: number;
    sentiment: number;
}

export interface HashtagCategory {
    id: string;
    name: string;
    description: string;
    tags: HashtagAnalysis[];
    totalMentions: number;
    avgSentiment: number;
}

export interface HashtagNetwork {
    nodes: HashtagNode[];
    links: HashtagLink[];
}

export interface HashtagNode {
    id: string;
    tag: string;
    mentions: number;
    category: string;
}

export interface HashtagLink {
    source: string;
    target: string;
    strength: number;
}