import React, { useState } from 'react'
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../components/ui/command'
import { Check, MapPin } from 'lucide-react'
import { cn } from "../lib/utils"

export default function DestinationPicker({ arrayOfData = [], data, setData, placeholder }) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input
                        placeholder={placeholder}
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder='Search' />
                    <CommandList>
                        <CommandEmpty className='p-2 text-center fw-bold'>{'There is no data'}</CommandEmpty>
                        <CommandGroup>
                            {arrayOfData.map((res) => (
                                <CommandItem
                                    key={res.name}
                                    value={res.name}
                                    onSelect={(currentValue) => {
                                        setData(currentValue === data ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            data === res.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {res.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}