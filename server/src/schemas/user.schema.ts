import { z } from 'zod'

const RoleEnum = z.enum(['ADMIN', 'CUSTOMER', 'MANAGER', 'SELLER'])

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  role: RoleEnum.optional().default('CUSTOMER'),
  lastLogin: z.date().optional().nullable()
})

type UserInput = z.infer<typeof userSchema>

export { userSchema, UserInput, RoleEnum }
