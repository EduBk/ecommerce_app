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

  // async update(id, changes) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw boom.notFound('product not found');
  //   }
  //   const product = this.products[index];
  //   this.products[index] = {
  //     ...product,
  //     ...changes,
  //   };
  //   return this.products[index];
  // }

  // async delete(id) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw boom.notFound('product not found');
  //   }
  //   this.products.splice(index, 1);
  //   return { id };
  // }
}
