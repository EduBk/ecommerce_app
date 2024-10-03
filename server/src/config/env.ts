import 'dotenv/config'

export const config = {
  isProd: process.env.NODE_ENVIROMENT === 'prod',
  port: process.env.PORT || 3001,
  dbUrl: process.env.DATABASE_URL,
  url: process.env.BASE_URL || 'http://localhost:8080',
  crossCookie: process.env.NODE_SAMESITE || 'none',
  keySecret: process.env.SESSION_SECRET || 'undefined'
}