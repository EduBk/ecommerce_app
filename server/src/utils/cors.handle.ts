import 'dotenv/config'
import { CorsOptions } from 'cors'

import { config } from '../config/env'
import { ApiError } from './apiError.handle'

const { LOCAL_URL } = config
const whiteList = [LOCAL_URL, 'http://localhost:3000', 'http://localhost:4000']

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new ApiError(403, 'Not allowed by cors'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
  exposedHeaders: ['set-cookie']
}

export { corsOptions }
