import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "~/lib/api/employees"
import {
  DEFAULT_PAGE_LIMIT,
} from "~/lib/constants"

export function useEmployees({
  page = 1, limit = DEFAULT_PAGE_LIMIT,
}: {
  page?: number
  limit?: number
}) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: [
      "employees",
      page,
      limit,
    ],
    queryFn: () =>
      fetchEmployees(),
  })

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["employees"],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["employees"],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["employees"],
      })
    },
  })

  return {
    employees: query.data,
    isLoading: query.isLoading,
    error: query.error,
    totalPages: query.data?.length ? Math.ceil(query.data.length / limit) : 0,

    // Mutations
    createEmployee: createMutation,
    updateEmployee: updateMutation,
    deleteEmployee: deleteMutation,
  }
}
