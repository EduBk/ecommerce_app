import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { AuthService } from '../services/auth.service'

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }
  login(req: Request, res: Response, next: NextFunction) {
    res.send('<a hrfe="/auth/google">Iniciar sesión con Google</a>')
  }

   googleAuth(req: Request, res: Response, next: NextFunction) {
     passport.authenticate('google', {
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      accessType: 'offline',
      prompt: 'consent'
    })(req, res, next)
  }

   googleAuthCallback(req: Request, res: Response, next: NextFunction) {
     passport.authenticate(
      'google',
      { failureRedirect: '/login' },
      (err, user) => {
        if (err) return next(err)
        if (!user) return res.redirect('/login')
        req.login(user, (error) => {
          if (error) return next(error)
          res.redirect('/api/v1/auth/profile')
        })
      }
    )(req, res, next)
  }

  profile(req: Request, res: Response, next: NextFunction) {
    res.send(`Bienvenido`)
  }

   logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err)
        return res.status(500).json({ message: 'Error al cerrar sesión' })
      }
      res.json({ message: 'Sesión cerrada con éxito' })
    })
  }
}
