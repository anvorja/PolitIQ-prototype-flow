import {TopicAnalysis} from "@/types/topicAnalytics";

export const topicsAnalysisData: TopicAnalysis[] = [
    {
        topic: "Economía",
        mentions: 2850,
        sentiment: 65,
        engagement: 8.2,
        topInfluencers: ["@GustavoTetro", "@AnaMariaAnalista", "@CarlosMAnalisis"],
        relatedTopics: [
            { topic: "Empleo", strength: 85 },
            { topic: "Desarrollo", strength: 75 },
            { topic: "Reforma Tributaria", strength: 70 }
        ],
        weeklyTrend: [
            { date: "2024-01-01", mentions: 380, sentiment: 62 },
            { date: "2024-01-02", mentions: 420, sentiment: 64 },
            { date: "2024-01-03", mentions: 390, sentiment: 67 },
            { date: "2024-01-04", mentions: 450, sentiment: 65 },
            { date: "2024-01-05", mentions: 410, sentiment: 66 },
            { date: "2024-01-06", mentions: 430, sentiment: 65 },
            { date: "2024-01-07", mentions: 370, sentiment: 66 }
        ]
    },
    {
        topic: "Seguridad",
        mentions: 2420,
        sentiment: 58,
        engagement: 7.8,
        topInfluencers: ["@AlvaroGuriVel", "@JCRPolitica", "@PoliticaHoyCo"],
        relatedTopics: [
            { topic: "Policía", strength: 80 },
            { topic: "Delincuencia", strength: 75 },
            { topic: "Paz", strength: 65 }
        ],
        weeklyTrend: [
            { date: "2024-01-01", mentions: 320, sentiment: 56 },
            { date: "2024-01-02", mentions: 350, sentiment: 57 },
            { date: "2024-01-03", mentions: 360, sentiment: 59 },
            { date: "2024-01-04", mentions: 340, sentiment: 58 },
            { date: "2024-01-05", mentions: 370, sentiment: 57 },
            { date: "2024-01-06", mentions: 330, sentiment: 59 },
            { date: "2024-01-07", mentions: 350, sentiment: 58 }
        ]
    },
    {
        topic: "Educación",
        mentions: 1950,
        sentiment: 72,
        engagement: 8.5,
        topInfluencers: ["@MariaVPolitologa", "@GustavoTetro", "@JoManSantos"],
        relatedTopics: [
            { topic: "Universidad", strength: 85 },
            { topic: "Becas", strength: 70 },
            { topic: "Investigación", strength: 65 }
        ],
        weeklyTrend: [
            { date: "2024-01-01", mentions: 260, sentiment: 71 },
            { date: "2024-01-02", mentions: 280, sentiment: 72 },
            { date: "2024-01-03", mentions: 270, sentiment: 73 },
            { date: "2024-01-04", mentions: 290, sentiment: 71 },
            { date: "2024-01-05", mentions: 285, sentiment: 72 },
            { date: "2024-01-06", mentions: 275, sentiment: 73 },
            { date: "2024-01-07", mentions: 290, sentiment: 72 }
        ]
    },
    {
        topic: "Desarrollo",
        mentions: 1580,
        sentiment: 68,
        engagement: 7.5,
        topInfluencers: ["@CarlosMAnalisis", "@IvanFuque", "@AnaMariaAnalista"],
        relatedTopics: [
            { topic: "Infraestructura", strength: 80 },
            { topic: "Innovación", strength: 75 },
            { topic: "Tecnología", strength: 70 }
        ],
        weeklyTrend: [
            { date: "2024-01-01", mentions: 210, sentiment: 67 },
            { date: "2024-01-02", mentions: 230, sentiment: 68 },
            { date: "2024-01-03", mentions: 220, sentiment: 69 },
            { date: "2024-01-04", mentions: 240, sentiment: 67 },
            { date: "2024-01-05", mentions: 225, sentiment: 68 },
            { date: "2024-01-06", mentions: 235, sentiment: 69 },
            { date: "2024-01-07", mentions: 220, sentiment: 68 }
        ]
    }
];