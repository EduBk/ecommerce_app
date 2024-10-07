import { Request, Response, NextFunction } from 'express'
import { CategoryService } from '../services/category.service'

export class CategoryController {
  private categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }

  // GET all category
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryService.find()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }

  // GET a category by ID
  async getCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const category = await this.categoryService.findOne(Number(id))
      res.json(category)
    } catch (error) {
      next(error)
    }
  }

  // POST to create a new category
  async createCategory(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    try {
      const newCategory = await this.categoryService.create(body)
      res.json(newCategory)
    } catch (error) {
      next(error)
    }
  }

  // PATCH to update a category by ID
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const changes = req.body
    try {
      const updatedCategory = await this.categoryService.update(
        Number(id),
        changes
      )
      res.json(updatedCategory)
    } catch (error) {
      next(error)
    }
  }

  // DELETE a category by ID
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedCategory = await this.categoryService.delete(Number(id))
      res.json(deletedCategory)
    } catch (error) {
      next(error)
    }
  }
}
