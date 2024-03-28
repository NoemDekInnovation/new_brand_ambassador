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

import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Input } from "../../../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import useAddOutlet from "../../../hooks/modals/useAddOutlet";
import useDeleteOutlet from "../../../hooks/modals/useDeleteOutlet";
import useUpdateOutlet from "../../../hooks/modals/useUpdateOutlet";
import useManageOutlet from "../../../hooks/modals/useManageOutlet";
import useOutletOverview from "../../../hooks/modals/useOutletOverview";
import useMakePrivateOutlet from "../../../hooks/modals/useMakePrivateOutlet";
import useMakePublicOutlet from "../../../hooks/modals/useMakePublicOutlet";
import TainingAlert from "./TrainingAlert";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const Overview = ({ row }: any) => {
  const overview = useOutletOverview();
  return (
    <div
      className="capitalize cursor-pointer"
      onClick={() => {
        overview.setData(row.original);
        overview.onOpen();
      }}
    >
      {row.getValue("outletName")}
    </div>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "outletName",
    header: "Outlet Name",
    cell: ({ row }) => <Overview row={row} />,
  },
  {
    accessorKey: "outletType",
    header: "Outlet Type",
    cell: ({ row }) => <div className="">{row.getValue("outletType")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return <div className="">{row.getValue("location")}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const outlet = row.original;
      return (
        <div className="">
          {outlet?.address?.street}, {outlet?.address?.city},{" "}
          {outlet?.address?.zipCode} {outlet?.address?.state}
        </div>
      );
    },
  },
  {
    accessorKey: "contactEmail",
    header: "Contact Email",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("contactEmail")}</div>
    ),
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => <div className="">{row.getValue("contactNumber")}</div>,
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
  const deleteUser = useDeleteOutlet();
  const updateUser = useUpdateOutlet();
  const managePicture = useManageOutlet();
  const makePrivate = useMakePrivateOutlet();
  const makePublic = useMakePublicOutlet();

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
          className="t p-3 hover:bg-white/70"
          onClick={() => {
            managePicture.setData(payment);
            managePicture.onOpen();
          }}
        >
          Manage Pictures
        </DropdownMenuItem>
        <DropdownMenuItem
          className="t p-3 hover:bg-white/70"
          onClick={() => {
            updateUser.setData(payment);
            updateUser.onOpen();
          }}
        >
          Update
        </DropdownMenuItem>
        {payment.status === "Public" ? (
          <DropdownMenuItem
            className="t p-3 hover:bg-white/70"
            onClick={() => {
              makePrivate.setData(payment);
              makePrivate.onOpen();
            }}
          >
            Make Private
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="t p-3 hover:bg-white/70"
            onClick={() => {
              makePublic.setData(payment);
              makePublic.onOpen();
            }}
          >
            Make Public
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="text-red-500 p-3 hover:bg-white/70"
          onClick={() => {
            deleteUser.setData(payment);
            deleteUser.onOpen();
          }}
        >
          Delete Outlet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export interface TalentQueryProp {
  [key: string]: string | number;
}
export function OutletTable({ data, pageSize, page, totalTalent }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const { onOpen } = useAddOutlet();
  const [sortQuery, setSortQuery] = React.useState<TalentQueryProp | null>(
    null
  );

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
      globalFilter,
    },
  });

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
    <div className="w-full h-full space-y-4">
      <TainingAlert />

      <div className="flex items-center sm:flex-row flex-col justify-between w-full bg-[#F7F7F7] p-4">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="w-full md:w-[450px] placeholder:text-[10px] md:placeholder:text-sm"
          placeholder="Search filter (Name, type, location, address)"
        />
        <Button className="bg-[#63666A] text-white py-4 h-12" onClick={onOpen}>
          Add Outlet
        </Button>{" "}
      </div>
      <div className="rounded-md border">
        <div className="h-[40vh]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
        <div className=" bg-[#F7F7F7] flex flex-col gap-5 md:flex-row justify-between  items-center p-4">
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