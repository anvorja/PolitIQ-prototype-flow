// src/data/InfluencerNetworkMockData.ts

type NodeType = 'politician' | 'analyst' | 'media' | 'academic';
type RelationType = 'ally' | 'opponent' | 'neutral';

interface NetworkNode {
    id: string;
    name: string;
    type: NodeType;
    influence: number;
    followers: number;
}

interface NetworkLink {
    source: string;
    target: string;
    strength: number;
    type: RelationType;
    interactions: number;
    lastInteraction: string;
}

interface NetworkData {
    nodes: NetworkNode[];
    links: NetworkLink[];
}

export const influencerNetwork: NetworkData = {
    nodes: [
        {
            id: "1",
            name: "Gustavo Tetro",
            type: "politician",
            influence: 95,
            followers: 3500000
        },
        {
            id: "2",
            name: "Álvaro Guribe",
            type: "politician",
            influence: 90,
            followers: 2800000
        },
        {
            id: "3",
            name: "Claudia Drópez",
            type: "politician",
            influence: 75,
            followers: 1500000
        },
        {
            id: "4",
            name: "Ana María Analista",
            type: "analyst",
            influence: 60,
            followers: 125000
        },
        {
            id: "5",
            name: "El Observador",
            type: "media",
            influence: 85,
            followers: 245000
        },
        {
            id: "6",
            name: "María Valencia",
            type: "academic",
            influence: 45,
            followers: 75000
        }
    ],
    links: [
        {
            source: "1",
            target: "2",
            strength: 0.9,
            type: "opponent",
            interactions: 150,
            lastInteraction: "2025-01-05T10:30:00"
        },
        {
            source: "1",
            target: "3",
            strength: 0.7,
            type: "ally",
            interactions: 80,
            lastInteraction: "2025-01-05T09:15:00"
        },
        {
            source: "2",
            target: "4",
            strength: 0.5,
            type: "neutral",
            interactions: 45,
            lastInteraction: "2025-01-04T15:20:00"
        },
        {
            source: "3",
            target: "5",
            strength: 0.6,
            type: "neutral",
            interactions: 60,
            lastInteraction: "2025-01-05T11:45:00"
        },
        {
            source: "4",
            target: "5",
            strength: 0.4,
            type: "ally",
            interactions: 30,
            lastInteraction: "2025-01-04T16:30:00"
        },
        {
            source: "5",
            target: "6",
            strength: 0.3,
            type: "neutral",
            interactions: 25,
            lastInteraction: "2025-01-03T14:20:00"
        }
    ]
};