import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service'
import { ApiError } from '../utils/apiError.handle'

const authService = new AuthService()

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated()) {
    throw new ApiError(401, 'Not authenticated')
  }

  const userId = (req.user as any).id

  try {
    const isValid = await authService.isTokenValid(userId)

    if (!isValid) {
      try {
        await authService.refreshAccessToken(userId)
      } catch (error) {
        req.logout((err) => {
          if (err) {
            console.error('Error al cerrar sesión:', err)
          }
          throw new ApiError(401, 'Session expired, please login again')
        })
        return
      }
    }

    next()
  } catch (error) {
    console.error('Error al validar el token:', error)
    next(error)
  }
}
