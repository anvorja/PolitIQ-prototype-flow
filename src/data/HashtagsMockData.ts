// src/data/HashtagsMockData.ts

import { HashtagCategory, HashtagNetwork, HashtagTrendsData } from '@/types/hashtags';

export const hashtagCategories: HashtagCategory[] = [
    {
        id: "1",
        name: "Reforma a la Salud",
        description: "Hashtags relacionados con la reforma al sistema de salud",
        totalMentions: 125480,
        avgSentiment: 58,
        tags: [
            {
                id: "1.1",
                tag: "ReformaSaludEs",
                mentions: 45280,
                reach: 2890000,
                engagement: 8.9,
                sentiment: 62,
                trend: "up",
                changePercent: 15.5,
                relatedTags: ["SaludParaTodos", "CrisisEPS", "SaludDigna", "ReformaONo"],
                topInfluencers: [
                    "@GuillermoPrada",
                    "@CarlosHolmesTrujillo",
                    "@RevistaSemana",
                    "@NoticiasCaracol",
                    "@MinSaludCol"
                ],
                categories: ["Reforma", "Salud", "Gobierno"],
                timeline: [
                    { date: "2024-01-01", mentions: 5100, engagement: 8.5, sentiment: 60 },
                    { date: "2024-01-02", mentions: 6300, engagement: 9.1, sentiment: 61 },
                    { date: "2024-01-03", mentions: 5800, engagement: 8.8, sentiment: 62 }
                ]
            },
            {
                id: "1.2",
                tag: "NoALaReforma",
                mentions: 38750,
                reach: 1950000,
                engagement: 7.8,
                sentiment: 45,
                trend: "up",
                changePercent: 22.3,
                relatedTags: ["EPSEnCrisis", "SistemaDeSalud", "EmergenciaSanitaria"],
                topInfluencers: [
                    "@PalomaValenciaL",
                    "@RevistaSemana",
                    "@AlvaroUribeVel",
                    "@NoticiasRCN",
                    "@ElTiempo"
                ],
                categories: ["Oposición", "Salud", "Protesta"],
                timeline: [
                    { date: "2024-01-01", mentions: 4200, engagement: 7.6, sentiment: 44 },
                    { date: "2024-01-02", mentions: 4800, engagement: 7.9, sentiment: 45 },
                    { date: "2024-01-03", mentions: 4500, engagement: 7.7, sentiment: 45 }
                ]
            }
        ]
    },
    {
        id: "2",
        name: "Paz Total",
        description: "Hashtags sobre el proceso de paz total y negociaciones",
        totalMentions: 98750,
        avgSentiment: 64,
        tags: [
            {
                id: "2.1",
                tag: "PazTotal",
                mentions: 42840,
                reach: 2250000,
                engagement: 8.6,
                sentiment: 68,
                trend: "stable",
                changePercent: 3.8,
                relatedTags: ["DiálogosDePaz", "PazConLegalidad", "CesarFuego", "AcuerdoNacional"],
                topInfluencers: [
                    "@ComisionadoPaz",
                    "@DefensoriaCol",
                    "@IvanCepedaCast",
                    "@PGN_COL",
                    "@BluRadioCo"
                ],
                categories: ["Paz", "Gobierno", "Negociación"],
                timeline: [
                    { date: "2024-01-01", mentions: 5800, engagement: 8.4, sentiment: 67 },
                    { date: "2024-01-02", mentions: 5950, engagement: 8.7, sentiment: 68 },
                    { date: "2024-01-03", mentions: 5820, engagement: 8.5, sentiment: 68 }
                ]
            },
            {
                id: "2.2",
                tag: "AcuerdosDeEscazu",
                mentions: 28460,
                reach: 1680000,
                engagement: 7.9,
                sentiment: 72,
                trend: "up",
                changePercent: 12.4,
                relatedTags: ["JusticiaSocial", "DerechosHumanos", "MedioAmbiente"],
                topInfluencers: [
                    "@MinAmbienteCo",
                    "@AABendesky",
                    "@WWFColombia",
                    "@GreenpeaceColom",
                    "@ElEspectador"
                ],
                categories: ["Ambiente", "Paz", "Internacional"],
                timeline: [
                    { date: "2024-01-01", mentions: 3500, engagement: 7.7, sentiment: 71 },
                    { date: "2024-01-02", mentions: 3800, engagement: 8.0, sentiment: 72 },
                    { date: "2024-01-03", mentions: 3650, engagement: 7.8, sentiment: 72 }
                ]
            }
        ]
    },
    {
        id: "3",
        name: "Economía y Desarrollo",
        description: "Hashtags sobre la situación económica y desarrollo del país",
        totalMentions: 85460,
        avgSentiment: 52,
        tags: [
            {
                id: "3.1",
                tag: "ReformaLaboral",
                mentions: 35280,
                reach: 1980000,
                engagement: 8.2,
                sentiment: 48,
                trend: "up",
                changePercent: 18.4,
                relatedTags: ["TrabajoDigno", "HorasExtras", "DerechosLaborales", "Sindicalismo"],
                topInfluencers: [
                    "@MintrabajoCol",
                    "@CGTCol",
                    "@CutColombiana",
                    "@FiscaliaCol",
                    "@LaRepublica_co"
                ],
                categories: ["Laboral", "Economía", "Reforma"],
                timeline: [
                    { date: "2024-01-01", mentions: 4500, engagement: 8.0, sentiment: 47 },
                    { date: "2024-01-02", mentions: 4900, engagement: 8.3, sentiment: 48 },
                    { date: "2024-01-03", mentions: 4700, engagement: 8.1, sentiment: 48 }
                ]
            },
            {
                id: "3.2",
                tag: "CostosDeVida",
                mentions: 28750,
                reach: 1450000,
                engagement: 7.6,
                sentiment: 42,
                trend: "up",
                changePercent: 15.8,
                relatedTags: ["Inflación", "PreciosAltos", "CanastaBásica", "Crisis"],
                topInfluencers: [
                    "@BanrepCol",
                    "@DANE_Colombia",
                    "@Portafolio",
                    "@ValoraAnalitica",
                    "@MinHacienda"
                ],
                categories: ["Economía", "Social", "Crisis"],
                timeline: [
                    { date: "2024-01-01", mentions: 3200, engagement: 7.4, sentiment: 41 },
                    { date: "2024-01-02", mentions: 3500, engagement: 7.7, sentiment: 42 },
                    { date: "2024-01-03", mentions: 3350, engagement: 7.5, sentiment: 42 }
                ]
            }
        ]
    },
    {
        id: "4",
        name: "Transición Energética",
        description: "Hashtags sobre el cambio en la matriz energética y medio ambiente",
        totalMentions: 72840,
        avgSentiment: 68,
        tags: [
            {
                id: "4.1",
                tag: "TransiciónEnergética",
                mentions: 32460,
                reach: 1680000,
                engagement: 7.8,
                sentiment: 70,
                trend: "up",
                changePercent: 9.4,
                relatedTags: ["EnergíasLimpias", "CambioClimático", "Sostenibilidad"],
                topInfluencers: [
                    "@MinEnergiaCo",
                    "@EPMestamosahi",
                    "@ISA_Avanza",
                    "@Grupo_Energia",
                    "@UPME_Colombia"
                ],
                categories: ["Energía", "Ambiente", "Desarrollo"],
                timeline: [
                    { date: "2024-01-01", mentions: 3800, engagement: 7.6, sentiment: 69 },
                    { date: "2024-01-02", mentions: 4100, engagement: 7.9, sentiment: 70 },
                    { date: "2024-01-03", mentions: 3950, engagement: 7.7, sentiment: 70 }
                ]
            },
            {
                id: "4.2",
                tag: "FrenaPetróleo",
                mentions: 25680,
                reach: 1280000,
                engagement: 8.4,
                sentiment: 58,
                trend: "up",
                changePercent: 21.3,
                relatedTags: ["NoMásLicencias", "AguaEsVida", "FrackingNo"],
                topInfluencers: [
                    "@MinAmbienteCo",
                    "@GustavoBolivar",
                    "@PactoHistorico",
                    "@ambientalistas",
                    "@Ecopetrol_SA"
                ],
                categories: ["Ambiente", "Energía", "Protesta"],
                timeline: [
                    { date: "2024-01-01", mentions: 2800, engagement: 8.2, sentiment: 57 },
                    { date: "2024-01-02", mentions: 3100, engagement: 8.5, sentiment: 58 },
                    { date: "2024-01-03", mentions: 2950, engagement: 8.3, sentiment: 58 }
                ]
            }
        ]
    },
    {
        id: "5",
        name: "Educación y Cultura",
        description: "Hashtags sobre educación, cultura y desarrollo social",
        totalMentions: 68920,
        avgSentiment: 74,
        tags: [
            {
                id: "5.1",
                tag: "MatriculaCero",
                mentions: 28460,
                reach: 1580000,
                engagement: 8.1,
                sentiment: 76,
                trend: "stable",
                changePercent: 2.4,
                relatedTags: ["EducaciónPública", "UniversidadParaTodos", "JóvenesALaU"],
                topInfluencers: [
                    "@MinEducacion",
                    "@IcetexColombia",
                    "@SUEColombia",
                    "@Fecode",
                    "@AscunColombia"
                ],
                categories: ["Educación", "Social", "Juventud"],
                timeline: [
                    { date: "2024-01-01", mentions: 3200, engagement: 7.9, sentiment: 75 },
                    { date: "2024-01-02", mentions: 3400, engagement: 8.2, sentiment: 76 },
                    { date: "2024-01-03", mentions: 3300, engagement: 8.0, sentiment: 76 }
                ]
            }
        ]
    }
];

export const hashtagNetwork: HashtagNetwork = {
    nodes: [
        // Reforma a la Salud
        { id: "1.1", tag: "ReformaSaludEs", mentions: 45280, category: "Reforma" },
        { id: "1.2", tag: "NoALaReforma", mentions: 38750, category: "Oposición" },
        { id: "1.3", tag: "SaludParaTodos", mentions: 25640, category: "Reforma" },

        // Paz Total
        { id: "2.1", tag: "PazTotal", mentions: 42840, category: "Paz" },
        { id: "2.2", tag: "AcuerdosDeEscazu", mentions: 28460, category: "Ambiente" },
        { id: "2.3", tag: "DiálogosDePaz", mentions: 22580, category: "Paz" },

        // Economía
        { id: "3.1", tag: "ReformaLaboral", mentions: 35280, category: "Reforma" },
        { id: "3.2", tag: "CostosDeVida", mentions: 28750, category: "Economía" },
        { id: "3.3", tag: "Inflación", mentions: 24680, category: "Economía" },

        // Transición Energética
        { id: "4.1", tag: "TransiciónEnergética", mentions: 32460, category: "Energía" },
        { id: "4.2", tag: "FrenaPetróleo", mentions: 25680, category: "Ambiente" },
        { id: "4.3", tag: "EnergíasLimpias", mentions: 21450, category: "Energía" },

        // Educación
        { id: "5.1", tag: "MatriculaCero", mentions: 28460, category: "Educación" },
        { id: "5.2", tag: "EducaciónPública", mentions: 24580, category: "Educación" },
        { id: "5.3", tag: "UniversidadParaTodos", mentions: 20140, category: "Educación" }
    ],
    links: [
        // Conexiones Reforma a la Salud
        { source: "1.1", target: "1.2", strength: 0.9 },
        { source: "1.1", target: "1.3", strength: 0.8 },
        { source: "1.2", target: "1.3", strength: 0.7 },
        { source: "1.1", target: "3.1", strength: 0.4 }, // Conexión con Reforma Laboral

        // Conexiones Paz Total
        { source: "2.1", target: "2.2", strength: 0.6 },
        { source: "2.1", target: "2.3", strength: 0.8 },
        { source: "2.2", target: "4.1", strength: 0.5 }, // Conexión con Transición Energética
        { source: "2.1", target: "4.2", strength: 0.3 },

        // Conexiones Economía
        { source: "3.1", target: "3.2", strength: 0.7 },
        { source: "3.2", target: "3.3", strength: 0.9 },
        { source: "3.1", target: "5.1", strength: 0.4 }, // Conexión con Educación

        // Conexiones Transición Energética
        { source: "4.1", target: "4.2", strength: 0.8 },
        { source: "4.1", target: "4.3", strength: 0.9 },
        { source: "4.2", target: "4.3", strength: 0.7 },
        { source: "4.1", target: "3.2", strength: 0.5 }, // Conexión con Costos de Vida

        // Conexiones Educación
        { source: "5.1", target: "5.2", strength: 0.9 },
        { source: "5.1", target: "5.3", strength: 0.8 },
        { source: "5.2", target: "5.3", strength: 0.9 },
        { source: "5.1", target: "3.2", strength: 0.4 } // Conexión con Costos de Vida
    ]
};

// Datos adicionales para análisis de tendencias temporales
export const hashtagTrends: HashtagTrendsData = {
    hourly: {
        labels: Array.from({length: 24}, (_, i) => `${i}:00`),
        datasets: {
            mentions: [1250, 980, 750, 620, 580, 650, 920, 1580, 2450, 3200, 3800, 4100,
                4350, 4200, 3950, 3750, 3600, 3800, 3950, 3600, 3200, 2800, 2200, 1650],
            engagement: [7.2, 6.8, 6.5, 6.2, 6.0, 6.3, 6.8, 7.5, 8.2, 8.8, 9.1, 9.3,
                9.4, 9.2, 9.0, 8.8, 8.7, 8.9, 9.0, 8.7, 8.4, 8.0, 7.6, 7.3],
            sentiment: [65, 63, 62, 60, 59, 61, 64, 68, 72, 75, 76, 77,
                78, 77, 76, 75, 74, 75, 76, 74, 72, 70, 68, 66]
        }
    },
    weekly: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: {
            mentions: [42500, 45800, 48200, 46500, 49800, 38500, 35200],
            engagement: [8.2, 8.4, 8.6, 8.5, 8.7, 7.8, 7.5],
            sentiment: [68, 69, 70, 69, 71, 67, 65]
        }
    },
    monthly: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: {
            mentions: [980000, 1050000, 1120000, 1080000, 1150000, 1220000, 1180000,
                1250000, 1320000, 1280000, 1350000, 1420000],
            engagement: [7.8, 8.0, 8.2, 8.1, 8.3, 8.5, 8.4, 8.6, 8.8, 8.7, 8.9, 9.0],
            sentiment: [64, 65, 66, 65, 67, 68, 67, 69, 70, 69, 71, 72]
        }
    },
    byCategory: {
        "1": { // Reforma a la Salud
            monthly: [
                { mentions: 980000, engagement: 8.9, sentiment: 62 },
                { mentions: 995000, engagement: 8.8, sentiment: 61 },
                { mentions: 1020000, engagement: 8.7, sentiment: 63 },
                { mentions: 1015000, engagement: 8.9, sentiment: 62 },
                { mentions: 1050000, engagement: 9.0, sentiment: 61 },
                { mentions: 1080000, engagement: 8.8, sentiment: 60 },
                { mentions: 1100000, engagement: 8.7, sentiment: 59 },
                { mentions: 1150000, engagement: 8.9, sentiment: 58 },
                { mentions: 1180000, engagement: 9.1, sentiment: 57 },
                { mentions: 1160000, engagement: 9.0, sentiment: 58 },
                { mentions: 1200000, engagement: 8.9, sentiment: 59 },
                { mentions: 1250000, engagement: 8.8, sentiment: 58 }
            ],
            weekly: [
                { mentions: 38500, engagement: 8.9, sentiment: 62 },
                { mentions: 39200, engagement: 8.8, sentiment: 61 },
                { mentions: 41500, engagement: 8.7, sentiment: 63 },
                { mentions: 40800, engagement: 8.9, sentiment: 62 },
                { mentions: 42000, engagement: 9.0, sentiment: 61 },
                { mentions: 35500, engagement: 8.8, sentiment: 60 },
                { mentions: 34000, engagement: 8.7, sentiment: 59 }
            ],
            hourly: Array.from({ length: 24 }, () => ({
                mentions: 1000 + Math.floor(Math.random() * 3000),
                engagement: 7 + Math.random() * 3,
                sentiment: 55 + Math.floor(Math.random() * 15)
            }))
        },
        "2": { // Paz Total
            monthly: [
                { mentions: 850000, engagement: 8.6, sentiment: 68 },
                { mentions: 875000, engagement: 8.5, sentiment: 67 },
                { mentions: 920000, engagement: 8.7, sentiment: 69 },
                { mentions: 890000, engagement: 8.4, sentiment: 68 },
                { mentions: 650000, engagement: 8.8, sentiment: 70 },
                { mentions: 780000, engagement: 8.7, sentiment: 69 },
                { mentions: 960000, engagement: 8.6, sentiment: 68 },
                { mentions: 1050000, engagement: 8.9, sentiment: 71 },
                { mentions: 1080000, engagement: 9.0, sentiment: 72 },
                { mentions: 1020000, engagement: 8.8, sentiment: 70 },
                { mentions: 1100000, engagement: 8.9, sentiment: 71 },
                { mentions: 999000, engagement: 9.1, sentiment: 72 }
            ],
            weekly: [
                { mentions: 35200, engagement: 8.6, sentiment: 68 },
                { mentions: 36800, engagement: 8.7, sentiment: 69 },
                { mentions: 38500, engagement: 8.8, sentiment: 70 },
                { mentions: 37900, engagement: 8.7, sentiment: 69 },
                { mentions: 39200, engagement: 8.9, sentiment: 71 },
                { mentions: 33500, engagement: 8.5, sentiment: 67 },
                { mentions: 32000, engagement: 8.4, sentiment: 66 }
            ],
            hourly: Array.from({ length: 24 }, () => ({
                mentions: 1200 + Math.floor(Math.random() * 2800),
                engagement: 8 + Math.random() * 2,
                sentiment: 65 + Math.floor(Math.random() * 10)
            }))
        },
        "3": { // Economía y Desarrollo
            monthly: [
                { mentions: 850000, engagement: 8.6, sentiment: 68 },
                { mentions: 875000, engagement: 8.5, sentiment: 67 },
                { mentions: 920000, engagement: 8.7, sentiment: 69 },
                { mentions: 890000, engagement: 8.4, sentiment: 68 },
                { mentions: 950000, engagement: 8.8, sentiment: 70 },
                { mentions: 980000, engagement: 8.7, sentiment: 69 },
                { mentions: 960000, engagement: 8.6, sentiment: 68 },
                { mentions: 990000, engagement: 8.9, sentiment: 89 },
                { mentions: 1080000, engagement: 9.0, sentiment: 90 },
                { mentions: 1020000, engagement: 8.8, sentiment: 91 },
                { mentions: 1100000, engagement: 8.9, sentiment: 92 },
                { mentions: 1050000, engagement: 9.1, sentiment: 88 }
            ],
            weekly: [
                { mentions: 35200, engagement: 8.6, sentiment: 68 },
                { mentions: 36800, engagement: 8.7, sentiment: 69 },
                { mentions: 38500, engagement: 8.8, sentiment: 70 },
                { mentions: 37900, engagement: 8.7, sentiment: 69 },
                { mentions: 39200, engagement: 8.9, sentiment: 71 },
                { mentions: 33500, engagement: 8.5, sentiment: 67 },
                { mentions: 32000, engagement: 8.4, sentiment: 66 }
            ],
            hourly: Array.from({ length: 24 }, () => ({
                mentions: 1200 + Math.floor(Math.random() * 2800),
                engagement: 8 + Math.random() * 2,
                sentiment: 65 + Math.floor(Math.random() * 10)
            }))
        },
        "4": { // Transición Energética
            monthly: [
                { mentions: 720000, engagement: 7.8, sentiment: 70 },
                { mentions: 745000, engagement: 7.9, sentiment: 69 },
                { mentions: 780000, engagement: 8.0, sentiment: 71 },
                { mentions: 760000, engagement: 7.9, sentiment: 70 },
                { mentions: 820000, engagement: 8.2, sentiment: 72 },
                { mentions: 850000, engagement: 8.3, sentiment: 71 },
                { mentions: 830000, engagement: 8.1, sentiment: 70 },
                { mentions: 880000, engagement: 8.4, sentiment: 73 },
                { mentions: 920000, engagement: 8.5, sentiment: 74 },
                { mentions: 890000, engagement: 8.3, sentiment: 72 },
                { mentions: 850000, engagement: 8.6, sentiment: 73 },
                { mentions: 880000, engagement: 8.7, sentiment: 74 }
            ],
            weekly: [
                { mentions: 29800, engagement: 7.8, sentiment: 70 },
                { mentions: 31200, engagement: 7.9, sentiment: 71 },
                { mentions: 32500, engagement: 8.0, sentiment: 72 },
                { mentions: 31800, engagement: 7.9, sentiment: 71 },
                { mentions: 33000, engagement: 8.1, sentiment: 73 },
                { mentions: 28500, engagement: 7.7, sentiment: 69 },
                { mentions: 27000, engagement: 7.6, sentiment: 68 }
            ],
            hourly: Array.from({ length: 24 }, () => ({
                mentions: 900 + Math.floor(Math.random() * 2500),
                engagement: 7.5 + Math.random() * 2,
                sentiment: 68 + Math.floor(Math.random() * 12)
            }))
        },
        "5": { // Educación y Cultura
            monthly: [
                { mentions: 620000, engagement: 7.8, sentiment: 70 },
                { mentions: 645000, engagement: 7.9, sentiment: 69 },
                { mentions: 680000, engagement: 8.0, sentiment: 71 },
                { mentions: 560000, engagement: 7.9, sentiment: 70 },
                { mentions: 420000, engagement: 8.2, sentiment: 72 },
                { mentions: 450000, engagement: 8.3, sentiment: 71 },
                { mentions: 430000, engagement: 8.1, sentiment: 70 },
                { mentions: 120000, engagement: 8.4, sentiment: 50 },
                { mentions: 250000, engagement: 8.5, sentiment: 74 },
                { mentions: 790000, engagement: 8.3, sentiment: 72 },
                { mentions: 750000, engagement: 8.6, sentiment: 73 },
                { mentions: 880000, engagement: 8.7, sentiment: 84 }
            ],
            weekly: [
                { mentions: 9800, engagement: 7.8, sentiment: 50 },
                { mentions: 1200, engagement: 7.9, sentiment: 71 },
                { mentions: 34500, engagement: 8.0, sentiment: 52 },
                { mentions: 1800, engagement: 7.9, sentiment: 71 },
                { mentions: 10000, engagement: 8.1, sentiment: 73 },
                { mentions: 2500, engagement: 7.7, sentiment: 69 },
                { mentions: 27000, engagement: 7.6, sentiment: 68 }
            ],
            hourly: Array.from({ length: 24 }, () => ({
                mentions: 900 + Math.floor(Math.random() * 2500),
                engagement: 7.5 + Math.random() * 2,
                sentiment: 68 + Math.floor(Math.random() * 12)
            }))
        }
    }
};