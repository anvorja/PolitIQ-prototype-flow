"use client"

import { TrendsChart } from "@/components/analytics/TrendsChart";
import {InfluencersTable} from "@/components/analytics/InfluencersTable";

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Análisis</h2>
                <p className="text-muted-foreground">
                    Análisis detallado de métricas y tendencias
                </p>
            </div>

            <div className="grid gap-4">
                <TrendsChart />
                {/*TODO: implementar más componentes de análisis*/}
                <InfluencersTable />
                {/* TopicsAnalysis se agregará próximamente */}
            </div>
        </div>
    );
}