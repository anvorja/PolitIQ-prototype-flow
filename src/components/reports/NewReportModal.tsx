// src/components/reports/NewReportModal.tsx

"use client"

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { reportTemplates } from '@/data/ReportsMockData';

// Schema para validación del formulario
export const newReportSchema = z.object({
    type: z.string(),
    title: z.string().min(1, "El título es requerido"),
    description: z.string().optional(),
    dateRange: z.object({
        start: z.date(),
        end: z.date()
    }).refine(
        (data) => data.end >= data.start,
        {
            message: "La fecha final debe ser posterior o igual a la fecha inicial",
            path: ["end"]
        }
    ),
    format: z.enum(["pdf", "excel", "csv"]),
    sections: z.array(z.string()).min(1, "Seleccione al menos una sección"),
});

interface NewReportModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    onSubmitAction: (data: z.infer<typeof newReportSchema>) => Promise<void>;
}

export function NewReportModal({
                                   isOpen,
                                   onCloseAction,
                                   onSubmitAction
                               }: NewReportModalProps) {
    const form = useForm<z.infer<typeof newReportSchema>>({
        resolver: zodResolver(newReportSchema),
        defaultValues: {
            format: "pdf",
            sections: [],
        },
    });

    const selectedTemplate = form.watch('type');
    const templateSections = reportTemplates.find(t => t.id === selectedTemplate)?.sections || [];

    const handleSubmit = async (data: z.infer<typeof newReportSchema>) => {
        try {
            await onSubmitAction(data);
            onCloseAction();
        } catch (error) {
            console.error('Error al crear el reporte:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Generar Nuevo Reporte</DialogTitle>
                    <DialogDescription>
                        Configure los parámetros para generar un nuevo reporte
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Tipo de Reporte */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Reporte</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el tipo de reporte" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {reportTemplates.map((template) => (
                                                <SelectItem
                                                    key={template.id}
                                                    value={template.id}
                                                >
                                                    {template.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        {reportTemplates.find(t => t.id === field.value)?.description}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Título */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título del Reporte</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingrese un título descriptivo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Descripción */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descripción opcional del reporte"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Rango de Fechas */}
                        <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Rango de Fechas</FormLabel>
                                    <div className="flex gap-4">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value?.start && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value?.start ? (
                                                            format(field.value.start, "PPP", { locale: es })
                                                        ) : (
                                                            <span>Fecha inicial</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value?.end}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            const start = field.value?.start || date;
                                                            field.onChange({
                                                                start,
                                                                end: date < start ? start : date
                                                            });
                                                        }
                                                    }}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date < new Date("2024-01-01") ||
                                                        (field.value?.start && date < field.value.start)
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value?.end && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value?.end ? (
                                                            format(field.value.end, "PPP", { locale: es })
                                                        ) : (
                                                            <span>Fecha final</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value?.end}
                                                    onSelect={(date) =>
                                                        field.onChange({
                                                            ...field.value,
                                                            end: date || new Date(),
                                                        })
                                                    }
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("2024-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Formato */}
                        <FormField
                            control={form.control}
                            name="format"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Formato</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el formato" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Secciones */}
                        {selectedTemplate && templateSections.length > 0 && (
                            <FormField
                                control={form.control}
                                name="sections"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Secciones a incluir</FormLabel>
                                        <div className="grid grid-cols-2 gap-2">
                                            {templateSections.map((section) => (
                                                <div
                                                    key={section}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value?.includes(section)}
                                                        onChange={(e) => {
                                                            const update = e.target.checked
                                                                ? [...(field.value || []), section]
                                                                : field.value?.filter((s) => s !== section) || [];
                                                            field.onChange(update);
                                                        }}
                                                        className="h-4 w-4 rounded border-gray-300"
                                                    />
                                                    <label className="text-sm">{section}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onCloseAction}>
                                Cancelar
                            </Button>
                            <Button type="submit">Generar Reporte</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}