import { ZodError } from 'zod'
import { ApiError } from './apiError.handle'

export class ValidationError extends ApiError {
  errors: { [key: string]: string }

  constructor(zodError: ZodError) {
    super(400, 'Validation Error', true)
    this.errors = {}
    zodError.errors.forEach((err) => {
      if (err.path) {
        this.errors[err.path.join('.')] = err.message
      }
    })
  }
}
