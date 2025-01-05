// src/lib/translateUtils.ts

// Función para traducir términos técnicos a términos de UI
export const translateTechnicalTerm = (term: string): string => {
    const translations: Record<string, string> = {
        'sentiment': 'Aprobación',
        'mentions': 'Menciones',
        // Agregar más traducciones según sea necesario
    };

    return translations[term.toLowerCase()] || term;
};

// Función específica para nombres de métricas en gráficos
export const translateMetricName = (metricName: string): string => {
    // Para uso en leyendas, títulos de ejes, etc.
    return translateTechnicalTerm(metricName);
};

// Función para traducir términos en tooltips o información detallada
export const translateTooltipTerm = (term: string): string => {
    return translateTechnicalTerm(term);
};

// Función para formatear valor de sentimiento/aprobación
export const formatSentimentValue = (value: number): string => {
    return `${value}%`;
};