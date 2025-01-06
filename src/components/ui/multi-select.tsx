"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Option {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChangeAction: (selected: string[]) => void
    placeholder?: string
}

export function MultiSelect({
                                options = [],
                                selected = [],
                                onChangeAction,
                                placeholder = "Seleccionar..."
                            }: MultiSelectProps) {
    const [inputValue, setInputValue] = React.useState("")
    const [showOptions, setShowOptions] = React.useState(false)

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

    const handleRemove = (valueToRemove: string) => {
        onChangeAction(safeSelected.filter(value => value !== valueToRemove))
    }

    const handleSelect = (valueToAdd: string) => {
        onChangeAction([...safeSelected, valueToAdd])
        setInputValue("")
    }

    return (
        <div className="relative w-full">
            <div className="w-full border border-input rounded-md p-2">
                <div className="flex flex-wrap gap-2">
                    {safeSelected.map((value) => {
                        const option = safeOptions.find((o) => o.value === value)
                        if (!option) return null

                        return (
                            <Badge key={value} variant="secondary">
                                {option.label}
                                <button
                                    type="button"
                                    className="ml-1 hover:bg-background/80 rounded-full"
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
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setShowOptions(true)}
                        placeholder={safeSelected.length === 0 ? placeholder : ""}
                        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[120px]"
                    />
                </div>
            </div>
            {showOptions && filteredOptions.length > 0 && (
                <div className="absolute w-full z-50 top-full mt-1 rounded-md border bg-popover shadow-md">
                    <div className="max-h-[200px] overflow-auto p-1">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm"
                                onClick={() => {
                                    handleSelect(option.value)
                                    setShowOptions(false)
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
