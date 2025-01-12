// src/components/dashboard/KPICard.tsx
"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { KPICard as KPICardType } from "@/types/dashboard";

export function KPICard({ title, value, change, trend }: KPICardType) {
    // Función para determinar los colores según la tendencia
    const getTrendColor = (trend: string | undefined) => {
        return cn(
            "flex items-center text-sm font-medium",
            trend === "up" ? "text-emerald-600 dark:text-emerald-400" :
                trend === "down" ? "text-rose-600 dark:text-rose-400" :
                    "text-amber-600 dark:text-amber-400"
        );
    };

    const getBackgroundClass = (trend: string | undefined) => {
        return cn(
            "relative p-6 rounded-lg",
            trend === "up" ? "bg-emerald-50/30 dark:bg-emerald-950/20" :
                trend === "down" ? "bg-rose-50/30 dark:bg-rose-950/20" :
                    "bg-amber-50/30 dark:bg-amber-950/20"
        );
    };

    return (
        // otra propuesta
        <Card className={cn(
            "overflow-hidden bg-white dark:bg-black/40 backdrop-blur-sm",
            "dark:bg-gradient-to-br dark:from-card/90 dark:to-card/100"
        )}>
            {/* anteriormente */}
            {/* <Card className="overflow-hidden bg-white dark:bg-black/40 backdrop-blur-sm"> */}
            <div className={getBackgroundClass(trend)}>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                    {title}
                </p>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold tracking-tight">
                        {value}
                    </p>
                    <div className={getTrendColor(trend)}>
                        {trend === "up" ? (
                            <TrendingUp className="w-4 h-4 mr-1 stroke-[2.5]" />
                        ) : trend === "down" ? (
                            <TrendingDown className="w-4 h-4 mr-1 stroke-[2.5]" />
                        ) : (
                            <Minus className="w-4 h-4 mr-1 stroke-[2.5]" />
                        )}
                        {Math.abs(change)}%
                    </div>
                </div>
            </div>
        </Card>
    );
}