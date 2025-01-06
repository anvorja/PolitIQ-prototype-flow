// types/alerts.ts

export type AlertPriority = 'high' | 'medium' | 'low';

export type AlertType =
    | 'crisis'           // Crisis y ataques políticos
    | 'sentiment'        // Cambios en la aprobación
    | 'opportunity'      // Oportunidades políticas
    | 'trend'           // Tendencias emergentes
    | 'regional'        // Alertas regionales
    | 'media';          // Cobertura mediática

export interface Alert {
    id: string;
    type: AlertType;
    priority: AlertPriority;
    title: string;
    description: string;
    timestamp: string;
    category: string;
    region?: string;
    department?: string;
    city?: string;
    changePercent?: number;
    relatedTopic?: string;
    source?: string;
    reach?: number;         // Alcance potencial
    sentiment?: number;     // Porcentaje de aprobación
    actions?: string[];     // Acciones recomendadas
    keywords?: string[];    // Palabras clave relacionadas
    influencers?: string[]; // Influenciadores involucrados
}

export interface AlertGroup {
    title: string;
    description: string;
    type: AlertType;
    alerts: Alert[];
}