// src/app/geography/page.tsx
"use client"

import { GeographyPanel } from '@/components/geography/GeographyPanel';

export default function GeographyPage() {
    return (
        <div className="space-y-8 p-6">
            <GeographyPanel />
        </div>
    );
}