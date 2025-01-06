// components/alerts/TakeActionModal.tsx

"use client"

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
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Alert } from "@/types/alerts";
import { ACTION_CONFIG } from "@/types/alertEvents";
import { teamMembers } from "@/data/TeamMockData";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {MultiSelect} from "@/components/ui/multi-select";
import {useEffect} from "react";

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
    priority: z.enum(["high", "medium", "low"]),
    notes: z.string().optional().default(''),
}).refine((data) => data.type, {
    message: "El tipo de acción es requerido",
    path: ["type"]
});

interface TakeActionModalProps {
    alert: Alert;
    isOpen: boolean;
    onCloseAction: () => void;
    onSubmitAction: (data: z.infer<typeof actionFormSchema>) => Promise<void>;
}

export function TakeActionModal({
                                    alert,
                                    isOpen,
                                    onCloseAction,
                                    onSubmitAction
                                }: TakeActionModalProps) {

    const form = useForm<z.infer<typeof actionFormSchema>>({
        resolver: zodResolver(actionFormSchema),
        defaultValues: {
            type: undefined,
            title: '',
            description: '',
            deadline: undefined,
            assignedTo: [],
            priority: "medium",
            notes: '',
        },
    });

    // Opcional: Reset del formulario cuando se abre el modal
    useEffect(() => {
        if (isOpen) {
            form.reset({
                type: undefined,
                title: '',
                description: '',
                deadline: undefined,
                assignedTo: [],
                priority: "medium",
                notes: '',
            });
        }
    }, [isOpen, form]);

    const availableActions = ACTION_CONFIG[alert.type]?.availableActions || [];

    const handleSubmit = async (data: z.infer<typeof actionFormSchema>) => {
        try {
            await onSubmitAction(data);
            onCloseAction();
        } catch (error) {
            // Manejar errores si es necesario
            console.error('Error al procesar la acción:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Tomar Acción - {alert.title}</DialogTitle>
                    <DialogDescription>
                        {ACTION_CONFIG[alert.type]?.description ||
                            "Configure las acciones a tomar para esta alerta"}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Tipo de Acción */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Acción</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione un tipo de acción" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {availableActions.map((action) => (
                                                <SelectItem
                                                    key={action.id}
                                                    value={action.id}
                                                >
                                                    {action.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        {availableActions.find(a => a.id === field.value)?.description}
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
                                    <FormLabel>Título de la Acción</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Título descriptivo de la acción" {...field} />
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
                                            placeholder="Describa los detalles de la acción a realizar"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Fecha Límite */}
                        <FormField
                            control={form.control}
                            name="deadline"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Fecha Límite</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    type="button"
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: es })
                                                    ) : (
                                                        <span>Seleccione una fecha</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value || undefined}  // Convertimos null a undefined
                                                onSelect={(date: Date | undefined) => field.onChange(date)}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Personas Asignadas */}
                        <FormField
                            control={form.control}
                            name="assignedTo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Personas Asignadas</FormLabel>
                                    <FormControl>
                                        {/*<MultiSelect*/}
                                        {/*    options={teamMembers.map(member => ({*/}
                                        {/*        label: `${member.name} - ${member.role}`,*/}
                                        {/*        value: member.id*/}
                                        {/*    }))}*/}
                                        {/*    selected={field.value}*/}
                                        {/*    onChangeAction={field.onChange}*/}
                                        {/*    placeholder="Seleccionar personas..."*/}
                                        {/*/>*/}
                                        <MultiSelect
                                            options={teamMembers?.map(member => ({
                                                label: member?.name ? `${member.name} - ${member.role}` : '',
                                                value: member?.id || ''
                                            })) || []}
                                            selected={field.value || []}
                                            onChangeAction={field.onChange}
                                            placeholder="Seleccionar personas..."
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Seleccione las personas responsables de ejecutar esta acción
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Prioridad */}
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prioridad</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione la prioridad" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="high">Alta</SelectItem>
                                            <SelectItem value="medium">Media</SelectItem>
                                            <SelectItem value="low">Baja</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Notas adicionales */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notas Adicionales</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Información adicional relevante"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onCloseAction}>
                                Cancelar
                            </Button>
                            <Button type="submit">Crear Acción</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}