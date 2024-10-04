import { Address } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import prismaService from '../services/prisma.service'
import { AddressInput, addressSchema } from '../schemas/address.schema'
import { ApiError } from '../utils/apiError.handle'

export class AddressService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prismaService.getInstance()
  }

  async find(): Promise<Address[]> {
    const addresses = await this.prisma.address.findMany()
    if (!addresses) {
      throw new ApiError(500, 'Error fetching addresses')
    }

    return addresses
  }

  async findOne(id: number): Promise<Address | null> {
    const existingAddress = await this.prisma.address.findUnique({
      where: {
        id
      }
    })

    if (!existingAddress) {
      throw new ApiError(404, 'Address not found')
    }

    return existingAddress
  }

  async create(data: AddressInput) {
    const validatedData = addressSchema.parse(data)
    const newAddress = await this.prisma.address.create({
      data: validatedData
    })

    return newAddress
  }

  async update(id: number, changes: AddressInput) {
    const validatedData = addressSchema.parse(changes)
    await this.findOne(id)
    const updatedAddress = await this.prisma.address.update({
      where: {
        id: id
      },
      data: validatedData
    })

    return updatedAddress
  }

  async delete(id: number) {
    await this.findOne(id)
    const deletedAddress = await this.prisma.address.delete({
      where: {
        id
      }
    })

    return deletedAddress
  }
}
