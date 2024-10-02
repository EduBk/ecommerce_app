import { Request, Response, NextFunction } from 'express'
import { ApiError } from './apiError.handle'
import { config } from '../config/env'

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Internal Server Error'
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err
  if (config.isProd && !err.isOperational) {
    statusCode = 500
    message = 'Internal Server Error'
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(!config.isProd && { stack: err.stack })
  }

  if (config.isProd) {
    console.error(err)
  }

  res.status(statusCode).send(response)
}
