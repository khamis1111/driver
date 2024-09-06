import {
    CaretSortIcon, DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { useState } from "react";

import { Col, Row } from "react-bootstrap";
import { RiEditLine } from "react-icons/ri";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../components/ui/drawer";
import { ComboboxSearch } from "../CheckBoxs/ComboboxSearch";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import { DeleteData } from "../../api/Axios/useDeleteData";
import { EditData } from "../../api/Axios/useEditData";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { DateFormate } from "../../utils/Dates/DateFormate";
import DateTimePicker from "../../utils/Dates/DateTimePicker";
import notify from "../../utils/useToastify";
import { Link } from "react-router-dom";

const ActionCell = ({ row, getAllAppointment, allUser }) => {
    const [isOpen, setIsOpen] = useState(false)

    const [patientName, setPatientName] = useState()
    const [description, setDescription] = useState()
    const [newDate, setNewDate] = useState()

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

    const handleShowEdit = () => {
        setPatientName(row.original.patientName)
        setDescription(row.original.description)
        setNewDate(row.original.date)
    }

    const handleEditAppointment = (e) => {
        e.preventDefault()

        EditData(`/api/v1/appointment/${row.original._id}`, {
            patientName,
            description,
            date: newDate
        }).then(res => {
            notify('تم التعديل بنجاح', 'success')
            getAllAppointment()
            setPatientName()
            setDescription()
            setNewDate()
            setIsOpen(false)
        }).catch(err => {
            console.log(err)
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        })
    }

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
                {/* Edit */}
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerTrigger className="w-100 transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <span className='d-flex justify-content-between px-2 text-green-600 fw-bold mb-1'
                            onClick={() => handleShowEdit()}
                        >
                            <DropdownMenuShortcut className='m-0'><RiEditLine size='19' /></DropdownMenuShortcut>
                            التعديل
                        </span>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='fs-2'>{row.original.patientName}</DrawerTitle>
                            <DrawerDescription>إجراءات تعديل الموعد للمريض</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Row>
                                <Col md={6} className='d-flex flex-column justify-content-center m-auto gap-2'>
                                    <ComboboxSearch holderMsg={'اختر اسم المريض'}
                                        frameworks={allUser.data} setPatientName={setPatientName} patientName={patientName}
                                    />
                                    <DateTimePicker setNewDate={setNewDate} newDate={newDate} />
                                    <Input type="text" placeholder="تفاصيل الموعد"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <div className="d-flex justify-content-between">
                                        <DrawerClose>
                                            <Button variant="outline">الغاء</Button>
                                        </DrawerClose>
                                        <Button variant="default" onClick={(e) => handleEditAppointment(e)}>تعديل</Button>
                                    </div>
                                </Col>
                            </Row>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                {/* Delete */}
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
                            <AlertDialogDescription>{row.original.patientName}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className="d-flex align-items-center m-auto gap-2">
                                <AlertDialogCancel className='m-0'>الغاء</AlertDialogCancel>
                                <AlertDialogAction className='bg-danger' onClick={(e) => handleDeleteAppointment(e, row.original._id)}>
                                    <span> حذف</span>
                                </AlertDialogAction>
                            </div>

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu >
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

export function AllAppointmentTable({ getAllAppointment, allUser, allAppointment, loading }) {
    const data = allAppointment?.data ?? [];
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "patientName",
            header: "اسم المريض",
            cell: ({ row }) => (
                <div className="capitalize">
                    {<Link to={`/patientsDetails/${allUser.data && allUser.data?.filter(user => user.name === row.original.patientName)[0]?._id}`}>{row.getValue("patientName")}</Link>}
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
            cell: ({ row }) => <ActionCell row={row} getAllAppointment={getAllAppointment} allUser={allUser} />,
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
            <div className="flex items-center pb-3 gap-2">
                <Input
                    placeholder="البحث عن طريق الاسم..."
                    value={(table.getColumn("patientName")?.getFilterValue() ?? "")}
                    onChange={(event) =>
                        table.getColumn("patientName")?.setFilterValue(event.target.value)
                    }
                    className="w-100"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="mr-auto">
                            عرض
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

                            {/* <ChevronDownIcon className="ml-2 h-4 w-4" /> */}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border mt-4">
                <Table>
                    <TableHeader >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='text-right'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            loading ?
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell._id}>
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
            <div className="flex items-center justify-end space-x-2 pt-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    تم تحديد {table.getFilteredSelectedRowModel().rows.length} من {table.getFilteredRowModel().rows.length}  صفًا.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        السابق
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        التالي
                    </Button>
                </div>
            </div>
        </div>
    );
}
