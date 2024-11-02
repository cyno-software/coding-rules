"use client"

import React, {
  useMemo, useState,
} from "react"

import {
  useRouter, useSearchParams,
} from "next/navigation"

import {
  type ColumnDef,
} from "@tanstack/react-table"

import {
  EmployeeDialog,
} from "~/components/dialogs/employee-dialog"
import {
  BaseTable,
} from "~/components/tables/base-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import {
  Avatar, AvatarFallback, AvatarImage,
} from "~/components/ui/avatar"
import {
  Button,
} from "~/components/ui/button"

import {
  useEmployees,
} from "~/lib/hooks/use-employees"

import {
  type Employee,
} from "~/types/employee"

export const EmployeesTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const {
    employees, isLoading, error, createEmployee, updateEmployee, deleteEmployee, totalPages,
  } = useEmployees({
    page,
  })

  const [
    dialogEmployee,
    setDialogEmployee,
  ] = React.useState<Employee | null>(null)
  const [
    deleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false)
  const [
    employeeToDelete,
    setEmployeeToDelete,
  ] = useState<Employee | null>(null)

  const handleEmployeeSubmit = (employee: Omit<Employee, "id"> | Employee) => {
    setDialogEmployee(null)
    if ("id" in employee) {
      updateEmployee.mutate(employee)

      return
    }
    createEmployee.mutate(employee)
  }

  const handleRowClick = (employee: Employee) => {
    router.push(`/samples/${employee.id}`)
  }

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee.mutate(employeeToDelete.id)
    }
    setDeleteDialogOpen(false)
    setEmployeeToDelete(null)
  }

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "image",
        header: "Avatar",
        cell: info => (
          <Avatar>
            <AvatarImage
              src={info.getValue<Employee["image"]>()}
              alt={info.row.original.name}
            />

            <AvatarFallback>{info.row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: info => info.getValue<Employee["name"]>(),
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: info => info.getValue<Employee["age"]>(),
      },
      {
        accessorKey: "salary",
        header: "Salary",
        cell: info => `$${info.getValue()}`,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div onClick={e => e.stopPropagation()}>
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setDialogEmployee(row.original)}
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => handleDeleteClick(row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ], []
  )

  return (
    <div>
      <Button
        onClick={
          () => setDialogEmployee({
          } as Employee)
        }
      >
        Add Employee
      </Button>

      <EmployeeDialog
        item={dialogEmployee}
        onClose={() => setDialogEmployee(null)}
        onSubmit={handleEmployeeSubmit}
      />

      <BaseTable
        data={employees ?? []}
        columns={columns}
        onRowClick={handleRowClick}
        isLoading={isLoading}
        error={error}
        totalPages={totalPages}
      />

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this employee?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee
              {employeeToDelete ? ` ${employeeToDelete.name}` : null}

              {" "}
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
