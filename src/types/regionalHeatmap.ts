// src/types/regionalHeatmap.ts

export interface GeoJSONFeature {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    properties: {
        NOMBRE_DPT: string;
        HECTARES: number;
    };
}

export interface GeoJSONData {
    type: string;
    features: GeoJSONFeature[];
}

// Tipos adicionales que podrían ser útiles en el futuro
export type IntensityLevel = 'low' | 'medium' | 'high';

export interface ActivityColors {
    light: {
        low: string;
        medium: string;
        high: string;
        default: string;
    };
    dark: {
        low: string;
        medium: string;
        high: string;
        default: string;
    };
}