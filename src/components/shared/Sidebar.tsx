"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigationData } from '@/data/NavigationMockData';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export function Sidebar() {
    const pathname = usePathname();

    return (
        <Card className="h-screen w-64 p-4 flex flex-col gap-6 rounded-none border-r">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2 px-2">
                <Image
                    src="https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos-black_osqvyo.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="block dark:hidden"
                />
                <Image
                    src="https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos_ael8fg.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="hidden dark:block"
                />
                <span className="font-bold text-2xl">PolitIQ</span>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-6">
                {navigationData.map((section) => (
                    <div key={section.section}>
                        <h2 className="font-semibold text-sm text-muted-foreground mb-2 px-2">
                            {section.section}
                        </h2>
                        <div className="flex flex-col gap-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        // version1
                                        // className={cn(
                                        //     "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                                        //     "hover:bg-purple-50 hover:text-purple-700",
                                        //     isActive && "bg-purple-50 text-purple-700"
                                        // )}
                                        // version2
                                        className={cn(
                                            "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                                            "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300",
                                            isActive && "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
                                            !isActive && "text-foreground"
                                        )}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="border-t pt-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-accent" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Administrador</span>
                        <span className="text-xs text-muted-foreground">admin@politiq.com</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}