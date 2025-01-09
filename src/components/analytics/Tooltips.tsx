import React from "react";
import {cn} from "@/lib/utils";
import {formatShortDate} from "@/lib/dateUtils";
import {formatSentimentValue, translateMetricName} from "@/lib/translateUtils";
import {CustomTooltipProps, RelatedTopicTooltipProps} from "@/types/tooltips/topicsAnalysisTooltip";

export const RelatedTopicTooltip: React.FC<RelatedTopicTooltipProps> = ({ active, payload }) => {
    if (!active || !payload?.[0]) return null;

    const data = payload[0].payload;

    return (
        <div className="min-w-[180px] rounded-lg border border-border/50 bg-popover/95 p-3 shadow-md backdrop-blur-sm">
            <p className="mb-2 text-sm font-medium">
                {data.topic}
            </p>
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                    Relación:
                </span>
                <span className={cn(
                    "font-medium text-sm",
                    data.strength >= 70 ? "text-emerald-500 dark:text-emerald-400" :
                        data.strength >= 40 ? "text-amber-500 dark:text-amber-400" :
                            "text-rose-500 dark:text-rose-400"
                )}>
                    {data.strength}%
                </span>
            </div>
            {/* Barra de progreso */}
            <div className="mt-2 h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full",
                        data.strength >= 70 ? "bg-emerald-500" :
                            data.strength >= 40 ? "bg-amber-500" :
                                "bg-rose-500"
                    )}
                    style={{ width: `${data.strength}%` }}
                />
            </div>
        </div>
    );
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    // Encuentra los valores de mentions y sentiment
    const mentions = payload.find(p => p.dataKey === 'mentions')?.value;
    const sentiment = payload.find(p => p.dataKey === 'sentiment')?.value;

    return (
        <div className="min-w-[180px] rounded-lg border border-border/50 bg-popover/95 p-3 shadow-md backdrop-blur-sm">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
                {formatShortDate(label || '')}
            </p>
            <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                        {translateMetricName('mentions')}:
                    </span>
                    <span className="font-medium text-sm text-primary">
                        {mentions?.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                        {translateMetricName('sentiment')}:
                    </span>
                    <span className={cn(
                        "font-medium text-sm",
                        Number(sentiment) >= 70 ? "text-emerald-500 dark:text-emerald-400" :
                            Number(sentiment) >= 50 ? "text-amber-500 dark:text-amber-400" :
                                "text-rose-500 dark:text-rose-400"
                    )}>
                        {formatSentimentValue(sentiment || 0)}
                    </span>
                </div>
            </div>
        </div>
    );
};