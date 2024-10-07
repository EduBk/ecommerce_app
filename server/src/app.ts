import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'
import morgan from 'morgan'

import { router } from './routes'
import { corsOptions } from './utils/cors.handle'
import { errorConverter, errorHandler } from './utils/error.handle'
import { ApiError } from './utils/apiError.handle'

const app = express()

app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', router)

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Middleware for routes missing (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Route not found.'))
})
app.use(errorConverter)
app.use(errorHandler)

export default app
