"use client"

import { KPICard } from "@/components/dashboard/KPICard";
import { kpiCardsData } from "@/data/DashboardMockData";
import { TrendsChart } from "@/components/analytics/TrendsChart";
import { GeoHeatmap } from "@/components/dashboard/GeoHeatmap";
import { AlertsSidebar } from "@/components/dashboard/AlertsSidebar";

export default function DashboardPage() {
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

            {/* Main Content Grid */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
                {/* Charts Section - Ocupa 4 columnas en pantallas grandes */}
                <div className="space-y-6 lg:col-span-4">
                    <TrendsChart />
                    <GeoHeatmap />
                </div>

                {/* Sidebar - Ocupa 2 columnas en pantallas grandes */}
                <div className="lg:col-span-2">
                    <AlertsSidebar />
                </div>
            </div>
        </div>
    );
}