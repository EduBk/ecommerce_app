import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/user.service'
import { ApiError } from '../utils/apiError.handle'

export class UsersController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  // GET all users
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.find()
      res.json(users)
    } catch (error) {
      next(new ApiError(500, 'Error fetching users.'))
    }
  }

  // GET a user by ID
  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const user = await this.userService.findOne(Number(id))
      if (!user) {
        throw new ApiError(404, 'User not found.')
      } else {
        res.json(user)
      }
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error fetching user')
      )
    }
  }

  // POST to create a new user
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    try {
      const newUser = await this.userService.create(body)
      res.json(newUser)
    } catch (error) {
      next(error);
    }
  }

  // PATCH to update a user by ID
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const changes = req.body
    try {
      const updatedUser = await this.userService.update(Number(id), changes)
      if (!updatedUser) {
        throw new ApiError(404, 'User not found')
      }
      res.json(updatedUser)
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error updating user')
      )
    }
  }

  // DELETE a user by ID
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedUser = await this.userService.delete(Number(id))
      if (!deletedUser) {
        throw new ApiError(404, 'User not found')
      }
      res.json(deletedUser)
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error deleting user')
      )
    }
  }
}
