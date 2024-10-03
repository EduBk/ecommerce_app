// const { faker } = require('@faker-js/faker');
// const boom = require('@hapi/boom');
import { Category } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import prismaService from '../services/prisma.service'
import { CreateCategoryDto } from '../dtos/types'

export class CategoryService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prismaService.getInstance()
  }

  async find(): Promise<Category[]> {
    return this.prisma.category.findMany()
  }

  async findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id
      }
    })
  }

  async create(data: CreateCategoryDto) {
    const dataWithSlug = this.getSlug(data)
    const newCategory = await this.prisma.category.create({
      data: dataWithSlug
    })

    return newCategory
  }

  async update(id: number, changes: CreateCategoryDto) {
    const updatedCategory = await this.prisma.category.update({
      where: {
        id: id
      },
      data: changes
    })

    return updatedCategory
  }

  async delete(id: number) {
    const deletedCategory = await this.prisma.category.delete({
      where: {
        id: id
      }
    })

    return deletedCategory
  }

  getSlug = (data: CreateCategoryDto) => {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-')
    const dataWithSlug = { ...data, slug }
    // console.log(dataWithSlug)
    return dataWithSlug
  }
}
