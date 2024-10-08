import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  slug: z.string().min(1, 'Slug is required').max(255, 'Slug is too long'),
  description: z.string().optional(),
  parentId: z
    .number()
    .int('Parent ID must be an integer')
    .positive('Parent ID must be positive')
    .optional()
})

type CategoryInput = z.infer<typeof categorySchema>

export { categorySchema, CategoryInput }
