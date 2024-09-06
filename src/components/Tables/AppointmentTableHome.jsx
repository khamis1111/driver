import {
    CaretSortIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "../ui/button";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
import { DeleteData } from "../../api/Axios/useDeleteData";
import { DateFormate } from "../../utils/Dates/DateFormate";
import notify from "../../utils/useToastify";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

const ActionCell = ({ row, getAllAppointment }) => {
    const handleDeleteAppointment = (e, id) => {
        e.preventDefault();

        DeleteData(`/api/v1/appointment/${id}`).then(res => {
            notify('تم الحذف', 'warn');
            getAllAppointment()
        }).catch(err => {
            console.log(err);
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error');
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-end">
                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                <DropdownMenuItem
                    className='justify-center'
                    onClick={() => navigator.clipboard.writeText(row.original.patientName)}
                >
                    نسخ اسم المريض
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <span className="d-flex justify-content-between align-items-center px-2 text-red-600 fw-bold">
                            <DropdownMenuShortcut className='m-0'>⌫</DropdownMenuShortcut>
                            الحذف
                        </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle> هل انت متأكد من الحذف ؟</AlertDialogTitle>
                            <AlertDialogDescription>{row.getValue("patientName")}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className="d-flex align-items-center m-auto gap-2">
                                <AlertDialogCancel className='m-0'>الغاء</AlertDialogCancel>
                                <AlertDialogAction onClick={(e) => handleDeleteAppointment(e, row.original._id)} className='bg-danger'>
                                    حذف
                                </AlertDialogAction>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const DateHeader = ({ column }) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <span className="flex items-center cursor-pointer w-auto">
                        التوقيت
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className='justify-between'
                        onClick={() => {
                            column.toggleSorting(false);
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        تصاعدي
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className='justify-between'
                        onClick={() => {
                            column.toggleSorting(true);
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"><path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        تنازلي
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    );
}

export function AppointmentTableHome({ getAllAppointment, allUser, allAppointment, loading }) {
    const data = allAppointment?.data ?? [];
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const columns = [
        {
            accessorKey: "patientName",
            header: "اسم المريض",
            cell: ({ row }) => (
                <div className="capitalize">
                    {<Link to=
                        {`/patientsDetails/${allUser.data && allUser.data?.filter(user => user.name === row.original.patientName)[0]?._id}`}
                    >{row.getValue("patientName")}</Link>}
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: "تفاصيل الموعد",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("description")}</div>
            ),
        },
        {
            accessorKey: "date",
            header: ({ column }) => <DateHeader column={column} />,
            cell: ({ row }) => DateFormate(row.getValue("date")),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row, table }) => <ActionCell row={row} allAppointment={table.options.data} getAllAppointment={getAllAppointment} />,
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="rounded-md border mt-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className='text-right'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            loading ?
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            لا يوجد مواعيد
                                        </TableCell>
                                    </TableRow>
                                )
                                : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            جاري تحميل المواعيد...
                                        </TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
