// src/components/influencers/InfluencerInteractions.tsx
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    MessageCircle,
    Repeat2,
    Quote,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Share2,
    ExternalLink,
    Filter,
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import type { InfluencerInteraction } from '@/types/influencers';
import { influencerInteractions } from '@/data/InfluencerInteractionsMockData';

const getInteractionIcon = (type: InfluencerInteraction['type']) => {
    switch (type) {
        case 'mention':
            return MessageCircle;
        case 'reply':
            return MessageSquare;
        case 'quote':
            return Quote;
        case 'retweet':
            return Repeat2;
        default:
            return MessageCircle;
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export function InfluencerInteractions() {
    const [typeFilter, setTypeFilter] = useState("all");
    const [sentimentFilter, setSentimentFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    const filteredInteractions = influencerInteractions.filter(interaction => {
        if (typeFilter !== "all" && interaction.type !== typeFilter) return false;
        if (sentimentFilter === "positive" && interaction.sentiment < 50) return false;
        if (sentimentFilter === "negative" && interaction.sentiment >= 50) return false;
        // Aquí se podría agregar más lógica para el filtro de fecha
        return true;
    });

    const stats = {
        total: filteredInteractions.length,
        positive: filteredInteractions.filter(i => i.sentiment >= 50).length,
        negative: filteredInteractions.filter(i => i.sentiment < 50).length,
        byType: {
            mention: filteredInteractions.filter(i => i.type === 'mention').length,
            reply: filteredInteractions.filter(i => i.type === 'reply').length,
            quote: filteredInteractions.filter(i => i.type === 'quote').length,
            retweet: filteredInteractions.filter(i => i.type === 'retweet').length,
        }
    };
    return (
        <div className="space-y-4">
            {/* Filtros */}
            <Card>
                <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Filtros:</span>
                        </div>

                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Tipo de interacción" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="mention">Menciones</SelectItem>
                                <SelectItem value="reply">Respuestas</SelectItem>
                                <SelectItem value="quote">Citas</SelectItem>
                                <SelectItem value="retweet">Retweets</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sentimiento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todo</SelectItem>
                                <SelectItem value="positive">Positivo</SelectItem>
                                <SelectItem value="negative">Negativo</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Periodo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todo</SelectItem>
                                <SelectItem value="today">Hoy</SelectItem>
                                <SelectItem value="week">Esta semana</SelectItem>
                                <SelectItem value="month">Este mes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Lista y Panel de Análisis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Lista de Interacciones */}
                <div className="lg:col-span-2">
                    <ScrollArea className="h-[800px] pr-4">
                        <div className="space-y-4">
                            {filteredInteractions.map((interaction) => (
                                <Card
                                    key={interaction.id}
                                    className="hover:shadow-md transition-shadow cursor-pointer"
                                    aria-label={`Interacción de ${interaction.authorName}`}
                                >
                                    <CardContent className="pt-6">
                                        <div className="flex gap-4">
                                            <Avatar>
                                                <AvatarImage src={interaction.avatarUrl}  />
                                                {/*iniciales del autor en caso de que la imagen no cargue*/}
                                                <AvatarFallback>{interaction.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium">
                                                            {interaction.authorName}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {interaction.handle}
                                                        </p>
                                                    </div>
                                                    {React.createElement(getInteractionIcon(interaction.type), {
                                                        className: "w-4 h-4 text-muted-foreground"
                                                    })}
                                                </div>

                                                <p className="text-sm">{interaction.content}</p>

                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Share2 className="w-4 h-4" />
                                                        {interaction.reach.toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MessageSquare className="w-4 h-4" />
                                                        {interaction.engagement}%
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        {interaction.sentiment >= 50 ? (
                                                            <ThumbsUp className="w-4 h-4 text-green-500" />
                                                        ) : (
                                                            <ThumbsDown className="w-4 h-4 text-red-500" />
                                                        )}
                                                        {interaction.sentiment}%
                                                    </span>
                                                </div>

                                                <div className="pt-2 flex items-center justify-between text-sm">
                                                    <div className="flex flex-wrap gap-1">
                                                        {interaction.relatedTopics.map((topic) => (
                                                            <span
                                                                key={topic}
                                                                className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="text-muted-foreground">
                                                        {formatDate(interaction.timestamp)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Panel de Análisis */}
                <Card className="h-[800px]">
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Resumen de Interacciones</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Total</span>
                                        <span className="font-medium">{stats.total}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Menciones</span>
                                        <span className="font-medium">{stats.byType.mention}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Respuestas</span>
                                        <span className="font-medium">{stats.byType.reply}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Citas</span>
                                        <span className="font-medium">{stats.byType.quote}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Sentimiento</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Positivo</span>
                                        <span className="font-medium text-green-500">{stats.positive}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Negativo</span>
                                        <span className="font-medium text-red-500">{stats.negative}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Temas Principales</h3>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from(new Set(
                                        filteredInteractions.flatMap(i => i.relatedTopics)
                                    )).map((topic) => (
                                        <span
                                            key={topic}
                                            className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button className="w-full">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Exportar Análisis
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}