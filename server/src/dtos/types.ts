import { Product } from '@prisma/client'
import { Category } from '@prisma/client'

export type CreateProductDto = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
export type CreateCategoryDto = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'parentId'>