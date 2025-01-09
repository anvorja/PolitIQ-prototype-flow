// "use client"
//
// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { TrendingDown, TrendingUp, Minus } from "lucide-react";
// import type { KPICard as KPICardType } from "@/types/dashboard";
//
// export function KPICard({ title, value, change, trend }: KPICardType) {
//     return (
//         <Card className="p-6">
//             <div className="flex flex-col">
//                 <p className="text-sm text-muted-foreground">{title}</p>
//                 <div className="flex items-center justify-between mt-2">
//                     <p className="text-2xl font-bold">{value}</p>
//                     <div className={cn(
//                         "flex items-center text-sm",
//                         trend === "up" ? "text-green-500" :
//                             trend === "down" ? "text-red-500" :
//                                 "text-yellow-500"
//                     )}>
//                         {trend === "up" ? <TrendingUp className="w-4 h-4 mr-1" /> :
//                             trend === "down" ? <TrendingDown className="w-4 h-4 mr-1" /> :
//                                 <Minus className="w-4 h-4 mr-1" />}
//                         {Math.abs(change)}%
//                     </div>
//                 </div>
//             </div>
//         </Card>
//     );
// }
// "use client"
//
// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { TrendingDown, TrendingUp, Minus } from "lucide-react";
// import type { KPICard as KPICardType } from "@/types/dashboard";
//
// export function KPICard({ title, value, change, trend }: KPICardType) {
//     // Función para determinar los colores según la tendencia
//     const getTrendColor = (trend: string | undefined) => {
//         return cn(
//             "flex items-center text-sm font-medium",
//             trend === "up" ? "text-emerald-600 dark:text-emerald-400" :
//                 trend === "down" ? "text-rose-600 dark:text-rose-400" :
//                     "text-amber-600 dark:text-amber-400"
//         );
//     };
//
//     return (
//         <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 dark:from-background dark:to-muted/10 border border-border/50">
//             <div className="relative p-6">
//                 <p className="text-sm font-medium text-muted-foreground">{title}</p>
//                 <div className="flex items-center justify-between mt-2">
//                     <p className="text-2xl font-bold tracking-tight">{value}</p>
//                     <div className={getTrendColor(trend)}>
//                         {trend === "up" ? (
//                             <TrendingUp className="w-4 h-4 mr-1 stroke-[2.5]" />
//                         ) : trend === "down" ? (
//                             <TrendingDown className="w-4 h-4 mr-1 stroke-[2.5]" />
//                         ) : (
//                             <Minus className="w-4 h-4 mr-1 stroke-[2.5]" />
//                         )}
//                         {Math.abs(change)}%
//                     </div>
//                 </div>
//             </div>
//             {/* Indicador de tendencia sutil en el fondo */}
//             <div className={cn(
//                 "absolute inset-0 opacity-5",
//                 trend === "up" ? "bg-emerald-500" :
//                     trend === "down" ? "bg-rose-500" :
//                         "bg-amber-500"
//             )} />
//         </Card>
//     );
// }

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
        <Card className="overflow-hidden bg-white dark:bg-black/40 backdrop-blur-sm">
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