import { PrismaClient } from '@prisma/client'

class PrismaService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async connect(retries = 5, delay = 5000) {
    for (let i = 0; i < retries; i++) {
      try {
        await this.prisma.$connect()
        console.log('Successfully connected to the database')
        return
      } catch (error) {
        console.error(
          `Failed to connect to the database. Retrying in ${
            delay / 1000
          } seconds...`
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
    console.error('Failed to connect to the database after multiple retries')
    process.exit(1)
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect()
      console.log('Successfully disconnected from the database')
    } catch (error) {
      console.error('Failed to disconnect from the database:', error)
      process.exit(1)
    }
  }

  getInstance(): PrismaClient {
    return this.prisma
  }
}

const prismaService = new PrismaService()
export default prismaService
