import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
const router = Router()
const authController = new AuthController()

router.get('/', (req, res, next) => authController.login(req, res, next))
router.get('/google', (req, res, next) =>
  authController.googleAuth(req, res, next)
)
router.get('/google/callback', (req, res, next) =>
  authController.googleAuthCallback(req, res, next)
)
router.get('/profile', authMiddleware, (req, res, next) =>
  authController.profile(req, res, next)
)
router.post('/logout', authMiddleware, (req, res) =>
  authController.logout(req, res)
)

export { router }
