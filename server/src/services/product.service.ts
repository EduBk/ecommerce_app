import { Product, PrismaClient } from '@prisma/client'
import prismaService from '../services/prisma.service'
import { ProductInput, productSchema } from '../schemas/product.schema'
import { ApiError } from '../utils/apiError.handle'

export class ProductsService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prismaService.getInstance()
  }

  async find(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        category: true
      }
    })
    if (!products) {
      throw new ApiError(500, 'Error fetching products')
    }

    return products
  }

  async findOne(id: number): Promise<Product | null> {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    })

    if (!existingProduct) {
      throw new ApiError(404, 'Product not found')
    }

    return existingProduct
  }

  async create(data: ProductInput) {
    const validatedData = productSchema.parse(data)
    const newProduct = await this.prisma.product.create({
      data: validatedData
    })

    return newProduct
  }

  async update(id: number, changes: ProductInput) {
    const validatedData = productSchema.parse(changes)
    await this.findOne(id)
    const updatedProduct = await this.prisma.product.update({
      where: {
        id: id
      },
      data: validatedData
    })

    return updatedProduct
  }

  async delete(id: number) {
    await this.findOne(id)
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id
      }
    })

    return deletedProduct
  }
}
