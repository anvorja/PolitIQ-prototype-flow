// "use client"
//
// import * as React from "react"
// import { X } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
// import { Command as CommandPrimitive } from "cmdk"
//
// interface Option {
//     label: string
//     value: string
// }
//
// interface MultiSelectProps {
//     options: Option[]
//     selected: string[]
//     onChangeAction: (selected: string[]) => void
//     placeholder?: string
// }
//
// export function MultiSelect({
//                                 options,
//                                 selected,
//                                 onChangeAction,
//                                 placeholder = "Seleccionar..."
//                             }: MultiSelectProps) {
//     const [open, setOpen] = React.useState(false)
//     const [inputValue, setInputValue] = React.useState("")
//     const inputRef = React.useRef<HTMLInputElement>(null)
//
//     // Filter options based on input value and selected items
//     const filteredOptions = React.useMemo(() => {
//         return options.filter((option) =>
//             !selected.includes(option.value) &&
//             (!inputValue || option.label.toLowerCase().includes(inputValue.toLowerCase()))
//         )
//     }, [options, selected, inputValue])
//
//     // Handle unselecting an option
//     const handleUnselect = React.useCallback((option: string) => {
//         onChangeAction(selected.filter((s) => s !== option))
//     }, [selected, onChangeAction])
//
//     // Handle keyboard navigation and deletion
//     const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
//         const input = inputRef.current
//         if (input?.value === "" && e.key === "Backspace") {
//             const newSelected = [...selected]
//             newSelected.pop()
//             onChangeAction(newSelected)
//         }
//     }, [selected, onChangeAction, inputRef])
//
//     // Handle input blur
//     const handleBlur = React.useCallback(() => {
//         setOpen(false)
//         setInputValue("")
//     }, [setOpen, setInputValue])
//
//     // Handle selecting an option
//     const handleSelect = React.useCallback((value: string) => {
//         setInputValue("")
//         onChangeAction([...selected, value])
//     }, [selected, onChangeAction, setInputValue])
//
//     return (
//         <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
//             <div className="group border border-input px-3 py-2 text-sm rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//                 <div className="flex gap-1 flex-wrap">
//                     {selected.map((value) => {
//                         const option = options.find((o) => o.value === value)
//                         if (!option) return null
//
//                         return (
//                             <Badge
//                                 key={value}
//                                 variant="secondary"
//                                 className="hover:bg-secondary"
//                             >
//                                 {option.label}
//                                 <button
//                                     type="button"
//                                     className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     onClick={() => handleUnselect(value)}
//                                 >
//                                     <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                                 </button>
//                             </Badge>
//                         )
//                     })}
//                     <CommandPrimitive.Input
//                         ref={inputRef}
//                         value={inputValue}
//                         onValueChange={setInputValue}
//                         onBlur={handleBlur}
//                         onFocus={() => setOpen(true)}
//                         placeholder={selected.length === 0 ? placeholder : undefined}
//                         className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
//                     />
//                 </div>
//             </div>
//             <div className="relative mt-2">
//                 {open && filteredOptions.length > 0 && (
//                     <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
//                         <CommandGroup className="max-h-[200px] overflow-auto">
//                             {filteredOptions.map((option) => (
//                                 <CommandItem
//                                     key={option.value}
//                                     onSelect={() => handleSelect(option.value)}
//                                     className="cursor-pointer"
//                                 >
//                                     {option.label}
//                                 </CommandItem>
//                             ))}
//                         </CommandGroup>
//                     </div>
//                 )}
//             </div>
//         </Command>
//     )
// }

// brave sugerencia
// components/ui/multi-select.tsx

// "use client"
//
// import * as React from "react"
// import { X } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
// import { Command as CommandPrimitive } from "cmdk"
//
// interface Option {
//     label: string
//     value: string
// }
//
// interface MultiSelectProps {
//     options: Option[]
//     selected: string[]
//     onChangeAction: (selected: string[]) => void
//     placeholder?: string
// }
//
// export function MultiSelect({
//                                 options,
//                                 selected = [], // Asegurar que siempre haya un array por defecto
//                                 onChangeAction,
//                                 placeholder = "Seleccionar..."
//                             }: MultiSelectProps) {
//     const [open, setOpen] = React.useState(false)
//     const [inputValue, setInputValue] = React.useState("")
//     const inputRef = React.useRef<HTMLInputElement>(null)
//
//     // Asegurarse de que selected sea siempre un array
//     const selectedValues = Array.isArray(selected) ? selected : []
//
//     // Filter options based on input value and selected items
//     const filteredOptions = React.useMemo(() => {
//         return options.filter((option) =>
//             !selectedValues.includes(option.value) &&
//             (!inputValue || option.label.toLowerCase().includes(inputValue.toLowerCase()))
//         )
//     }, [options, selectedValues, inputValue])
//
//     // Handle unselecting an option
//     const handleUnselect = React.useCallback((option: string) => {
//         onChangeAction(selectedValues.filter((s) => s !== option))
//     }, [selectedValues, onChangeAction])
//
//     // Handle selecting an option
//     const handleSelect = React.useCallback((value: string) => {
//         setInputValue("")
//         onChangeAction([...selectedValues, value])
//     }, [selectedValues, onChangeAction])
//
//     return (
//         <Command onKeyDown={(e) => {
//             const input = inputRef.current
//             if (input?.value === "" && e.key === "Backspace") {
//                 const newSelected = [...selectedValues]
//                 newSelected.pop()
//                 onChangeAction(newSelected)
//             }
//         }} className="overflow-visible bg-transparent">
//             <div className="group border border-input px-3 py-2 text-sm rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//                 <div className="flex gap-1 flex-wrap">
//                     {selectedValues.map((value) => {
//                         const option = options.find((o) => o.value === value)
//                         if (!option) return null
//
//                         return (
//                             <Badge
//                                 key={value}
//                                 variant="secondary"
//                                 className="hover:bg-secondary"
//                             >
//                                 {option.label}
//                                 <button
//                                     type="button"
//                                     className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     onClick={() => handleUnselect(value)}
//                                 >
//                                     <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                                 </button>
//                             </Badge>
//                         )
//                     })}
//                     <CommandPrimitive.Input
//                         ref={inputRef}
//                         value={inputValue}
//                         onValueChange={setInputValue}
//                         onBlur={() => {
//                             setOpen(false)
//                             setInputValue("")
//                         }}
//                         onFocus={() => setOpen(true)}
//                         placeholder={selectedValues.length === 0 ? placeholder : undefined}
//                         className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
//                     />
//                 </div>
//             </div>
//             <div className="relative mt-2">
//                 {open && filteredOptions.length > 0 && (
//                     <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
//                         <CommandGroup className="max-h-[200px] overflow-auto">
//                             {filteredOptions.map((option) => (
//                                 <CommandItem
//                                     key={option.value}
//                                     onSelect={() => handleSelect(option.value)}
//                                     className="cursor-pointer"
//                                 >
//                                     {option.label}
//                                 </CommandItem>
//                             ))}
//                         </CommandGroup>
//                     </div>
//                 )}
//             </div>
//         </Command>
//     )
// }


// brave 2 sugerencia
// components/ui/multi-select.tsx
// "use client"
//
// import * as React from "react"
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
// import { Command as CommandPrimitive } from "cmdk"
// import { X } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
//
// interface Option {
//     label: string
//     value: string
// }
//
// interface MultiSelectProps {
//     options: Option[]
//     selected: string[]
//     onChangeAction: (selected: string[]) => void
//     placeholder?: string
// }
//
// export function MultiSelect({
//                                 options = [], // Aseguramos que siempre haya un array
//                                 selected = [],
//                                 onChangeAction,
//                                 placeholder = "Seleccionar..."
//                             }: MultiSelectProps) {
//     const [open, setOpen] = React.useState(false)
//     const [inputValue, setInputValue] = React.useState("")
//
//     // Asegurarnos de que las opciones y selected sean arrays válidos
//     const safeOptions = Array.isArray(options) ? options : []
//     const safeSelected = Array.isArray(selected) ? selected : []
//
//     const filteredOptions = React.useMemo(() => {
//         if (!safeOptions.length) return []
//         return safeOptions.filter((option) =>
//             !safeSelected.includes(option.value) &&
//             option.label.toLowerCase().includes(inputValue.toLowerCase())
//         )
//     }, [safeOptions, safeSelected, inputValue])
//
//     return (
//         <Command className="overflow-visible bg-transparent">
//             <div className="group border border-input px-3 py-2 text-sm rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//                 <div className="flex gap-1 flex-wrap">
//                     {safeSelected.map((value) => {
//                         const option = safeOptions.find((o) => o.value === value)
//                         if (!option) return null
//
//                         return (
//                             <Badge
//                                 key={value}
//                                 variant="secondary"
//                                 className="hover:bg-secondary"
//                             >
//                                 {option.label}
//                                 <button
//                                     type="button"
//                                     className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     onClick={() => {
//                                         onChangeAction(safeSelected.filter((s) => s !== value))
//                                     }}
//                                 >
//                                     <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                                 </button>
//                             </Badge>
//                         )
//                     })}
//                     <CommandPrimitive.Input
//                         value={inputValue}
//                         onValueChange={setInputValue}
//                         onBlur={() => {
//                             setOpen(false)
//                             setInputValue("")
//                         }}
//                         onFocus={() => setOpen(true)}
//                         placeholder={safeSelected.length === 0 ? placeholder : ""}
//                         className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
//                     />
//                 </div>
//             </div>
//             {open && filteredOptions.length > 0 && (
//                 <div className="relative mt-2">
//                     <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
//                         <CommandGroup className="max-h-[200px] overflow-auto">
//                             {filteredOptions.map((option) => (
//                                 <CommandItem
//                                     key={option.value}
//                                     onSelect={() => {
//                                         onChangeAction([...safeSelected, option.value])
//                                         setInputValue("")
//                                     }}
//                                     className="cursor-pointer"
//                                 >
//                                     {option.label}
//                                 </CommandItem>
//                             ))}
//                         </CommandGroup>
//                     </div>
//                 </div>
//             )}
//         </Command>
//     )
// }

// barve 3 sugerencia
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

    // Asegurarnos de que las opciones y selected sean arrays válidos
    // Wrap initializations in useMemo
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




//2
// "use client"
//
// import * as React from "react"
// import { X } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
// import { Command as CommandPrimitive } from "cmdk"
//
// interface Option {
//     label: string
//     value: string
// }
//
// interface MultiSelectProps {
//     options: Option[]
//     selected: string[]
//     onChangeAction: (selected: string[]) => void
//     placeholder?: string
// }
//
// export function MultiSelect({
//                                 options,
//                                 selected,
//                                 onChangeAction,
//                                 placeholder = "Seleccionar..."
//                             }: MultiSelectProps) {
//     const [open, setOpen] = React.useState(false)
//     const [inputValue, setInputValue] = React.useState("")
//     const inputRef = React.useRef<HTMLInputElement>(null)
//
//     // Filter options based on input value and selected items
//     const filteredOptions = React.useMemo(() => {
//         return options.filter((option) =>
//             !selected.includes(option.value) &&
//             (!inputValue || option.label.toLowerCase().includes(inputValue.toLowerCase()))
//         )
//     }, [options, selected, inputValue])
//
//     // Handle unselecting an option
//     const handleUnselect = React.useCallback((option: string) => {
//         onChangeAction(selected.filter((s) => s !== option))
//     }, [selected, onChangeAction])
//
//     // Handle keyboard navigation and deletion
//     const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
//         const input = inputRef.current
//         if (input?.value === "" && e.key === "Backspace") {
//             const newSelected = [...selected]
//             newSelected.pop()
//             onChangeAction(newSelected)
//         }
//     }, [selected, onChangeAction])
//
//     // Handle input blur
//     const handleBlur = React.useCallback(() => {
//         setOpen(false)
//         setInputValue("")
//     }, [])
//
//     // Handle selecting an option
//     const handleSelect = React.useCallback((value: string) => {
//         setInputValue("")
//         onChangeAction([...selected, value])
//     }, [selected, onChangeAction])
//
//     return (
//         <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
//             <div className="group border border-input px-3 py-2 text-sm rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//                 <div className="flex gap-1 flex-wrap">
//                     {selected.map((value) => {
//                         const option = options.find((o) => o.value === value)
//                         if (!option) return null
//
//                         return (
//                             <Badge
//                                 key={value}
//                                 variant="secondary"
//                                 className="hover:bg-secondary"
//                             >
//                                 {option.label}
//                                 <button
//                                     type="button"
//                                     className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     onClick={() => handleUnselect(value)}
//                                 >
//                                     <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                                 </button>
//                             </Badge>
//                         )
//                     })}
//                     <CommandPrimitive.Input
//                         ref={inputRef}
//                         value={inputValue}
//                         onValueChange={setInputValue}
//                         onBlur={handleBlur}
//                         onFocus={() => setOpen(true)}
//                         placeholder={selected.length === 0 ? placeholder : undefined}
//                         className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
//                     />
//                 </div>
//             </div>
//             <div className="relative mt-2">
//                 {open && filteredOptions.length > 0 && (
//                     <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
//                         <CommandGroup className="max-h-[200px] overflow-auto">
//                             {filteredOptions.map((option) => (
//                                 <CommandItem
//                                     key={option.value}
//                                     onSelect={() => handleSelect(option.value)}
//                                     className="cursor-pointer"
//                                 >
//                                     {option.label}
//                                 </CommandItem>
//                             ))}
//                         </CommandGroup>
//                     </div>
//                 )}
//             </div>
//         </Command>
//     )
// }

// 3
// "use client"
//
// import * as React from "react"
// import { X } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
// import { Command as CommandPrimitive } from "cmdk"
//
// interface Option {
//     label: string
//     value: string
// }
//
// interface MultiSelectProps {
//     options: Option[]
//     selected: string[]
//     onChangeAction: (selected: string[]) => void
//     placeholder?: string
// }
//
// export function MultiSelect({
//                                 options,
//                                 selected,
//                                 onChangeAction,
//                                 placeholder = "Seleccionar..."
//                             }: MultiSelectProps) {
//     const [open, setOpen] = React.useState(false)
//     const [inputValue, setInputValue] = React.useState("")
//     const inputRef = React.useRef<HTMLInputElement>(null)
//
//     // Filter options based on input value and selected items
//     const filteredOptions = React.useMemo(() => {
//         return options.filter((option) =>
//             !selected.includes(option.value) &&
//             (!inputValue || option.label.toLowerCase().includes(inputValue.toLowerCase()))
//         )
//     }, [options, selected, inputValue])
//
//     // Handle keyboard navigation and deletion
//     const removeLastItem = React.useCallback(() => {
//         if (selected.length > 0) {
//             const newSelected = selected.slice(0, -1)
//             onChangeAction(newSelected)
//         }
//     }, [onChangeAction, selected])
//
//     const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
//         if (inputRef.current?.value === "" && e.key === "Backspace") {
//             removeLastItem()
//         }
//     }, [removeLastItem])
//
//     // Handle unselecting an option
//     const handleUnselect = React.useCallback((optionToRemove: string) => {
//         const newSelected = selected.filter(value => value !== optionToRemove)
//         onChangeAction(newSelected)
//     }, [onChangeAction, selected])
//
//     // Handle selecting an option
//     const handleSelect = React.useCallback((value: string) => {
//         setInputValue("")
//         onChangeAction([...selected, value])
//     }, [onChangeAction, selected])
//
//     return (
//         <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
//             <div className="group border border-input px-3 py-2 text-sm rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//                 <div className="flex gap-1 flex-wrap">
//                     {selected.map((value) => {
//                         const option = options.find((o) => o.value === value)
//                         if (!option) return null
//
//                         return (
//                             <Badge
//                                 key={value}
//                                 variant="secondary"
//                                 className="hover:bg-secondary"
//                             >
//                                 {option.label}
//                                 <button
//                                     type="button"
//                                     className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     onClick={() => handleUnselect(value)}
//                                 >
//                                     <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                                 </button>
//                             </Badge>
//                         )
//                     })}
//                     <CommandPrimitive.Input
//                         ref={inputRef}
//                         value={inputValue}
//                         onValueChange={setInputValue}
//                         onBlur={() => {
//                             setOpen(false)
//                             setInputValue("")
//                         }}
//                         onFocus={() => setOpen(true)}
//                         placeholder={selected.length === 0 ? placeholder : undefined}
//                         className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
//                     />
//                 </div>
//             </div>
//             <div className="relative mt-2">
//                 {open && filteredOptions.length > 0 && (
//                     <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
//                         <CommandGroup className="max-h-[200px] overflow-auto">
//                             {filteredOptions.map((option) => (
//                                 <CommandItem
//                                     key={option.value}
//                                     onSelect={() => handleSelect(option.value)}
//                                     className="cursor-pointer"
//                                 >
//                                     {option.label}
//                                 </CommandItem>
//                             ))}
//                         </CommandGroup>
//                     </div>
//                 )}
//             </div>
//         </Command>
//     )
// }