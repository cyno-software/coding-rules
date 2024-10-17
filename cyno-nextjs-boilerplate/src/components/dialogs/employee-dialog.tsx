"use client"

import React from "react"

import {
  EmployeeForm,
} from "~/components/forms/employee-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"

import {
  type Employee,
} from "~/types/employee"

interface EmployeeDialogProps {
  item: Employee | null
  onClose: () => void
  onSubmit: (employee: Omit<Employee, "id"> | Employee) => void
}

export function EmployeeDialog({
  item, onClose, onSubmit,
}: EmployeeDialogProps) {
  const isOpen = item !== null
  const isNewEmployee = isOpen && !("id" in item)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isNewEmployee ? "Add New Employee" : "Edit Employee"}</DialogTitle>
        </DialogHeader>
        <EmployeeForm
          initialValues={isNewEmployee ? null : item}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
