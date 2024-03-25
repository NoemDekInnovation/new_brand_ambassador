"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
} from "@radix-ui/react-icons";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { format } from "date-fns";
import useUpdateUser from "../../hooks/modals/useUpdateUser";
import useSuspendUser from "../../hooks/modals/useSuspendUser";
import useDeleteUser from "../../hooks/modals/useDeleteUser";
import useResetUser from "../../hooks/modals/UserReset";
import useCreateUser from "../../hooks/modals/UserCreate";
import useUnsuspendUser from "../../hooks/modals/useUnsuspendUser";
import useUserOverview from "../../hooks/modals/useUserOverview";
import UserAlert from "./UserAler";

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     email: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
// ];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const Overview = ({ row }: any) => {
  const overview = useUserOverview();
  return (
    <div
      className="capitalize text-xs cursor-pointer"
      onClick={() => {
        overview.setData(row.original);
        overview.onOpen();
      }}
    >
      {row.getValue("firstName")}
    </div>
  );
};

export const columns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "IDNumber",
    header: "ID",
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("IDNumber")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => <Overview row={row} />,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="text-xs capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => (
      <div className="lowercase text-xs">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "metaData.createdBy",
    header: "Created By",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="capitalize text-xs">
          {user.metaData?.createdBy?.firstName}{" "}
          {user.metaData?.createdBy?.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "metaData.status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;
      return <div className="capitalize text-xs">{user.metaData.status}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (
      <div className="lowercase text-xs">
        {row.original.createdAt
          ? format(new Date(row.getValue("createdAt")), "MM/dd/yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "metaData.lastLogin",
    header: "Last Logged in",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="capitalize text-xs">
          {user.metaData.lastLogin
            ? format(new Date(user.metaData.lastLogin), "MM/dd/yyyy")
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="lowercase text-xs">{row.getValue("duration")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return <Actions payment={payment} />;
    },
  },
];

const Actions = ({ payment }: any) => {
  const updateUser = useUpdateUser();
  const suspendUser = useSuspendUser();
  const unsuspendUser = useUnsuspendUser();
  const deleteUser = useDeleteUser();
  const resetUser = useResetUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            updateUser.setData(payment);
            updateUser.onOpen();
          }}
          className="p-2 hover:bg-white/70"
        >
          Update User
        </DropdownMenuItem>
        {payment?.metaData?.status === "active" && (
          <>
            <DropdownMenuItem
              className=" p-2 hover:bg-white/70"
              onClick={() => {
                suspendUser.setData(payment);
                suspendUser.onOpen();
              }}
            >
              Suspend User
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem
          onClick={() => {
            resetUser.setData(payment);
            resetUser.onOpen();
          }}
          className="p-2 hover:bg-white/70"
        >
          Reset Password
        </DropdownMenuItem>

        {payment?.metaData?.status === "suspended" && (
          <DropdownMenuItem
            className=" p-2 hover:bg-white/70"
            onClick={() => {
              unsuspendUser.setData(payment);
              unsuspendUser.onOpen();
            }}
          >
            Unsuspend User
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Send Email</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 p-2 hover:bg-white/70"
          onClick={() => {
            deleteUser.setData(payment);
            deleteUser.onOpen();
          }}
        >
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export interface TalentQueryProp {
  [key: string]: string | number;
}

export function UsersTable({
  data,
  pageSize,
  page,
  totalTalent,
}: {
  data: any;
  pageSize: number;
  page: number;
  totalTalent: any;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { onOpen } = useCreateUser();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
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
      globalFilter,
    },
  });

  const [sortQuery, setSortQuery] = React.useState<TalentQueryProp | null>(
    null
  );

  const negativePage = pageSize - 1;
  const positivePage = pageSize + 1;

  const updateQuery = (newValues: any) => {
    setSortQuery((prevQuery: any) => ({ ...prevQuery, ...newValues }));
  };

  const handlePageChange = (size: any) => {
    updateQuery({ page: size });
  };

  const handlePageSizeChange = (size: any) => {
    updateQuery({ pageSize: size });
  };

  return (
    <div className="w-full space-y-3">
      <div className="my-4">
        <h4 className="text-xl sm:text-2xl font-medium">Users</h4>
      </div>
      <UserAlert />
      <div className="w-full bg-white border rounded-lg">
        <div className="flex items-center sm:flex-row flex-col justify-between w-full bg-[#F7F7F7] p-4">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="w-full md:w-[450px] placeholder:text-[10px] md:placeholder:text-sm"
            placeholder="Search filter (ID, name, status created by, created date)"
          />
          <Button
            className="bg-[#63666A] text-white py-4 h-12"
            onClick={onOpen}
          >
            Create User
          </Button>{" "}
        </div>
        <div className="rounded-md border">
          <Table className="h-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-sm capitalize">
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
              {table.getRowModel().rows?.length ? (
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="bg-[#F7F7F7] flex flex-col gap-5 md:flex-row justify-between items-center p-4">
          <div className="flex items-center">
            <p className=" whitespace-nowrap  mr-2 text-xs">Rows Per Page:</p>
            <div className="flex items-center gap-3">
              {[10, 20, 30, 40, 50].map((n, idx) => {
                return (
                  <div
                    className={`hover:bg-gray-300 text-xs  ${
                      pageSize === n ? "bg-gray-300" : ""
                    } rounded p-2 transition-all duration-400 cursor-pointer`}
                    key={idx}
                    onClick={() => handlePageSizeChange(n)}
                  >
                    {n}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-8 text-bm_black/75 text-xs whitespace-nowrap">
            <div className="">First</div>

            <div className="flex gap-8 text-bm_black/75 text-[14px]">
              <p className="text-[10px]">Back</p>

              <p className="text-[10px]">
                {page * pageSize - negativePage} -{" "}
                {page * pageSize >= totalTalent ? totalTalent : page * pageSize}{" "}
                of {totalTalent}
              </p>

              <p className="text-[10px]">Next</p>

              <p className="text-[10px]">Last</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
