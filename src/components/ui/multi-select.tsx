// src/components/ui/multi-select.tsx
"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Option {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChangeAction: (selected: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
                                options = [],
                                selected = [],
                                onChangeAction,
                                placeholder = "Seleccionar...",
                            }: MultiSelectProps) {
    const [inputValue, setInputValue] = React.useState("")
    const [showOptions, setShowOptions] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const safeOptions = React.useMemo(() =>
            Array.isArray(options) ? options : []
        , [options])

    const safeSelected = React.useMemo(() =>
            Array.isArray(selected) ? selected : []
        , [selected])

    const filteredOptions = React.useMemo(() => {
        if (!safeOptions.length) return []
        return safeOptions.filter((option) =>
            !safeSelected.includes(option.value) &&
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    }, [safeOptions, safeSelected, inputValue])

    // Manejo de clic fuera del componente
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowOptions(false)
                setInputValue("") // Limpiar input al cerrar
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleRemove = (valueToRemove: string) => {
        onChangeAction(safeSelected.filter(value => value !== valueToRemove))
    }

    const handleSelect = (valueToAdd: string) => {
        onChangeAction([...safeSelected, valueToAdd])
        setInputValue("")
        // Si es la última opción disponible, cerramos la lista
        if (filteredOptions.length === 1) {
            setShowOptions(false)
        }
    }

    return (
        <div className={cn(
            "relative w-full",
        )} ref={containerRef}>
            <div className={cn(
                "w-full border border-input rounded-md p-2",
                "bg-background/50 dark:bg-background/5",
                "focus-within:ring-1 focus-within:ring-ring",
                "transition-all duration-200"
            )}>
                <div className="flex flex-wrap gap-2">
                    {safeSelected.map((value) => {
                        const option = safeOptions.find((o) => o.value === value)
                        if (!option) return null

                        return (
                            <Badge
                                key={value}
                                variant="secondary"
                                className={cn(
                                    "flex items-center gap-1",
                                    "bg-secondary/50 dark:bg-secondary/20",
                                    "text-secondary-foreground",
                                    "transition-colors duration-200"
                                )}
                            >
                                {option.label}
                                <button
                                    type="button"
                                    className={cn(
                                        "ml-1 rounded-full p-0.5",
                                        "hover:bg-destructive/20",
                                        "transition-colors duration-200"
                                    )}
                                    onClick={() => handleRemove(value)}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )
                    })}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            setShowOptions(true)
                        }}
                        onFocus={() => setShowOptions(true)}
                        placeholder={safeSelected.length === 0 ? placeholder : ""}
                        className={cn(
                            "flex-1 bg-transparent outline-none",
                            "placeholder:text-muted-foreground",
                            "min-w-[120px]"
                        )}
                    />
                </div>
            </div>

            {showOptions && filteredOptions.length > 0 && (
                <div className={cn(
                    "absolute w-full z-50 top-full mt-1",
                    "rounded-md border border-border/50",
                    "bg-popover/95 dark:bg-popover/90",
                    "shadow-md dark:shadow-lg"
                )}>
                    <div className="max-h-[200px] overflow-auto p-1">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className={cn(
                                    "px-2 py-1.5 text-sm cursor-pointer rounded-sm",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    "transition-colors duration-200"
                                )}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}