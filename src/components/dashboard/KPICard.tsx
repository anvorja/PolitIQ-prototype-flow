"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { KPICard as KPICardType } from "@/types/dashboard";

export function KPICard({ title, value, change, trend }: KPICardType) {
    return (
        <Card className="p-6">
            <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">{title}</p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-2xl font-bold">{value}</p>
                    <div className={cn(
                        "flex items-center text-sm",
                        trend === "up" ? "text-green-500" :
                            trend === "down" ? "text-red-500" :
                                "text-yellow-500"
                    )}>
                        {trend === "up" ? <TrendingUp className="w-4 h-4 mr-1" /> :
                            trend === "down" ? <TrendingDown className="w-4 h-4 mr-1" /> :
                                <Minus className="w-4 h-4 mr-1" />}
                        {Math.abs(change)}%
                    </div>
                </div>
            </div>
        </Card>
    );
}