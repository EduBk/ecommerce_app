import { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import prismaService from '../services/prisma.service'
import { UserInput, userSchema } from '../schemas/user.schema'
import { ApiError } from '../utils/apiError.handle'

export class UserService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prismaService.getInstance()
  }

  async find(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        addresses: true
      }
    })
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        addresses: true
      }
    })
  }

  async create(data: UserInput) {
    const validatedData = userSchema.parse(data)
    const existingUser = await this.prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      throw new ApiError(400, 'Email already in use')
    }

    const newUser = await this.prisma.user.create({
      data: validatedData
    })

    return newUser
  }

  async update(id: number, changes: UserInput) {
    const validatedData = userSchema.parse(changes)
    const updateUser = await this.prisma.user.update({
      where: {
        id: id
      },
      data: validatedData
    })

    return updateUser
  }

  async delete(id: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: id
      }
    })

    return deleteUser
  }
}
