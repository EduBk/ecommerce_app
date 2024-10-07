import 'dotenv/config'

import app from './app'
import prismaService from './services/prisma.service'
import { config } from './config/env'

const { PORT } = config

async function startServer() {
  await prismaService.connect()

  // El resto de tu configuración de Express aquí

  app.listen(PORT, () => {
    console.log(`App on Port: ${PORT}`)
  })
}

// Manejar el cierre de la conexión cuando la aplicación se detenga
process.on('SIGINT', async () => {
  await prismaService.disconnect()
  process.exit()
})

startServer().catch(console.error)
