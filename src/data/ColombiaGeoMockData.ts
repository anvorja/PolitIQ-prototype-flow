import {DepartmentIntensityData, GeoData} from "@/types/geo";

export const departmentIntensityData: DepartmentIntensityData = {
    "ANTIOQUIA": 85,
    "ATLANTICO": 75,
    "SANTAFE DE BOGOTA D.C": 95,
    "BOLIVAR": 50,
    "BOYACA": 45,
    "CALDAS": 35,
    "CAQUETA": 25,
    "CAUCA": 30,
    "CESAR": 40,
    "CORDOBA": 45,
    "CUNDINAMARCA": 80,
    "CHOCO": 20,
    "HUILA": 35,
    "LA GUAJIRA": 30,
    "MAGDALENA": 40,
    "META": 35,
    "NARINO": 40,
    "NORTE DE SANTANDER": 45,
    "QUINDIO": 30,
    "RISARALDA": 40,
    "SANTANDER": 60,
    "SUCRE": 35,
    "TOLIMA": 45,
    "VALLE DEL CAUCA": 70,
    "ARAUCA": 25,
    "CASANARE": 30,
    "PUTUMAYO": 20,
    "AMAZONAS": 15,
    "GUAINIA": 10,
    "GUAVIARE": 15,
    "VAUPES": 10,
    "VICHADA": 15,
    "ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA": 25
} as const;

export const colombiaGeoData: GeoData[] = [
    {
        region: "SANTAFE DE BOGOTA D.C",
        mentions: 12500,
        sentiment: 75,
        coordinates: [-74.0721, 4.7110]
    },
    {
        region: "ANTIOQUIA",
        mentions: 8900,
        sentiment: 72,
        coordinates: [-75.5742, 6.2442]
    },
    {
        region: "VALLE DEL CAUCA",
        mentions: 7900,
        sentiment: 70,
        coordinates: [-76.5225, 3.4372]
    },
    {
        region: "ATLANTICO",
        mentions: 5400,
        sentiment: 68,
        coordinates: [-74.7963, 10.9639]
    },
    {
        region: "SANTANDER",
        mentions: 4800,
        sentiment: 70,
        coordinates: [-73.1198, 7.1191]
    },
    {
        region: "CUNDINAMARCA",
        mentions: 4200,
        sentiment: 73,
        coordinates: [-74.0745, 5.0268]
    },
    {
        region: "BOLIVAR",
        mentions: 3900,
        sentiment: 69,
        coordinates: [-75.5146, 10.3997]
    },
    {
        region: "TOLIMA",
        mentions: 3100,
        sentiment: 67,
        coordinates: [-75.2809, 4.4385]
    }
];