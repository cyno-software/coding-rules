"use client"

import React from "react"

import {
  zodResolver,
} from "@hookform/resolvers/zod"
import {
  useForm, type SubmitHandler,
} from "react-hook-form"

import {
  Button,
} from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import {
  Input,
} from "~/components/ui/input"

import {
  type Employee, employeeSchema,
} from "~/types/employee"

interface EmployeeFormProps {
  onSubmit: (data: Omit<Employee, "id"> | Employee) => void
  initialValues: Employee | null
  onCancel: () => void
}

export const EmployeeForm = ({
  onSubmit, initialValues, onCancel,
}: EmployeeFormProps) => {
  const form = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialValues ?? {
      name: "",
      image: "",
      age: 18,
      salary: "",
    },
  })

  const handleSubmit: SubmitHandler<Employee> = (data) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )
          }
        />

        <FormField
          control={form.control}
          name="image"
          render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>

                <FormControl>
                  <Input
                    placeholder="https://example.com/avatar.jpg"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )
          }
        />

        <FormField
          control={form.control}
          name="age"
          render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={
                      e => field.onChange(parseInt(
                        e.target.value, 10
                      ))
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )
          }
        />

        <FormField
          control={form.control}
          name="salary"
          render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>

                <FormControl>
                  <Input
                    placeholder="50000.00"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )
          }
        />

        <Button
          type="submit"
          className="mr-2"
        >
          Submit
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </form>
    </Form>
  )
}
