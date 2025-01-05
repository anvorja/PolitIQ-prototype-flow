export type AlertPriority = 'high' | 'medium' | 'low';
export type AlertStatus = 'new' | 'viewed' | 'handled';
export type AlertType = 'sentiment' | 'trend' | 'crisis' | 'opportunity';

export interface Alert {
    id: string;
    type: AlertType;
    title: string;
    description: string;
    priority: AlertPriority;
    status: AlertStatus;
    timestamp: string;
    category?: string;
    relatedTopic?: string;
    changePercent?: number;
}

export interface AlertGroup {
    title: string;
    alerts: Alert[];
}