// src/data/ColombiaRegionMapping.ts

export type RegionName = 'andina' | 'caribe' | 'pacifica' | 'orinoquia' | 'amazonica';

export const COLOMBIA_REGIONS: Record<RegionName, string> = {
    andina: 'Región Andina',
    caribe: 'Región Caribe',
    pacifica: 'Región Pacífica',
    orinoquia: 'Región Orinoquía',
    amazonica: 'Región Amazónica'
};

// Mapeo de departamentos a regiones naturales
export const DEPARTMENT_TO_REGION: Record<string, RegionName> = {
    // Región Andina
    'ANTIOQUIA': 'andina',
    'BOYACA': 'andina',
    'CALDAS': 'andina',
    'CUNDINAMARCA': 'andina',
    'HUILA': 'andina',
    'NORTE DE SANTANDER': 'andina',
    'QUINDIO': 'andina',
    'RISARALDA': 'andina',
    'SANTANDER': 'andina',
    'TOLIMA': 'andina',
    'SANTAFE DE BOGOTA D.C': 'andina',

    // Región Caribe
    'ATLANTICO': 'caribe',
    'LA GUAJIRA': 'caribe',
    'MAGDALENA': 'caribe',
    'BOLIVAR': 'caribe',
    'CESAR': 'caribe',
    'SUCRE': 'caribe',
    'CORDOBA': 'caribe',
    'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA': 'caribe',

    // Región Pacífica
    'CAUCA': 'pacifica',
    'CHOCO': 'pacifica',
    'NARINO': 'pacifica',
    'VALLE DEL CAUCA': 'pacifica',

    // Región Orinoquía
    'ARAUCA': 'orinoquia',
    'CASANARE': 'orinoquia',
    'META': 'orinoquia',
    'VICHADA': 'orinoquia',

    // Región Amazónica
    'AMAZONAS': 'amazonica',
    'CAQUETA': 'amazonica',
    'GUAINIA': 'amazonica',
    'GUAVIARE': 'amazonica',
    'PUTUMAYO': 'amazonica',
    'VAUPES': 'amazonica'
};