import { Request, Response, NextFunction } from 'express'
import { ApiError } from './apiError.handle'
import { config } from '../config/env'
import { ZodError } from 'zod'
import { ValidationError } from './validationError.handle'

const { IS_PROD } = config

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err
  if (error instanceof ZodError) {
    error = new ValidationError(error)
  } else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Internal Server Error'
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler = (
  err: ApiError | ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err
  if (IS_PROD && !err.isOperational) {
    statusCode = 500
    message = 'Internal Server Error'
  }

  res.locals.errorMessage = err.message

  const response: any = {
    code: statusCode,
    message,
    ...(err instanceof ValidationError && { errors: err.errors }),
    ...(!IS_PROD && { stack: err.stack })
  }

  if (IS_PROD) {
    console.error(err)
  }

  res.status(statusCode).send(response)
}
