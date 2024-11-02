import React, {
  type ReactNode,
} from "react"

import {
  useRouter, useSearchParams,
} from "next/navigation"

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  type ColumnDef,
} from "@tanstack/react-table"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

interface BaseTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  onRowClick?: (row: T) => void
  isLoading: boolean
  error: Error | null
  totalPages?: number
  LoadingComponent?: ReactNode
  ErrorComponent?: ReactNode
}

export function BaseTable<T>({
  data,
  columns,
  onRowClick,
  isLoading,
  error,
  totalPages = 0,
  LoadingComponent,
  ErrorComponent,
}: BaseTableProps<T>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set(
      "page", newPage.toString()
    )
    router.push(`?${params.toString()}`)
  }

  if (isLoading) {
    return LoadingComponent || <div>Loading...</div>
  }

  if (error) {
    return ErrorComponent || (
      <div>
        An error occurred:
        {error.message}
      </div>
    )
  }

  return (
    <div>
      <Table className="w-full">
        <TableHeader>
          {
            table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </TableHead>
                  ))
                }
              </TableRow>
            ))
          }
        </TableHeader>

        <TableBody>
          {
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick && onRowClick(row.original)}
                className={onRowClick ? "cursor-pointer hover:bg-gray-100" : ""}
              >
                {
                  row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {
                        flexRender(
                          cell.column.columnDef.cell, cell.getContext()
                        )
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={
                () => setPage(Math.max(
                  1, page - 1
                ))
              }
              disabled={page <= 1}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={
                () => setPage(totalPages ? Math.min(
                  totalPages, page + 1
                ) : page + 1)
              }
              disabled={page >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
