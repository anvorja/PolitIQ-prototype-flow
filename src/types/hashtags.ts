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

// src/types/hashtags.ts

// ... otras interfaces existentes ...

interface TimeSeriesDataPoint {
    mentions: number;
    engagement: number;
    sentiment: number;
}

interface CategoryTimeSeries {
    monthly: TimeSeriesDataPoint[];
    weekly: TimeSeriesDataPoint[];
    hourly: TimeSeriesDataPoint[];
}

interface DatasetsByMetric {
    mentions: number[];
    engagement: number[];
    sentiment: number[];
}

interface TimeSeriesData {
    labels: string[];
    datasets: DatasetsByMetric;
}

export interface HashtagTrendsData {
    hourly: TimeSeriesData;
    weekly: TimeSeriesData;
    monthly: TimeSeriesData;
    byCategory: {
        [key: string]: CategoryTimeSeries;
    };
}