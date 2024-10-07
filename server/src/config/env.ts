import 'dotenv/config'

export const config = {
  PORT: process.env.PORT,
  IS_PROD: process.env.NODE_ENVIROMENT === 'prod',
  SECRET_KEY: process.env.SECRET_KEY,
  LOCAL_URL: process.env.LOCAL_URL,
  CROSS_SITE: process.env.CROSS_SITE || 'none',
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}
