import {
  api,
} from "~/lib/modules/api"

import {
  type Employee,
} from "~/types/employee"

export type FetchEmployeesResponse = Employee[]

export const fetchEmployees = async () => {
  const response = await api.get<FetchEmployeesResponse>("/employees")

  return response
}

export const createEmployee = async (employee: Omit<Employee, "id">) => {
  const response = await api.post<Employee>(
    "/employees", employee
  )

  return response
}

export const updateEmployee = async (employee: Employee) => {
  const response = await api.put(
    "/employees", employee
  )

  return response
}

export const deleteEmployee = async (id: string) => {
  await api.delete(`employees/${id}`)
}
