import { User, PrismaClient } from '@prisma/client'
import prismaService from '../services/prisma.service'
import { UserInput, userSchema } from '../schemas/user.schema'
import { ApiError } from '../utils/apiError.handle'

export class UserService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prismaService.getInstance()
  }

  async find(): Promise<User[]> {
    const user = await this.prisma.user.findMany({
      include: {
        addresses: true
      }
    })
    if (!user) {
      throw new ApiError(500, 'Error fetching users')
    }

    return user
  }

  async findOne(id: number): Promise<User | null> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        addresses: true
      }
    })

    if (!existingUser) {
      throw new ApiError(404, 'User not found')
    }

    return existingUser
  }

  async create(data: UserInput) {
    const validatedData = userSchema.parse(data)
    const newUser = await this.prisma.user.create({
      data: validatedData
    })

    return newUser
  }

  async update(id: number, changes: UserInput) {
    const validatedData = userSchema.parse(changes)
    await this.findOne(id)
    const updatedUser = await this.prisma.user.update({
      where: {
        id
      },
      data: validatedData
    })

    return updatedUser
  }

  async delete(id: number) {
    await this.findOne(id)
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: id
      }
    })

    return deletedUser
  }
}
