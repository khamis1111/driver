import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import { cn } from "../../lib/utils"

export function ComboboxSearch({ emptyMsg, holderMsg, frameworks, setPatientName, patientName }) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-100 justify-between px-3"
                >
                    {patientName
                        ? frameworks.find((framework) => framework.name === patientName)?.name || patientName
                        : `${holderMsg}`}
                    <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-100 p-0">
                <Command>
                    <CommandInput placeholder={holderMsg} />
                    <CommandList>
                        <CommandEmpty>{emptyMsg}</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.name}
                                    value={framework.name}
                                    onSelect={(currentValue) => {
                                        setPatientName(currentValue === patientName ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "ml-2 h-4 w-4",
                                            patientName === framework.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
