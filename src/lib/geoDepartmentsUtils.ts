// src/lib/geoDepartmentsUtils.ts

import { RegionName, DEPARTMENT_TO_REGION } from '@/data/ColombiaRegionMapping';

/**
 * Obtiene todos los departamentos que pertenecen a una región específica
 * @param region - Nombre de la región natural
 * @returns Array de nombres de departamentos
 */
export const getDepartmentsInRegion = (region: RegionName): string[] => {
    return Object.entries(DEPARTMENT_TO_REGION)
        .filter(entry => entry[1] === region)
        .map(entry => entry[0]);
};

/**
 * Calcula la intensidad promedio de una región basada en los datos de intensidad departamentales
 * @param region - Nombre de la región natural
 * @param departmentIntensityData - Objeto con datos de intensidad por departamento
 * @returns Número que representa la intensidad promedio de la región
 */
export const calculateRegionIntensity = (
    region: RegionName,
    departmentIntensityData: Record<string, number>
): number => {
    const departments = getDepartmentsInRegion(region);
    const intensities = departments
        .map(dept => departmentIntensityData[dept])
        .filter(intensity => intensity !== undefined);

    if (intensities.length === 0) return 0;
    return Math.round(intensities.reduce((sum, val) => sum + val, 0) / intensities.length);
};

/**
 * Obtiene el color para un valor de intensidad dado
 * @param intensity - Valor numérico de intensidad
 * @returns String con el código de color hexadecimal
 */
export const getIntensityColor = (intensity: number): string => {
    if (intensity >= 70) return "#22c55e";    // Verde para alta influencia
    if (intensity >= 40) return "#eab308";    // Amarillo para media influencia
    return "#ef4444";                         // Rojo para baja influencia
};