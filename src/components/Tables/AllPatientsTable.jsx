"use client";

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
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
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

import { Link } from "react-router-dom";
import { DeleteData } from "../../api/Axios/useDeleteData";
import { EditData } from "../../api/Axios/useEditData";
import notify from "../../utils/useToastify";
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
} from "../ui/alert-dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const ActionCell = ({ row, getAllUsers }) => {
    const [isOpen, setIsOpen] = useState()

    const [name, setName] = useState()
    const [gender, setGender] = useState()
    const [age, setAge] = useState()
    const [phone, setPhone] = useState()
    const [price, setPrice] = useState()
    const [paid, setPaid] = useState()
    const [medicalConditions, setMedicalConditions] = useState()
    const [allergies, setAllergies] = useState()
    const [currentComplaints, setCurrentComplaints] = useState()
    const [recommendations, setRecommendations] = useState()

    const handleDeleteUser = (e, id) => {
        e.preventDefault()

        DeleteData(`/api/v1/userInfo/${id}`).then(res => {
            notify('تم الحذف', 'warn')
            getAllUsers()
        }).catch(err => {
            console.log(err)
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        })
    }

    const handleShowEdit = () => {
        setName(row.original.name)
        setGender(row.original.gender)
        setAge(row.original.age)
        setPhone(row.original.phone)
        setPrice(row.original.price)
        setPaid(row.original.paid)
        setMedicalConditions(row.original.medicalConditions)
        setAllergies(row.original.allergies)
        setCurrentComplaints(row.original.currentComplaints)
        setRecommendations(row.original.recommendations)
    }

    const handleUpdateUser = (e) => {
        e.preventDefault()

        EditData(`/api/v1/userInfo/${row.original._id}`, {
            name,
            gender,
            age,
            phone,
            price,
            paid,
            medicalConditions,
            allergies,
            currentComplaints,
            recommendations
        }).then((res) => {
            notify('تم التعديل بنجاح', 'success')
            getAllUsers()
            setIsOpen(false)
        }).catch((err) => {
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
                >
                    <Link to={`/patientsDetails/${row.original._id}`} className="fw-bold"> تفاصيل المريض</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='justify-center'
                    onClick={() => navigator.clipboard.writeText(row.original.name)}
                >
                    نسخ اسم المريض
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Update */}
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
                            <DrawerTitle className='fs-2'>احمد خميس</DrawerTitle>
                            <DrawerDescription>إجراءات تعديل المريض</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className=''>
                            <Row>
                                <Col md={6} className='d-flex flex-column justify-content-center m-auto gap-2'>
                                    <Row className='gap-2 px-2'>
                                        <Col className='p-0'>
                                            <Input type="text" placeholder="اسم المريض"
                                                value={name} onChange={(e) => setName(e.target.value)}
                                            />
                                        </Col>
                                        <Col className='p-0'>
                                            <Select value={gender} onValueChange={setGender}>
                                                <SelectTrigger className="w-100">
                                                    <SelectValue placeholder="النوع" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="male">ذكر</SelectItem>
                                                        <SelectItem value="female">انثي</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className='gap-2 px-2'>
                                        <Col className='p-0'>
                                            <Input type="number" placeholder="العمر"
                                                value={age} onChange={(e) => setAge(e.target.value)}
                                            />
                                        </Col>
                                        <Col className='p-0'>
                                            <Input type="number" placeholder="رقم الهاتف"
                                                value={phone} onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='gap-2 px-2'>
                                        <Col className='p-0'>
                                            <Input type="number" placeholder="السعر"
                                                value={price} onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </Col>
                                        <Col className='p-0'>
                                            <Input type="number" placeholder="المدفوع حاليا"
                                                value={paid} onChange={(e) => setPaid(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='gap-2 px-2'>
                                        <Col className='p-0'>
                                            <Input type="text" placeholder="الحالة الطبية"
                                                value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)}
                                            />
                                        </Col>
                                        <Col className='p-0'>
                                            <Input type="text" placeholder="الحساسية"
                                                value={allergies} onChange={(e) => setAllergies(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='gap-2 px-2'>
                                        <Input type="text" placeholder="الشكاوي الحالية"
                                            value={currentComplaints} onChange={(e) => setCurrentComplaints(e.target.value)}
                                        />
                                        <Input type="text" placeholder="توصيات الدكتور للمريض"
                                            value={recommendations} onChange={(e) => setRecommendations(e.target.value)}
                                        />
                                    </Row>
                                    <div className="d-flex flex-wrap gap-2 justify-content-between">
                                        <DrawerClose>
                                            <Button variant="outline">الغاء</Button>
                                        </DrawerClose>
                                        <Button variant="default" onClick={(e) => handleUpdateUser(e)}>تعديل</Button>
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
                            <AlertDialogDescription>{row.original.name}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className="d-flex align-items-center m-auto gap-2">
                                <AlertDialogCancel className='m-0'>الغاء</AlertDialogCancel>
                                <AlertDialogAction className='bg-danger'>
                                    <span variant="destructive" onClick={(e) => handleDeleteUser(e, row.original._id)}>حذف</span>
                                </AlertDialogAction>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};


export function AllPatientsTable({ getAllUsers, allUser, loading }) {
    const data = allUser?.data ?? [];
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
            accessorKey: "name",
            header: "اسم المريض",
            cell: ({ row }) => (
                <Link to={`/patientsDetails/${row.original._id}`}><div className="capitalize">{row.getValue("name")}</div></Link>
            ),
        },
        {
            accessorKey: "price",
            header: () => <div>السعر</div>,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"));

                // Format the price as a dollar price
                const formatted = new Intl.NumberFormat("ar-US", {
                    style: "currency",
                    currency: "EGP",
                }).format(price);

                return <div className="text-right font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: "isPaid",
            header: ({ column, table }) => {
                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <span className="flex items-center cursor-pointer w-auto">
                                    حالة الدفع
                                    <CaretSortIcon className="ml-2 h-4 w-4" />
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuCheckboxItem
                                    className='justify-end'
                                    checked={(table.getColumn("isPaid")?.getFilterValue() === true)}
                                    onClick={(event) =>
                                        table.getColumn("isPaid")?.setFilterValue(true)
                                    }
                                >
                                    مدفوع
                                </DropdownMenuCheckboxItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                    checked={(table.getColumn("isPaid")?.getFilterValue() === false)}
                                    className='justify-end'
                                    onClick={(event) =>
                                        table.getColumn("isPaid")?.setFilterValue(false)
                                    }
                                >
                                    مستحق
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize">{
                    row.getValue("isPaid") === true
                        ? <span className="text-success">مدفوع</span>
                        : <span className="text-danger">مستحق</span>
                }</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => <ActionCell row={row} getAllUsers={getAllUsers} />,
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
                    value={(table.getColumn("name")?.getFilterValue() ?? "")}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="w-100"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="mr-auto">
                            عرض
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
                                            لا يوجد مرضي
                                        </TableCell>
                                    </TableRow>
                                )
                                : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            جاري تحميل المرضي...
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
