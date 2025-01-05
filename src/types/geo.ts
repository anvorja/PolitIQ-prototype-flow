export type DepartmentName =
    | "ANTIOQUIA"
    | "ATLANTICO"
    | "SANTAFE DE BOGOTA D.C"
    | "BOLIVAR"
    | "BOYACA"
    | "CALDAS"
    | "CAQUETA"
    | "CAUCA"
    | "CESAR"
    | "CORDOBA"
    | "CUNDINAMARCA"
    | "CHOCO"
    | "HUILA"
    | "LA GUAJIRA"
    | "MAGDALENA"
    | "META"
    | "NARINO"
    | "NORTE DE SANTANDER"
    | "QUINDIO"
    | "RISARALDA"
    | "SANTANDER"
    | "SUCRE"
    | "TOLIMA"
    | "VALLE DEL CAUCA"
    | "ARAUCA"
    | "CASANARE"
    | "PUTUMAYO"
    | "AMAZONAS"
    | "GUAINIA"
    | "GUAVIARE"
    | "VAUPES"
    | "VICHADA"
    | "ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA";

export interface DepartmentProperties {
    DPTO: string;
    NOMBRE_DPT: DepartmentName;
    AREA: number;
    PERIMETER: number;
    HECTARES: number;
}

export interface DepartmentGeography {
    rsmKey: string;
    properties: DepartmentProperties;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
}

export interface GeoData {
    region: DepartmentName;
    mentions: number;
    sentiment: number;
    coordinates: [number, number];
}

export type DepartmentIntensityData = {
    [key in DepartmentName]: number;
}