// src/types/geography.ts

// Base types
export type RegionName = string;
export type DepartmentName = string;
export type CandidateName = "Candidato A" | "Candidato B" | "Otros" | "Indecisos";

// Voting related types
export interface PieDataEntry {
    name: CandidateName;
    value: number;
}

export interface Intention {
    candidate: CandidateName;
    percentage: number;
    previousPercentage: number;
    trend: 'up' | 'down' | 'stable';
}

export interface VotingIntention {
    region: RegionName;
    intentions: Intention[];
    totalVoters: number;
    abstentionRate: number;
    undecided: number;
    margin: number;
    lastUpdate: string;
}

export interface RegionalTopic {
    id: string;
    name: string;
    description: string;
    sentiment: number;
    intensity: number;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
    relatedTopics: string[];
    affectedRegions: RegionName[];
}

export interface RegionalNeed {
    id: string;
    region: RegionName;
    category: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    impact: number;
    affectedPopulation: number;
    status: 'pending' | 'in-progress' | 'addressed';
    proposedSolutions?: string[];
}

export interface ElectoralStrength {
    region: RegionName;
    overallStrength: number;
    demographics: {
        category: string;
        strength: number;
        potentialVoters: number;
    }[];
    historicalPerformance: {
        year: number;
        votes: number;
        percentage: number;
    }[];
    keyAllies: string[];
    challenges: string[];
}

export interface TerritorialEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    location: {
        region: RegionName;
        venue: string;
        coordinates: [number, number];
    };
    type: 'rally' | 'meeting' | 'debate' | 'community' | 'other';
    expectedAttendance: number;
    organizer: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    outcomes?: {
        actualAttendance: number;
        sentiment: number;
        keyTakeaways: string[];
    };
}

export interface LocalCompetitor {
    id: string;
    name: string;
    party: string;
    region: RegionName;
    currentPosition?: string;
    strength: number;
    supportBase: {
        demographic: string;
        level: number;
    }[];
    keyProposals: string[];
    recentActivities: {
        date: string;
        activity: string;
        impact: number;
    }[];
}

export interface AIRecommendation {
    id: string;
    type: 'strategy' | 'action' | 'response' | 'warning';
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    rationale: string;
    suggestedActions: string[];
    predictedOutcome: string;
    confidence: number;
    relatedData: {
        category: string;
        source: string;
        relevance: number;
    }[];
    timestamp: string;
}

export interface RegionalAnalytics {
    region: RegionName;
    demographics: {
        totalPopulation: number;
        votingAge: number;
        registered: number;
        ageDistribution: {
            range: string;
            percentage: number;
        }[];
        socioeconomic: {
            level: string;
            percentage: number;
        }[];
    };
    politicalContext: {
        incumbentParty: string;
        previousResults: {
            year: number;
            winner: string;
            margin: number;
        }[];
        keyIssues: string[];
    };
    campaignMetrics: {
        awarenessLevel: number;
        favorability: number;
        messageResonance: number;
        volunteerBase: number;
        resources: {
            type: string;
            status: number;
        }[];
    };
}