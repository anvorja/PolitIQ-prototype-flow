// src/types/tooltips/topicsAnalysisTooltip.ts
export interface BaseTooltipProps {
    active?: boolean;
    label?: string;
}

export interface CustomTooltipProps extends BaseTooltipProps {
    payload?: Array<{
        value: number;
        name: string;
        dataKey: string;
    }>;
}

export interface RelatedTopicTooltipProps extends BaseTooltipProps {
    payload?: Array<{
        value: number;
        name: string;
        payload: {
            topic: string;
            strength: number;
        };
    }>;
}