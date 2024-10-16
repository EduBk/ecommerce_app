import { ApiError } from './apiError.handle'

export const validateEnv = () => {
  const missed = []
  const required = [
    'PORT',
    'CROSS_SITE',
    'NODE_ENVIROMENT',
    'LOCAL_URL',
    'DATABASE_URL',
    'SECRET_KEY',
    'SESSION_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ]
  for (const key of required) {
    if (!process.env[key]) {
      missed.push(key)
    }
  }

  if(missed.length > 0){
    throw new ApiError(500, `Missing required environment variable: ${missed}`)
  }
}
