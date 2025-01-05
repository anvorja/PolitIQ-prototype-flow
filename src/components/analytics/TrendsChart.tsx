"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { trendData } from "@/data/DashboardMockData";

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric'
    });
};

export function TrendsChart() {
    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Tendencias de Menciones y Sentimiento</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={trendData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatDate}
                            />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip
                                labelFormatter={(value) => formatDate(value as string)}
                                formatter={(value, name) => {
                                    if (name === "mentions") return [value, "Menciones"];
                                    if (name === "sentiment") return [`${value}%`, "Sentimiento"];
                                    return [value, name];
                                }}
                            />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="mentions"
                                stroke="hsl(var(--primary))"
                                name="Menciones"
                                strokeWidth={2}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="sentiment"
                                stroke="hsl(var(--chart-2))"
                                name="Sentimiento"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}