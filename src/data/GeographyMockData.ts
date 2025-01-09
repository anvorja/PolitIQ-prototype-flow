// src/data/GeographyMockData.ts

import type {
    RegionalTopic,
    VotingIntention,
    RegionalNeed,
    ElectoralStrength,
    TerritorialEvent,
    LocalCompetitor,
    AIRecommendation,
    RegionalAnalytics
} from '@/types/geography';

export const regionalTopics: RegionalTopic[] = [
    {
        id: "1",
        name: "Seguridad Ciudadana",
        description: "Preocupación por el aumento de la inseguridad en zonas urbanas",
        sentiment: 35,
        intensity: 85,
        trend: "up",
        changePercent: 12.5,
        relatedTopics: ["Policía", "Delincuencia", "Videovigilancia", "Hurtos", "Seguridad Privada"],
        affectedRegions: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"]
    },
    {
        id: "2",
        name: "Transporte Público",
        description: "Demanda de mejoras en el sistema de transporte público y movilidad urbana",
        sentiment: 42,
        intensity: 75,
        trend: "stable",
        changePercent: -2.3,
        relatedTopics: ["Metro", "TransMilenio", "Movilidad", "Ciclovías", "Tarifas"],
        affectedRegions: ["Bogotá", "Medellín", "Cali", "Bucaramanga"]
    },
    {
        id: "3",
        name: "Empleo y Economía",
        description: "Crisis económica y desempleo afectando a la población joven",
        sentiment: 28,
        intensity: 90,
        trend: "up",
        changePercent: 15.8,
        relatedTopics: ["Desempleo", "Inflación", "Emprendimiento", "Salarios", "Economía Informal"],
        affectedRegions: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cúcuta", "Pereira"]
    },
    {
        id: "4",
        name: "Salud Pública",
        description: "Acceso y calidad del sistema de salud pública",
        sentiment: 45,
        intensity: 70,
        trend: "down",
        changePercent: -8.2,
        relatedTopics: ["EPS", "Hospitales", "Medicamentos", "Atención Primaria", "Especialistas"],
        affectedRegions: ["Bogotá", "Antioquia", "Valle del Cauca", "Atlántico"]
    },
    {
        id: "5",
        name: "Educación",
        description: "Calidad educativa y acceso a educación superior",
        sentiment: 52,
        intensity: 65,
        trend: "up",
        changePercent: 5.7,
        relatedTopics: ["Universidades", "Becas", "Infraestructura Educativa", "Deserción", "Calidad"],
        affectedRegions: ["Bogotá", "Antioquia", "Valle del Cauca", "Santander"]
    },
    {
        id: "6",
        name: "Medio Ambiente",
        description: "Preocupación por la protección ambiental y cambio climático",
        sentiment: 58,
        intensity: 60,
        trend: "up",
        changePercent: 18.3,
        relatedTopics: ["Contaminación", "Reciclaje", "Energías Renovables", "Deforestación", "Minería"],
        affectedRegions: ["Amazonas", "Chocó", "Antioquia", "Cundinamarca"]
    },
    {
        id: "7",
        name: "Corrupción",
        description: "Denuncias y casos de corrupción en la administración pública",
        sentiment: 15,
        intensity: 88,
        trend: "up",
        changePercent: 22.1,
        relatedTopics: ["Transparencia", "Contratación Pública", "Denuncias", "Fiscalización", "Recursos Públicos"],
        affectedRegions: ["Bogotá", "Córdoba", "La Guajira", "Valle del Cauca"]
    },
    {
        id: "8",
        name: "Desarrollo Rural",
        description: "Problemáticas del campo y desarrollo agrícola",
        sentiment: 48,
        intensity: 72,
        trend: "stable",
        changePercent: 0.8,
        relatedTopics: ["Agricultura", "Vías Terciarias", "Créditos Rurales", "Tecnificación", "Comercialización"],
        affectedRegions: ["Boyacá", "Tolima", "Huila", "Meta", "Santander"]
    },
    {
        id: "9",
        name: "Vivienda",
        description: "Acceso a vivienda digna y programas habitacionales",
        sentiment: 55,
        intensity: 68,
        trend: "up",
        changePercent: 7.4,
        relatedTopics: ["Vivienda Social", "Subsidios", "Créditos", "Construcción", "Servicios Públicos"],
        affectedRegions: ["Bogotá", "Medellín", "Barranquilla", "Cali"]
    },
    {
        id: "10",
        name: "Servicios Públicos",
        description: "Cobertura y calidad de servicios públicos básicos",
        sentiment: 40,
        intensity: 78,
        trend: "down",
        changePercent: -12.6,
        relatedTopics: ["Agua", "Energía", "Gas", "Internet", "Tarifas"],
        affectedRegions: ["La Guajira", "Chocó", "Córdoba", "Sucre", "Cauca"]
    }
];

export const votingIntentions: VotingIntention[] = [
    {
        region: "Bogotá",
        intentions: [
            {
                candidate: "Candidato A",
                percentage: 35.2,
                previousPercentage: 32.5,
                trend: "up"
            },
            {
                candidate: "Candidato B",
                percentage: 28.7,
                previousPercentage: 30.1,
                trend: "down"
            },
            {
                candidate: "Otros",
                percentage: 21.3,
                previousPercentage: 22.4,
                trend: "stable"
            }
        ],
        totalVoters: 5800000,
        abstentionRate: 45.3,
        undecided: 14.8,
        margin: 6.5,
        lastUpdate: "2025-01-05"
    },
    {
        region: "Antioquia",
        intentions: [
            {
                candidate: "Candidato A",
                percentage: 38.4,
                previousPercentage: 36.2,
                trend: "up"
            },
            {
                candidate: "Candidato B",
                percentage: 32.6,
                previousPercentage: 31.8,
                trend: "up"
            },
            {
                candidate: "Otros",
                percentage: 18.5,
                previousPercentage: 20.0,
                trend: "down"
            }
        ],
        totalVoters: 4200000,
        abstentionRate: 42.8,
        undecided: 10.5,
        margin: 5.8,
        lastUpdate: "2025-01-05"
    },
    {
        region: "Valle del Cauca",
        intentions: [
            {
                candidate: "Candidato A",
                percentage: 33.8,
                previousPercentage: 35.2,
                trend: "down"
            },
            {
                candidate: "Candidato B",
                percentage: 31.2,
                previousPercentage: 29.8,
                trend: "up"
            },
            {
                candidate: "Otros",
                percentage: 22.4,
                previousPercentage: 21.9,
                trend: "stable"
            }
        ],
        totalVoters: 3500000,
        abstentionRate: 47.2,
        undecided: 12.6,
        margin: 2.6,
        lastUpdate: "2025-01-05"
    },
    {
        region: "Atlántico",
        intentions: [
            {
                candidate: "Candidato B",
                percentage: 36.5,
                previousPercentage: 34.2,
                trend: "up"
            },
            {
                candidate: "Candidato A",
                percentage: 29.8,
                previousPercentage: 31.5,
                trend: "down"
            },
            {
                candidate: "Otros",
                percentage: 19.7,
                previousPercentage: 20.3,
                trend: "stable"
            }
        ],
        totalVoters: 2100000,
        abstentionRate: 49.5,
        undecided: 14.0,
        margin: 6.7,
        lastUpdate: "2025-01-05"
    },
    {
        region: "Santander",
        intentions: [
            {
                candidate: "Candidato A",
                percentage: 34.6,
                previousPercentage: 33.9,
                trend: "stable"
            },
            {
                candidate: "Candidato B",
                percentage: 33.8,
                previousPercentage: 32.5,
                trend: "up"
            },
            {
                candidate: "Otros",
                percentage: 20.1,
                previousPercentage: 21.6,
                trend: "down"
            }
        ],
        totalVoters: 1800000,
        abstentionRate: 44.8,
        undecided: 11.5,
        margin: 0.8,
        lastUpdate: "2025-01-05"
    },
    {
        region: "Cundinamarca",
        intentions: [
            {
                candidate: "Candidato A",
                percentage: 35.9,
                previousPercentage: 34.7,
                trend: "up"
            },
            {
                candidate: "Candidato B",
                percentage: 30.2,
                previousPercentage: 31.4,
                trend: "down"
            },
            {
                candidate: "Otros",
                percentage: 21.9,
                previousPercentage: 21.2,
                trend: "stable"
            }
        ],
        totalVoters: 2300000,
        abstentionRate: 43.5,
        undecided: 12.0,
        margin: 5.7,
        lastUpdate: "2025-01-05"
    },
    {
        region: "Bolivar",
        intentions: [
            {
                candidate: "Candidato B",
                percentage: 34.8,
                previousPercentage: 33.2,
                trend: "up"
            },
            {
                candidate: "Candidato A",
                percentage: 31.5,
                previousPercentage: 32.8,
                trend: "down"
            },
            {
                candidate: "Otros",
                percentage: 20.7,
                previousPercentage: 20.5,
                trend: "stable"
            }
        ],
        totalVoters: 1600000,
        abstentionRate: 51.2,
        undecided: 13.0,
        margin: 3.3,
        lastUpdate: "2025-01-05"
    },
    {
        region: "Meta",
        intentions: [
            {
                candidate: "Candidato A",
                percentage: 33.4,
                previousPercentage: 32.9,
                trend: "stable"
            },
            {
                candidate: "Candidato B",
                percentage: 32.6,
                previousPercentage: 31.8,
                trend: "up"
            },
            {
                candidate: "Otros",
                percentage: 21.5,
                previousPercentage: 22.3,
                trend: "down"
            }
        ],
        totalVoters: 800000,
        abstentionRate: 46.8,
        undecided: 12.5,
        margin: 0.8,
        lastUpdate: "2025-01-05"
    }
];

export const regionalNeeds: RegionalNeed[] = [
    {
        id: "1",
        region: "Antioquia",
        category: "Infraestructura",
        description: "Mejoramiento de vías terciarias en zonas rurales productivas",
        priority: "high",
        impact: 85,
        affectedPopulation: 250000,
        status: "pending",
        proposedSolutions: [
            "Programa de pavimentación participativa",
            "Alianzas público-privadas para mantenimiento vial",
            "Implementación de peajes comunitarios"
        ]
    },
    {
        id: "2",
        region: "Chocó",
        category: "Salud",
        description: "Déficit de centros de salud y personal médico en zonas remotas",
        priority: "critical",
        impact: 92,
        affectedPopulation: 180000,
        status: "in-progress",
        proposedSolutions: [
            "Construcción de centros de salud móviles",
            "Programa de incentivos para médicos rurales",
            "Telemedicina para zonas apartadas"
        ]
    },
    {
        id: "3",
        region: "La Guajira",
        category: "Agua",
        description: "Acceso a agua potable en comunidades indígenas",
        priority: "critical",
        impact: 95,
        affectedPopulation: 320000,
        status: "in-progress",
        proposedSolutions: [
            "Construcción de pozos profundos",
            "Sistemas de recolección de agua lluvia",
            "Plantas desalinizadoras solares"
        ]
    },
    {
        id: "4",
        region: "Bogotá D.C.",
        category: "Movilidad",
        description: "Congestión en corredores principales y tiempos de desplazamiento",
        priority: "high",
        impact: 88,
        affectedPopulation: 4500000,
        status: "in-progress",
        proposedSolutions: [
            "Expansión del sistema TransMilenio",
            "Implementación de pico y placa solidario",
            "Construcción de ciclorrutas"
        ]
    },
    {
        id: "5",
        region: "Valle del Cauca",
        category: "Seguridad",
        description: "Incremento de delincuencia común en zonas urbanas",
        priority: "high",
        impact: 82,
        affectedPopulation: 1200000,
        status: "pending",
        proposedSolutions: [
            "Aumento de pie de fuerza policial",
            "Sistema de vigilancia inteligente",
            "Programas de prevención juvenil"
        ]
    },
    {
        id: "6",
        region: "Boyacá",
        category: "Agricultura",
        description: "Modernización de sistemas de riego para pequeños agricultores",
        priority: "medium",
        impact: 75,
        affectedPopulation: 150000,
        status: "pending",
        proposedSolutions: [
            "Sistemas de riego por goteo",
            "Capacitación en tecnificación agrícola",
            "Créditos blandos para infraestructura"
        ]
    },
    {
        id: "7",
        region: "Santander",
        category: "Educación",
        description: "Brecha digital en instituciones educativas rurales",
        priority: "high",
        impact: 80,
        affectedPopulation: 95000,
        status: "in-progress",
        proposedSolutions: [
            "Dotación de equipos de cómputo",
            "Instalación de internet satelital",
            "Capacitación docente en TICs"
        ]
    },
    {
        id: "8",
        region: "Córdoba",
        category: "Empleo",
        description: "Alto desempleo juvenil y falta de oportunidades laborales",
        priority: "high",
        impact: 85,
        affectedPopulation: 280000,
        status: "pending",
        proposedSolutions: [
            "Programa de primer empleo",
            "Centro de emprendimiento juvenil",
            "Alianzas con sector privado"
        ]
    },
    {
        id: "9",
        region: "Amazonas",
        category: "Medio Ambiente",
        description: "Deforestación y pérdida de biodiversidad",
        priority: "critical",
        impact: 90,
        affectedPopulation: 80000,
        status: "in-progress",
        proposedSolutions: [
            "Programa de guardabosques comunitarios",
            "Alternativas económicas sostenibles",
            "Monitoreo satelital de bosques"
        ]
    },
    {
        id: "10",
        region: "Cundinamarca",
        category: "Vivienda",
        description: "Déficit de vivienda social en municipios dormitorio",
        priority: "medium",
        impact: 78,
        affectedPopulation: 180000,
        status: "pending",
        proposedSolutions: [
            "Programa de vivienda de interés social",
            "Subsidios para mejoramiento de vivienda",
            "Banco de materiales"
        ]
    },
    {
        id: "11",
        region: "Atlántico",
        category: "Servicios Públicos",
        description: "Interrupciones frecuentes en suministro eléctrico",
        priority: "high",
        impact: 83,
        affectedPopulation: 850000,
        status: "in-progress",
        proposedSolutions: [
            "Modernización de red eléctrica",
            "Energías alternativas",
            "Sistema de respuesta rápida"
        ]
    },
    {
        id: "12",
        region: "Cauca",
        category: "Social",
        description: "Conflictos territoriales y seguridad en zonas rurales",
        priority: "critical",
        impact: 87,
        affectedPopulation: 420000,
        status: "pending",
        proposedSolutions: [
            "Mesa de diálogo territorial",
            "Programa de desarrollo alternativo",
            "Fortalecimiento de guardia indígena"
        ]
    }
];

export const electoralStrengths: ElectoralStrength[] = [
    {
        region: "Valle del Cauca",
        overallStrength: 72,
        demographics: [
            {
                category: "Jóvenes (18-25)",
                strength: 65,
                potentialVoters: 450000
            },
            {
                category: "Adultos (26-45)",
                strength: 75,
                potentialVoters: 850000
            },
            {
                category: "Adultos mayores (46+)",
                strength: 68,
                potentialVoters: 600000
            },
            {
                category: "Mujeres",
                strength: 71,
                potentialVoters: 980000
            },
            {
                category: "Clase media",
                strength: 74,
                potentialVoters: 1200000
            }
        ],
        historicalPerformance: [
            {
                year: 2022,
                votes: 980000,
                percentage: 52.3
            },
            {
                year: 2019,
                votes: 920000,
                percentage: 48.5
            },
            {
                year: 2015,
                votes: 850000,
                percentage: 45.2
            }
        ],
        keyAllies: [
            "Asociación de Comerciantes",
            "Sindicato de Trabajadores",
            "Fundación Valle Progresa",
            "Líderes Comunitarios Zona Este"
        ],
        challenges: [
            "Alta abstención",
            "Desconfianza institucional",
            "Competencia fuerte en zona norte",
            "Problemas de seguridad"
        ]
    },
    {
        region: "Antioquia",
        overallStrength: 78,
        demographics: [
            {
                category: "Jóvenes (18-25)",
                strength: 70,
                potentialVoters: 520000
            },
            {
                category: "Adultos (26-45)",
                strength: 82,
                potentialVoters: 920000
            },
            {
                category: "Adultos mayores (46+)",
                strength: 75,
                potentialVoters: 680000
            },
            {
                category: "Rural",
                strength: 68,
                potentialVoters: 450000
            },
            {
                category: "Urbano",
                strength: 82,
                potentialVoters: 1670000
            }
        ],
        historicalPerformance: [
            {
                year: 2022,
                votes: 1250000,
                percentage: 54.8
            },
            {
                year: 2019,
                votes: 1180000,
                percentage: 51.2
            },
            {
                year: 2015,
                votes: 1050000,
                percentage: 48.7
            }
        ],
        keyAllies: [
            "Gremio Industrial",
            "Federación de Cafeteros",
            "Asociación de Universidades",
            "Movimiento Juvenil Antioqueño"
        ],
        challenges: [
            "Polarización política",
            "Fragmentación del voto urbano",
            "Acceso a zonas rurales",
            "Apatía juvenil"
        ]
    },
    {
        region: "Bogotá D.C.",
        overallStrength: 68,
        demographics: [
            {
                category: "Jóvenes (18-25)",
                strength: 62,
                potentialVoters: 850000
            },
            {
                category: "Adultos (26-45)",
                strength: 70,
                potentialVoters: 1500000
            },
            {
                category: "Clase media-alta",
                strength: 72,
                potentialVoters: 950000
            },
            {
                category: "Clase media-baja",
                strength: 65,
                potentialVoters: 1200000
            }
        ],
        historicalPerformance: [
            {
                year: 2022,
                votes: 1850000,
                percentage: 47.2
            },
            {
                year: 2019,
                votes: 1720000,
                percentage: 45.8
            }
        ],
        keyAllies: [
            "Asociación de Empresarios",
            "Red de Juntas de Acción Comunal",
            "Colectivos Universitarios",
            "Gremio de Transportadores"
        ],
        challenges: [
            "Alta volatilidad electoral",
            "Fragmentación del voto",
            "Descontento con administración actual",
            "Movilidad y seguridad"
        ]
    },
    {
        region: "Atlántico",
        overallStrength: 65,
        demographics: [
            {
                category: "Jóvenes (18-25)",
                strength: 58,
                potentialVoters: 280000
            },
            {
                category: "Adultos (26-45)",
                strength: 68,
                potentialVoters: 420000
            },
            {
                category: "Zona costera",
                strength: 72,
                potentialVoters: 350000
            }
        ],
        historicalPerformance: [
            {
                year: 2022,
                votes: 580000,
                percentage: 45.3
            },
            {
                year: 2019,
                votes: 520000,
                percentage: 42.8
            }
        ],
        keyAllies: [
            "Asociación Portuaria",
            "Gremio Turístico",
            "Líderes Barriales",
            "Sector Educativo"
        ],
        challenges: [
            "Clientelismo tradicional",
            "Abstencionismo costero",
            "Infraestructura deficiente",
            "Desempleo juvenil"
        ]
    },
    {
        region: "Santander",
        overallStrength: 70,
        demographics: [
            {
                category: "Jóvenes (18-25)",
                strength: 65,
                potentialVoters: 220000
            },
            {
                category: "Adultos (26-45)",
                strength: 73,
                potentialVoters: 380000
            },
            {
                category: "Rural",
                strength: 68,
                potentialVoters: 250000
            }
        ],
        historicalPerformance: [
            {
                year: 2022,
                votes: 480000,
                percentage: 49.5
            },
            {
                year: 2019,
                votes: 450000,
                percentage: 47.2
            }
        ],
        keyAllies: [
            "Cámara de Comercio",
            "Asociación de Agricultores",
            "Federación de Estudiantes",
            "Gremio Petrolero"
        ],
        challenges: [
            "Dispersión territorial",
            "Conservadurismo tradicional",
            "Conflictos ambientales",
            "Conectividad rural"
        ]
    }
];

export const territorialEvents: TerritorialEvent[] = [
    {
        id: "1",
        title: "Encuentro Comunitario Centro",
        description: "Diálogo con líderes comunitarios sobre seguridad y convivencia ciudadana",
        date: "2025-01-15T14:00:00",
        location: {
            region: "Bogotá",
            venue: "Centro Comunitario La Candelaria",
            coordinates: [-74.072092, 4.711089]
        },
        type: "community",
        expectedAttendance: 200,
        organizer: "Equipo de Campaña Local",
        status: "scheduled",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    },
    {
        id: "2",
        title: "Debate Regional Antioquia",
        description: "Debate sobre propuestas económicas y desarrollo regional",
        date: "2025-01-18T18:30:00",
        location: {
            region: "Antioquia",
            venue: "Universidad de Antioquia - Auditorio Principal",
            coordinates: [-75.569316, 6.267438]
        },
        type: "debate",
        expectedAttendance: 500,
        organizer: "Federación de Estudiantes",
        status: "completed",
        outcomes: {
            actualAttendance: 485,
            sentiment: 78,
            keyTakeaways: [
                "Alta receptividad a propuestas de empleo joven",
                "Preocupación por seguridad urbana",
                "Interés en proyectos de innovación"
            ]
        }
    },
    {
        id: "3",
        title: "Caravana por la Costa",
        description: "Recorrido por municipios costeros del Atlántico",
        date: "2025-01-20T09:00:00",
        location: {
            region: "Atlántico",
            venue: "Plaza Principal Puerto Colombia",
            coordinates: [-74.957522, 11.007057]
        },
        type: "rally",
        expectedAttendance: 1000,
        organizer: "Coordinación Regional Caribe",
        status: "scheduled",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    },
    {
        id: "4",
        title: "Encuentro Empresarial Valle",
        description: "Presentación de propuestas económicas al sector empresarial",
        date: "2025-01-22T10:00:00",
        location: {
            region: "Valle del Cauca",
            venue: "Cámara de Comercio de Cali",
            coordinates: [-76.533227, 3.451647]
        },
        type: "meeting",
        expectedAttendance: 150,
        organizer: "Equipo Económico",
        status: "completed",
        outcomes: {
            actualAttendance: 172,
            sentiment: 82,
            keyTakeaways: [
                "Apoyo a propuestas de simplificación tributaria",
                "Compromiso con proyectos de infraestructura",
                "Acuerdos para generación de empleo"
            ]
        }
    },
    {
        id: "5",
        title: "Foro Agropecuario Boyacá",
        description: "Diálogo con agricultores y ganaderos sobre política agraria",
        date: "2025-01-25T09:30:00",
        location: {
            region: "Boyacá",
            venue: "Centro de Convenciones Tunja",
            coordinates: [-73.357856, 5.544642]
        },
        type: "community",
        expectedAttendance: 300,
        organizer: "Federación de Agricultores",
        status: "in-progress",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    },
    {
        id: "6",
        title: "Cumbre de Juventudes",
        description: "Encuentro con organizaciones juveniles y estudiantes universitarios",
        date: "2025-01-28T15:00:00",
        location: {
            region: "Santander",
            venue: "Universidad Industrial de Santander",
            coordinates: [-73.121033, 7.137853]
        },
        type: "rally",
        expectedAttendance: 800,
        organizer: "Movimiento Juvenil",
        status: "scheduled",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    },
    {
        id: "7",
        title: "Mesa de Trabajo Ambiental",
        description: "Discusión sobre protección ambiental y desarrollo sostenible",
        date: "2025-01-30T14:30:00",
        location: {
            region: "Amazonas",
            venue: "Maloca Cultural Leticia",
            coordinates: [-69.940651, -4.215011]
        },
        type: "meeting",
        expectedAttendance: 100,
        organizer: "Coalición Ambiental",
        status: "scheduled",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    },
    {
        id: "8",
        title: "Debate Metropolitano",
        description: "Debate sobre movilidad y desarrollo urbano",
        date: "2025-02-02T19:00:00",
        location: {
            region: "Medellín",
            venue: "Teatro Metropolitano",
            coordinates: [-75.564577, 6.244203]
        },
        type: "debate",
        expectedAttendance: 600,
        organizer: "Medios Locales Unidos",
        status: "scheduled",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    },
    {
        id: "9",
        title: "Encuentro Minero-Energético",
        description: "Diálogo sobre políticas mineras y energéticas",
        date: "2025-02-05T10:00:00",
        location: {
            region: "Cesar",
            venue: "Centro de Convenciones La Mina",
            coordinates: [-73.250000, 9.333333]
        },
        type: "meeting",
        expectedAttendance: 250,
        organizer: "Asociación Minera",
        status: "cancelled",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    },
    {
        id: "10",
        title: "Foro de Seguridad Fronteriza",
        description: "Análisis de situación fronteriza y propuestas de seguridad",
        date: "2025-02-08T11:00:00",
        location: {
            region: "Norte de Santander",
            venue: "Hotel Casino Internacional Cúcuta",
            coordinates: [-72.505960, 7.893921]
        },
        type: "meeting",
        expectedAttendance: 200,
        organizer: "Comité de Fronteras",
        status: "scheduled",
        outcomes: {
            actualAttendance: 0,
            sentiment: 0,
            keyTakeaways: []
        }
    }
];

export const localCompetitors: LocalCompetitor[] = [
    {
        id: "1",
        name: "Carlos Ramírez",
        party: "Partido Renovación",
        region: "Antioquia",
        currentPosition: "Concejal Medellín",
        strength: 68,
        supportBase: [
            {
                demographic: "Clase media",
                level: 75
            },
            {
                demographic: "Jóvenes profesionales",
                level: 72
            },
            {
                demographic: "Comerciantes",
                level: 65
            },
            {
                demographic: "Sector educativo",
                level: 70
            }
        ],
        keyProposals: [
            "Seguridad ciudadana integral",
            "Emprendimiento juvenil",
            "Modernización del transporte público",
            "Reducción de impuestos locales"
        ],
        recentActivities: [
            {
                date: "2025-01-03",
                activity: "Debate en universidad local",
                impact: 65
            },
            {
                date: "2025-01-07",
                activity: "Visita a mercados populares",
                impact: 58
            },
            {
                date: "2025-01-10",
                activity: "Entrevista en radio regional",
                impact: 72
            }
        ]
    },
    {
        id: "2",
        name: "María Valencia",
        party: "Movimiento Progresista",
        region: "Valle del Cauca",
        currentPosition: "Diputada Departamental",
        strength: 72,
        supportBase: [
            {
                demographic: "Mujeres urbanas",
                level: 78
            },
            {
                demographic: "Sindicatos",
                level: 82
            },
            {
                demographic: "Minorías étnicas",
                level: 75
            },
            {
                demographic: "Sector cultural",
                level: 70
            }
        ],
        keyProposals: [
            "Equidad de género",
            "Fortalecimiento de la educación pública",
            "Apoyo a la economía naranja",
            "Programas de vivienda social"
        ],
        recentActivities: [
            {
                date: "2025-01-05",
                activity: "Foro de mujeres líderes",
                impact: 85
            },
            {
                date: "2025-01-08",
                activity: "Encuentro con artistas locales",
                impact: 68
            },
            {
                date: "2025-01-12",
                activity: "Asamblea barrial",
                impact: 73
            }
        ]
    },
    {
        id: "3",
        name: "Jorge Herrera",
        party: "Alianza Ciudadana",
        region: "Cundinamarca",
        currentPosition: "Ex Alcalde de Chía",
        strength: 65,
        supportBase: [
            {
                demographic: "Clase media-alta",
                level: 70
            },
            {
                demographic: "Empresarios",
                level: 75
            },
            {
                demographic: "Adultos mayores",
                level: 68
            },
            {
                demographic: "Sector inmobiliario",
                level: 72
            }
        ],
        keyProposals: [
            "Desarrollo urbano sostenible",
            "Atracción de inversiones",
            "Mejoramiento vial",
            "Seguridad metropolitana"
        ],
        recentActivities: [
            {
                date: "2025-01-04",
                activity: "Reunión con empresarios",
                impact: 70
            },
            {
                date: "2025-01-09",
                activity: "Recorrido por obras públicas",
                impact: 62
            },
            {
                date: "2025-01-11",
                activity: "Conferencia de prensa",
                impact: 58
            }
        ]
    },
    {
        id: "4",
        name: "Ana Lucía Martínez",
        party: "Fuerza Social",
        region: "Atlántico",
        currentPosition: "Representante a la Cámara",
        strength: 75,
        supportBase: [
            {
                demographic: "Sector popular",
                level: 85
            },
            {
                demographic: "Pescadores",
                level: 78
            },
            {
                demographic: "Jóvenes",
                level: 70
            },
            {
                demographic: "Maestros",
                level: 75
            }
        ],
        keyProposals: [
            "Desarrollo portuario",
            "Turismo sostenible",
            "Educación técnica",
            "Protección costera"
        ],
        recentActivities: [
            {
                date: "2025-01-06",
                activity: "Visita a puerto pesquero",
                impact: 82
            },
            {
                date: "2025-01-10",
                activity: "Inauguración de escuela técnica",
                impact: 75
            },
            {
                date: "2025-01-13",
                activity: "Evento cultural barrial",
                impact: 68
            }
        ]
    },
    {
        id: "5",
        name: "Ricardo Monsalve",
        party: "Coalición Popular",
        region: "Santander",
        currentPosition: "Secretario de Planeación",
        strength: 62,
        supportBase: [
            {
                demographic: "Sector rural",
                level: 75
            },
            {
                demographic: "Transportadores",
                level: 68
            },
            {
                demographic: "Comerciantes",
                level: 65
            },
            {
                demographic: "Adultos 40-60",
                level: 70
            }
        ],
        keyProposals: [
            "Desarrollo agroindustrial",
            "Mejoramiento vial rural",
            "Apoyo a pequeños comerciantes",
            "Seguridad vial"
        ],
        recentActivities: [
            {
                date: "2025-01-07",
                activity: "Reunión con agricultores",
                impact: 72
            },
            {
                date: "2025-01-11",
                activity: "Visita a mercado campesino",
                impact: 65
            },
            {
                date: "2025-01-14",
                activity: "Debate sobre infraestructura",
                impact: 58
            }
        ]
    }
];

export const aiRecommendations: AIRecommendation[] = [
    {
        id: "1",
        type: "strategy",
        title: "Fortalecer presencia en zona suroccidental",
        description: "Análisis indica oportunidad de crecimiento significativo en la región suroccidental del país, especialmente en zonas urbanas intermedias",
        priority: "high",
        rationale: "Baja presencia de competidores principales y alta densidad poblacional con tendencia de voto favorable",
        suggestedActions: [
            "Organizar 3 eventos comunitarios en próximas 2 semanas",
            "Activar campaña en redes sociales locales",
            "Establecer alianzas con líderes comunitarios",
            "Implementar programa de visitas puerta a puerta"
        ],
        predictedOutcome: "Incremento de 5-8% en intención de voto",
        confidence: 85,
        relatedData: [
            {
                category: "Demografia",
                source: "Censo 2023",
                relevance: 90
            },
            {
                category: "Histórico Electoral",
                source: "Registraduría",
                relevance: 85
            }
        ],
        timestamp: "2025-01-07T09:30:00"
    },
    {
        id: "2",
        type: "warning",
        title: "Riesgo de pérdida de apoyo en sector industrial",
        description: "Tendencias muestran disminución de respaldo en zonas industriales clave de Antioquia y Valle",
        priority: "critical",
        rationale: "Propuestas económicas de competidores están ganando tracción entre trabajadores industriales",
        suggestedActions: [
            "Realizar foros específicos con sindicatos",
            "Reforzar propuestas de desarrollo industrial",
            "Campaña de comunicación enfocada en empleo",
            "Encuentros con líderes sindicales"
        ],
        predictedOutcome: "Recuperación de 3-4% en intención de voto del sector industrial",
        confidence: 78,
        relatedData: [
            {
                category: "Encuestas Sectoriales",
                source: "Firmas Encuestadoras",
                relevance: 92
            },
            {
                category: "Análisis de Redes",
                source: "Social Media",
                relevance: 85
            }
        ],
        timestamp: "2025-01-07T10:15:00"
    },
    {
        id: "3",
        type: "action",
        title: "Campaña digital juventud universitaria",
        description: "Oportunidad de captación de voto joven en principales ciudades universitarias",
        priority: "high",
        rationale: "Alto porcentaje de jóvenes indecisos con preocupaciones específicas no atendidas",
        suggestedActions: [
            "Crear contenido específico para TikTok e Instagram",
            "Organizar debates universitarios",
            "Lanzar programa de propuestas jóvenes",
            "Activar red de influencers académicos"
        ],
        predictedOutcome: "Aumento de 6-7% en apoyo de votantes 18-25 años",
        confidence: 82,
        relatedData: [
            {
                category: "Comportamiento Digital",
                source: "Análisis de Redes",
                relevance: 95
            },
            {
                category: "Encuestas Universitarias",
                source: "Estudios Académicos",
                relevance: 88
            }
        ],
        timestamp: "2025-01-07T11:00:00"
    },
    {
        id: "4",
        type: "response",
        title: "Contrarrestar narrativa económica negativa",
        description: "Surgimiento de narrativas críticas sobre propuestas económicas en medios y redes",
        priority: "high",
        rationale: "Análisis de sentimiento muestra incremento de dudas sobre viabilidad económica",
        suggestedActions: [
            "Publicar white paper económico detallado",
            "Coordinar entrevistas con economistas aliados",
            "Producir videos explicativos cortos",
            "Activar voceros económicos en regiones"
        ],
        predictedOutcome: "Neutralización de críticas y mejora de 4-5% en percepción",
        confidence: 75,
        relatedData: [
            {
                category: "Análisis de Medios",
                source: "Monitoreo de Prensa",
                relevance: 90
            },
            {
                category: "Sentiment Analysis",
                source: "Social Media",
                relevance: 85
            }
        ],
        timestamp: "2025-01-07T12:30:00"
    },
    {
        id: "5",
        type: "strategy",
        title: "Reforzar mensaje en región Caribe",
        description: "Oportunidad de consolidación en departamentos costeños con mensaje regionalista",
        priority: "medium",
        rationale: "Alta receptividad a propuestas de desarrollo regional y autonomía",
        suggestedActions: [
            "Desarrollar agenda específica para el Caribe",
            "Realizar gira por capitales costeñas",
            "Activar líderes regionales clave",
            "Campaña de medios regionales"
        ],
        predictedOutcome: "Incremento de 4-6% en intención de voto regional",
        confidence: 80,
        relatedData: [
            {
                category: "Estudios Regionales",
                source: "Think Tanks",
                relevance: 88
            },
            {
                category: "Histórico Electoral",
                source: "Registraduría",
                relevance: 85
            }
        ],
        timestamp: "2025-01-07T14:00:00"
    },
    {
        id: "6",
        type: "warning",
        title: "Vulnerabilidad en mensaje ambiental",
        description: "Detección de inconsistencias en propuestas ambientales que pueden ser explotadas",
        priority: "high",
        rationale: "Análisis de discurso muestra potenciales contradicciones en política ambiental",
        suggestedActions: [
            "Revisar y alinear mensajes ambientales",
            "Preparar documento de política ambiental",
            "Consultar con expertos del sector",
            "Desarrollar respuestas a críticas potenciales"
        ],
        predictedOutcome: "Prevención de pérdida de 3-4% en segmentos ambientalistas",
        confidence: 88,
        relatedData: [
            {
                category: "Análisis de Discurso",
                source: "AI Text Analysis",
                relevance: 92
            },
            {
                category: "Tendencias Ambientales",
                source: "NGOs Reports",
                relevance: 85
            }
        ],
        timestamp: "2025-01-07T15:30:00"
    }
];

export const regionalAnalytics: RegionalAnalytics[] = [
    {
        region: "Cundinamarca",
        demographics: {
            totalPopulation: 3200000,
            votingAge: 2400000,
            registered: 2100000,
            ageDistribution: [
                {
                    range: "18-25",
                    percentage: 22
                },
                {
                    range: "26-40",
                    percentage: 35
                },
                {
                    range: "41-60",
                    percentage: 28
                },
                {
                    range: "60+",
                    percentage: 15
                }
            ],
            socioeconomic: [
                {
                    level: "Alto",
                    percentage: 15
                },
                {
                    level: "Medio",
                    percentage: 45
                },
                {
                    level: "Bajo",
                    percentage: 40
                }
            ]
        },
        politicalContext: {
            incumbentParty: "Partido Actual",
            previousResults: [
                {
                    year: 2022,
                    winner: "Partido X",
                    margin: 5.2
                },
                {
                    year: 2019,
                    winner: "Partido Y",
                    margin: 3.8
                }
            ],
            keyIssues: ["Seguridad", "Transporte", "Empleo", "Vivienda"]
        },
        campaignMetrics: {
            awarenessLevel: 65,
            favorability: 58    ,
            messageResonance: 72,
            volunteerBase: 1200,
            resources: [
                {
                    type: "Financiero",
                    status: 75
                },
                {
                    type: "Humano",
                    status: 82
                },
                {
                    type: "Digital",
                    status: 68
                }
            ]
        }
    },
    {
        region: "Antioquia",
        demographics: {
            totalPopulation: 6700000,
            votingAge: 5100000,
            registered: 4800000,
            ageDistribution: [
                {
                    range: "18-25",
                    percentage: 24
                },
                {
                    range: "26-40",
                    percentage: 33
                },
                {
                    range: "41-60",
                    percentage: 29
                },
                {
                    range: "60+",
                    percentage: 14
                }
            ],
            socioeconomic: [
                {
                    level: "Alto",
                    percentage: 18
                },
                {
                    level: "Medio",
                    percentage: 48
                },
                {
                    level: "Bajo",
                    percentage: 34
                }
            ]
        },
        politicalContext: {
            incumbentParty: "Coalición Regional",
            previousResults: [
                {
                    year: 2022,
                    winner: "Partido Z",
                    margin: 8.5
                },
                {
                    year: 2019,
                    winner: "Partido Z",
                    margin: 7.2
                }
            ],
            keyIssues: ["Desarrollo Industrial", "Seguridad", "Innovación", "Infraestructura"]
        },
        campaignMetrics: {
            awarenessLevel: 78,
            favorability: 72,
            messageResonance: 75,
            volunteerBase: 2800,
            resources: [
                {
                    type: "Financiero",
                    status: 85
                },
                {
                    type: "Humano",
                    status: 88
                },
                {
                    type: "Digital",
                    status: 82
                }
            ]
        }
    },
    {
        region: "Valle del Cauca",
        demographics: {
            totalPopulation: 4800000,
            votingAge: 3600000,
            registered: 3200000,
            ageDistribution: [
                {
                    range: "18-25",
                    percentage: 23
                },
                {
                    range: "26-40",
                    percentage: 34
                },
                {
                    range: "41-60",
                    percentage: 28
                },
                {
                    range: "60+",
                    percentage: 15
                }
            ],
            socioeconomic: [
                {
                    level: "Alto",
                    percentage: 16
                },
                {
                    level: "Medio",
                    percentage: 44
                },
                {
                    level: "Bajo",
                    percentage: 40
                }
            ]
        },
        politicalContext: {
            incumbentParty: "Movimiento Social",
            previousResults: [
                {
                    year: 2022,
                    winner: "Partido W",
                    margin: 4.8
                },
                {
                    year: 2019,
                    winner: "Partido V",
                    margin: 3.5
                }
            ],
            keyIssues: ["Empleo", "Seguridad", "Salud", "Educación"]
        },
        campaignMetrics: {
            awarenessLevel: 70,
            favorability: 65,
            messageResonance: 68,
            volunteerBase: 1800,
            resources: [
                {
                    type: "Financiero",
                    status: 78
                },
                {
                    type: "Humano",
                    status: 75
                },
                {
                    type: "Digital",
                    status: 72
                }
            ]
        }
    },
    {
        region: "Atlántico",
        demographics: {
            totalPopulation: 2600000,
            votingAge: 1950000,
            registered: 1750000,
            ageDistribution: [
                {
                    range: "18-25",
                    percentage: 25
                },
                {
                    range: "26-40",
                    percentage: 35
                },
                {
                    range: "41-60",
                    percentage: 26
                },
                {
                    range: "60+",
                    percentage: 14
                }
            ],
            socioeconomic: [
                {
                    level: "Alto",
                    percentage: 12
                },
                {
                    level: "Medio",
                    percentage: 42
                },
                {
                    level: "Bajo",
                    percentage: 46
                }
            ]
        },
        politicalContext: {
            incumbentParty: "Alianza Costeña",
            previousResults: [
                {
                    year: 2022,
                    winner: "Partido U",
                    margin: 6.2
                },
                {
                    year: 2019,
                    winner: "Partido T",
                    margin: 5.5
                }
            ],
            keyIssues: ["Empleo", "Infraestructura", "Salud", "Educación"]
        },
        campaignMetrics: {
            awarenessLevel: 68,
            favorability: 62,
            messageResonance: 65,
            volunteerBase: 950,
            resources: [
                {
                    type: "Financiero",
                    status: 70
                },
                {
                    type: "Humano",
                    status: 75
                },
                {
                    type: "Digital",
                    status: 65
                }
            ]
        }
    },
    {
        region: "Santander",
        demographics: {
            totalPopulation: 2200000,
            votingAge: 1650000,
            registered: 1480000,
            ageDistribution: [
                {
                    range: "18-25",
                    percentage: 21
                },
                {
                    range: "26-40",
                    percentage: 32
                },
                {
                    range: "41-60",
                    percentage: 30
                },
                {
                    range: "60+",
                    percentage: 17
                }
            ],
            socioeconomic: [
                {
                    level: "Alto",
                    percentage: 15
                },
                {
                    level: "Medio",
                    percentage: 47
                },
                {
                    level: "Bajo",
                    percentage: 38
                }
            ]
        },
        politicalContext: {
            incumbentParty: "Movimiento Regional",
            previousResults: [
                {
                    year: 2022,
                    winner: "Partido S",
                    margin: 7.8
                },
                {
                    year: 2019,
                    winner: "Partido R",
                    margin: 6.5
                }
            ],
            keyIssues: ["Desarrollo Económico", "Infraestructura", "Educación", "Turismo"]
        },
        campaignMetrics: {
            awarenessLevel: 72,
            favorability: 68,
            messageResonance: 70,
            volunteerBase: 1100,
            resources: [
                {
                    type: "Financiero",
                    status: 75
                },
                {
                    type: "Humano",
                    status: 78
                },
                {
                    type: "Digital",
                    status: 70
                }
            ]
        }
    }
];

export const departmentIntensityData: { [key: string]: number } = {
    "AMAZONAS": 15,
    "ANTIOQUIA": 85,
    "ARAUCA": 25,
    "ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA": 25,
    "ATLANTICO": 75,
    "SANTAFE DE BOGOTA D.C.": 95,
    "BOLIVAR": 50,
    "BOYACA": 45,
    "CALDAS": 35,
    "CAQUETA": 25,
    "CASANARE": 30,
    "CAUCA": 30,
    "CESAR": 40,
    "CHOCO": 20,
    "CORDOBA": 45,
    "CUNDINAMARCA": 80,
    "GUAINIA": 10,
    "GUAVIARE": 15,
    "HUILA": 35,
    "LA GUAJIRA": 30,
    "MAGDALENA": 40,
    "META": 35,
    "NARINO": 40,
    "NORTE DE SANTANDER": 45,
    "PUTUMAYO": 20,
    "QUINDIO": 30,
    "RISARALDA": 40,
    "SANTANDER": 60,
    "SUCRE": 35,
    "TOLIMA": 45,
    "VALLE DEL CAUCA": 70,
    "VAUPES": 10,
    "VICHADA": 15
};