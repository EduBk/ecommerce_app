import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
const router = Router()
const usersController = new UsersController()

router.get('/', (req, res, next) =>  usersController.getUsers(req, res, next))
router.get("/:id", (req, res, next) => usersController.getUser(req, res, next));
router.post("/", (req, res, next) => usersController.createUser(req, res, next));
router.patch("/:id", (req, res, next) => usersController.updateUser(req, res, next));
router.delete("/:id", (req, res, next) => usersController.deleteUser(req, res, next));

export { router }
