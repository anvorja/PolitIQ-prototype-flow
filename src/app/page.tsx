"use client"

import { KPICard } from "@/components/dashboard/KPICard";
import { kpiCardsData } from "@/data/DashboardMockData";
import {TrendsChart} from "@/components/analytics/TrendsChart";
import {GeoHeatmap} from "@/components/dashboard/GeoHeatmap";

export default function Home() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Análisis en tiempo real de la presencia digital de la campaña
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiCardsData.map((card, i) => (
                    <KPICard key={i} {...card} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 grid-cols-1">
                <TrendsChart />
                <GeoHeatmap />
            </div>
        </div>
    );
}