import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import { cn } from "../../lib/utils"
import { DateFormate } from "./DateFormate"
import { FormateDateToIso } from "./FormateDateToISO"

export default function DateTimePicker({ setNewDate, newDate }) {
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState()
    const [time, setTime] = useState()

    const hours = Array.from({ length: 12 }, (_, i) => i + 1)
    const minutes = Array.from({ length: 60 }, (_, i) => i)

    useEffect(() => {
        if (isOpen && date) {
            setNewDate(FormateDateToIso(date, time))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, date, time])

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-100 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {newDate ? <>{DateFormate(newDate)}</> : <span>اختر التاريخ والوقت</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 text-center" align="center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => setDate(newDate || new Date())}
                    initialFocus
                />
                <div className="p-2 border-t border-border">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-100 justify-start text-left font-normal",
                                    !time && "text-muted-foreground"
                                )}
                            >
                                <Clock className="ml-2 h-4 w-4" />
                                {time ? time : <span>اختر الوقت</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-100 p-2" align="center">
                            <div className="d-flex gap-2 align-items-center">
                                <Select onValueChange={(value) => setTime((prev) => `${value}:${prev?.split(':')[1] || '00'} ${prev?.split(' ')[1] || 'AM'}`)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Hour" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hours.map((hour) => (
                                            <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                                                {hour}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(value) => setTime((prev) => `${prev?.split(':')[0] || '12'}:${value} ${prev?.split(' ')[1] || 'AM'}`)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Minute" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {minutes.map((minute) => (
                                            <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                                                {minute.toString().padStart(2, '0')}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(value) => setTime((prev) => `${prev?.split(' ')[0] || '12:00'} ${value}`)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="AM/PM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AM">AM</SelectItem>
                                        <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </PopoverContent>
        </Popover>
    )
}