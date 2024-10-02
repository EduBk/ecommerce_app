// const { faker } = require('@faker-js/faker');
// const boom = require('@hapi/boom');
import { Product } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import prismaService from '../services/prisma.service'
import { CreateProductDto } from '../dtos/types'

export class ProductsService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prismaService.getInstance()
  }

  async find(): Promise<Product[]> {
    return this.prisma.product.findMany()
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    })
  }

  async create(data: CreateProductDto) {
    const newProduct = await this.prisma.product.create({
      data
    })

    return newProduct
  }

  async update(id: number, changes: CreateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id: id
      },
      data: changes
    })

    return updatedProduct
  }

  async delete(id: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id: id
      }
    })

    return deletedProduct
  }
}
