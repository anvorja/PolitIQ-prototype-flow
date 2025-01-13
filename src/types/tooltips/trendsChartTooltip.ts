// src/types/tooltips/trendsChartTooltip.ts
import {TooltipProps} from "recharts";

export interface TrendsTooltipPayload {
    value: number;
    name: string;
    dataKey: string;
}

export type TrendsCustomTooltipProps = TooltipProps<number, string> & {
    active?: boolean;
    payload?: TrendsTooltipPayload[];
    label?: string;
};
