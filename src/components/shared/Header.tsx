import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <Card className="h-16 px-4 flex items-center justify-between rounded-none border-b">
            {/* Search */}
            <div className="flex items-center gap-2 w-96">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="bg-transparent outline-none flex-1 text-sm"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                </Button>
            </div>
        </Card>
    );
}