import { Category, PrismaClient } from '@prisma/client'
import prismaService from '../services/prisma.service'
import { CategoryInput, categorySchema } from '../schemas/category.schema'
import { ApiError } from '../utils/apiError.handle'

export class CategoryService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prismaService.getInstance()
  }

  async find(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany()
    if (!categories) {
      throw new ApiError(500, 'Error fetching categories')
    }

    return categories
  }

  async findOne(id: number): Promise<Category | null> {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id
      }
    })

    if (!existingCategory) {
      throw new ApiError(404, 'Category not found')
    }

    return existingCategory
  }

  async create(data: CategoryInput) {
    const validatedData = categorySchema.parse(data)
    const newCategory = await this.prisma.category.create({
      data: validatedData
    })

    return newCategory
  }

  async update(id: number, changes: CategoryInput) {
    const validatedData = categorySchema.parse(changes)
    await this.findOne(id)
    const updatedCategory = await this.prisma.category.update({
      where: {
        id: id
      },
      data: validatedData
    })

    return updatedCategory
  }

  async delete(id: number) {
    await this.findOne(id)
    const deletedCategory = await this.prisma.category.delete({
      where: {
        id
      }
    })

    return deletedCategory
  }
}
