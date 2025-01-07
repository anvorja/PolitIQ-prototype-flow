// src/data/InfluencerInteractionsMockData.ts
import type { InfluencerInteraction } from '@/types/influencers';

export const influencerInteractions: InfluencerInteraction[] = [
    {
        id: "1",
        influencerId: "1",
        type: "mention",
        content: "La reforma tributaria es necesaria para garantizar la equidad social y el desarrollo del país. #ReformaTributaria",
        timestamp: "2025-01-05T10:30:00",
        reach: 250000,
        engagement: 8.5,
        sentiment: 65,
        relatedTopics: ["Reforma Tributaria", "Equidad Social", "Desarrollo"],
        authorName: "Gustavo Tetro",
        handle: "@GustavoTetro",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736280453/petro_hs2k69.jpg"

    },
    {
        id: "2",
        influencerId: "2",
        type: "reply",
        content: "La reforma tributaria destruirá el empleo y la inversión. Es un grave error. #NoALaReforma",
        timestamp: "2025-01-05T10:45:00",
        reach: 180000,
        engagement: 7.8,
        sentiment: 35,
        relatedTopics: ["Reforma Tributaria", "Empleo", "Inversión"],
        authorName: "Álvaro Guribe",
        handle: "@AlvaroGuribe",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736280453/uribe_dcfigo.jpg"

    },
    {
        id: "3",
        influencerId: "3",
        type: "quote",
        content: "Bogotá necesita más inversión en seguridad y movilidad. Trabajamos en ello.",
        timestamp: "2025-01-05T11:15:00",
        reach: 120000,
        engagement: 6.9,
        sentiment: 58,
        relatedTopics: ["Seguridad", "Movilidad", "Bogotá"],
        authorName: "Claudia Drópez",
        handle: "@ClaudiaDropez",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736280452/claudia_qjfpyg.jpg"
    },
    {
        id: "4",
        influencerId: "4",
        type: "retweet",
        content: "Análisis detallado del impacto económico de las últimas medidas gubernamentales. #EconomíaColombia",
        timestamp: "2025-01-05T12:00:00",
        reach: 45000,
        engagement: 5.5,
        sentiment: 52,
        relatedTopics: ["Economía", "Gobierno", "Análisis"],
        authorName: "Ana María Analista",
        handle: "@AnaMariaAnalista",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736280453/anamaria_bp2n5x.jpg"
    },
    {
        id: "5",
        influencerId: "5",
        type: "mention",
        content: "ÚLTIMA HORA: Presidente anuncia nuevas medidas económicas. Detalles en nuestro portal.",
        timestamp: "2025-01-05T13:30:00",
        reach: 150000,
        engagement: 7.2,
        sentiment: 50,
        relatedTopics: ["Economía", "Gobierno", "Medidas"],
        authorName: "El Observador",
        handle: "@ElObservador",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736281360/observador_dqaxlg.jpg"

    },
    {
        id: "6",
        influencerId: "6",
        type: "mention",
        content: "Gobierno anuncia que el recaudo del IVA se destina a la guerra.",
        timestamp: "2025-02-05T13:30:00",
        reach: 150000,
        engagement: 7.2,
        sentiment: 33,
        relatedTopics: ["Economía", "Gobierno", "Seguridad"],
        authorName: "Revista Semana",
        handle: "@RevistaSemana",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736282580/semana_vy7bvb.jpg"

    },
    {
        id: "7",
        influencerId: "7",
        type: "reply",
        content: "Próximamente filtraremos imágenes de corrupción en el Senado.",
        timestamp: "2025-02-05T13:30:00",
        reach: 250000,
        engagement: 8.2,
        sentiment: 90,
        relatedTopics: ["Corrupción", "Gobierno", "Senado"],
        authorName: "Anonymous",
        handle: "@YourAnonOne",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736282579/anonymous_azwvxq.jpg"

    },
    {
        id: "8",
        influencerId: "8",
        type: "quote",
        content: "Rueda de prensa con el Ministro de Hacienda es un caos.",
        timestamp: "2025-02-05T13:30:00",
        reach: 150000,
        engagement: 7.2,
        sentiment: 40,
        relatedTopics:  ["Reforma Tributaria", "Equidad Social", "Desarrollo"],
        authorName: "Noticias Caracol",
        handle: "@NoticiasCaracol",
        avatarUrl: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736282579/caracol_kvnrj0.jpg"

    }
];