// components/alerts/TakeActionModal.tsx
"use client"

import React, { useEffect } from 'react';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertTriangle, CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MultiSelect } from "@/components/ui/multi-select";
import { teamMembers } from '@/data/TeamMockData';
import { ACTION_CONFIG } from "@/types/alertEvents";
import { Alert } from "@/types/alerts";

const RequiredIndicator = () => (
    <span className="text-red-500 ml-1">*</span>
);

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-1">
        {children}
        <span className="text-destructive text-sm">*</span>
    </div>
);

// Schema para validación del formulario
export const actionFormSchema = z.object({
    type: z.enum(['emergency-meeting', 'press-release', 'social-media',
        'engagement-event', 'message-adjustment', 'monitoring',
        'coordination', 'legal', 'custom'] as const).optional(),
    title: z.string().min(1, "El título es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
    deadline: z.date({
        required_error: "La fecha límite es requerida",
    }).optional(),
    assignedTo: z.array(z.string()).min(1, "Debe asignar al menos una persona"),
    priority: z.enum(["high", "medium", "low"] as const),
    notes: z.string().optional().default(''),
}).refine((data) => data.type, {
    message: "El tipo de acción es requerido",
    path: ["type"]
});

type FormData = z.infer<typeof actionFormSchema>;

interface TakeActionModalProps {
    alert: Alert;
    isOpen: boolean;
    onCloseAction: () => void;
    onSubmitAction: (data: FormData) => Promise<void>;
}

export function TakeActionModal({
                                    alert,
                                    isOpen,
                                    onCloseAction,
                                    onSubmitAction
                                }: TakeActionModalProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(actionFormSchema),
        defaultValues: {
            type: undefined,
            title: '',
            description: '',
            deadline: undefined,
            assignedTo: [],
            priority: "medium" as const,
            notes: '',
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset();
        }
    }, [isOpen, form]);

    const availableActions = ACTION_CONFIG[alert.type]?.availableActions || [];

    const handleSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            await onSubmitAction(data);
            onCloseAction();
        } catch (error) {
            console.error('Error al procesar la acción:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
            <DialogContent className={cn(
                "max-w-4xl max-h-[85vh]",
                "overflow-y-auto",
                "dark:bg-background/95 bg-background"
            )}>
                <DialogHeader className="space-y-2 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <AlertTriangle
                            className={cn(
                                "h-5 w-5",
                                // Colores según el tipo de alerta
                                alert.type === 'crisis' && "text-destructive",
                                alert.type === 'sentiment' && "text-yellow-500",
                                alert.type === 'opportunity' && "text-emerald-500",
                                alert.type === 'trend' && "text-blue-500",
                                alert.type === 'regional' && "text-purple-500",
                                alert.type === 'media' && "text-orange-500"
                            )}
                        />
                        <DialogTitle className="text-xl">
                            Tomar Acción - {alert.title}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-muted-foreground text-sm">
                        {ACTION_CONFIG[alert.type]?.description}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className={cn(
                            "grid grid-cols-1 md:grid-cols-2 gap-6",
                            "p-4 bg-background/95 dark:bg-background/20 rounded-lg"
                        )}>
                            {/* Left Column - Primary Information */}
                            <div className="space-y-6">
                                <div className={cn(
                                    "p-4 rounded-lg space-y-6",
                                    "bg-accent/20 dark:bg-accent/10" // Usando nuestras variables de tema
                                )}>

                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-sm font-medium flex items-center gap-2">
                                                    Tipo de Acción
                                                    <span className="text-destructive text-sm">*</span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-background/50 dark:bg-background/5 border-input/50">
                                                            <SelectValue placeholder="Seleccione un tipo de acción" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {availableActions.map((action) => (
                                                            <SelectItem key={action.id} value={action.id}>
                                                                {action.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Título de la Acción<RequiredIndicator/></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Título descriptivo de la acción" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Descripción<RequiredIndicator/></FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describa los detalles de la acción a realizar"
                                                        className={cn(
                                                            "min-h-[120px] resize-none",
                                                            "bg-background/50 dark:bg-background/5",
                                                            "border-input/50 focus:border-input"
                                                        )}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Right Column - Secondary Information */}
                            <div className="space-y-6">
                                <div className={cn(
                                    "p-4 rounded-lg space-y-6",
                                    "bg-accent/20 dark:bg-accent/10" // Mismo estilo para consistencia
                                )}>
                                    <FormField
                                        control={form.control}
                                        name="deadline"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Fecha Límite<RequiredIndicator/></FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP", {locale: es})
                                                                ) : (
                                                                    <span>Seleccione una fecha</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date < new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="assignedTo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <RequiredLabel>Personas Asignadas</RequiredLabel>
                                                </FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={teamMembers?.map(member => ({
                                                            label: member?.name ? `${member.name} - ${member.role}` : '',
                                                            value: member?.id || ''
                                                        })) || []}
                                                        selected={field.value || []}
                                                        onChangeAction={field.onChange}
                                                        placeholder="Seleccionar personas..."
                                                        className="bg-background/50 dark:bg-background/5"
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs text-muted-foreground">
                                                    Seleccione las personas responsables de ejecutar esta acción
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Prioridad<RequiredIndicator/></FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccione la prioridad"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="high">Alta</SelectItem>
                                                        <SelectItem value="medium">Media</SelectItem>
                                                        <SelectItem value="low">Baja</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Notas Adicionales</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Información adicional relevante"
                                                        className="min-h-24"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="border-t border-border/50 pt-4 space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCloseAction}
                                className="hover:bg-background/80"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-primary hover:bg-primary/90"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Procesando...
                                    </>
                                ) : (
                                    'Crear Acción'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
