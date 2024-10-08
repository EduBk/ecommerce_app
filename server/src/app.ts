import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { router } from './routes'
import { corsOptions } from './utils/cors.handle'
import { errorConverter, errorHandler } from './utils/error.handle'
import { ApiError } from './utils/apiError.handle'
import { config } from './config/env'

const app = express()
const { SECRET_KEY, IS_PROD } = config

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY must be set in environment variables')
}

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(SECRET_KEY))

// Session configuration
const sessionConfig: session.SessionOptions = {
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: IS_PROD,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  name: 'myapp.sid'
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionConfig.cookie!.secure = true // serve secure cookies
}

app.use(session(sessionConfig))

// Apply CORS after session middleware
app.use(cors({
  ...corsOptions,
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())

// Debug middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log('Request headers:', req.headers)
//   console.log('Request cookies:', req.cookies)
//   console.log('Session:', req.session)
//   next()
// })

app.use('/api/v1', router)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Route not found.'))
})

app.use(errorConverter)
app.use(errorHandler)

export default app