import {
  z,
} from 'zod'

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url("Invalid image URL"),
  age: z.number().int().min(18, "Age must be at least 18"),
  salary: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid salary format"),
})

export type Employee = z.infer<typeof employeeSchema>;
