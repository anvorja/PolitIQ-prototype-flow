/**
 * Formatea una fecha en formato YYYY-MM-DD a una representación más amigable
 * @param dateStr - Fecha en formato YYYY-MM-DD
 * @param options - Opciones adicionales de formato
 * @returns Fecha formateada según las opciones especificadas
 */
export const formatDate = (
    dateStr: string,
    options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
): string => {
    return new Date(dateStr).toLocaleDateString('es-ES', options);
};

/**
 * Formatea una fecha en formato YYYY-MM-DD a formato corto
 * @param dateStr - Fecha en formato YYYY-MM-DD
 * @returns Fecha en formato corto (ej: "15 ene")
 */
export const formatShortDate = (dateStr: string): string => {
    return formatDate(dateStr, { month: 'short', day: 'numeric' });
};

/**
 * Formatea una fecha en formato YYYY-MM-DD a formato largo
 * @param dateStr - Fecha en formato YYYY-MM-DD
 * @returns Fecha en formato largo (ej: "15 de enero de 2024")
 */
export const formatLongDate = (dateStr: string): string => {
    return formatDate(dateStr, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};