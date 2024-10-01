//! Importa variables de ENTORNO
import 'dotenv/config'

//! Importa la APP definida en app.ts
import app from './app'
import prismaService from './services/prisma.service'

const PORT = process.env.PORT || 3001

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
//! Se inicia el servidor y queda en escucha
startServer().catch(console.error)
