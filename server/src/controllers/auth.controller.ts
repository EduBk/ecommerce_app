import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

export class AuthController {
  login(req: Request, res: Response, next: NextFunction) {
    res.send('Iniciar sesión con Google')
  }

  googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', { scope: ['profile', 'email'] })(
      req,
      res,
      next
    )
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
          res.redirect('/profile')
        })
      }
    )(req, res, next)
  }

  profile(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      res.send(`Bienvenido`)
    } else {
      res.redirect('/login')
    }
  }
}
