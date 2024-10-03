import { Request, Response, NextFunction } from 'express'
import { CategoryService } from '../services/category.service'
import { CreateCategoryDto } from '../dtos/types'
import { ApiError } from '../utils/apiError.handle'

export class CategoryController {
  private categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }

  // GET all categories
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryService.find()
      res.json(categories)
    } catch (error) {
      next(new ApiError(500, 'Error fetching categories.'))
    }
  }

  // GET a category by ID
  async getCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const category = await this.categoryService.findOne(Number(id))
      if (!category) {
        throw new ApiError(404, 'Category not found.')
      } else {
        res.json(category)
      }
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error fetching category')
      )
    }
  }

  // POST to create a new category
  async createCategory(req: Request, res: Response, next: NextFunction) {
    const data: CreateCategoryDto = req.body
    try {
      const newCategory = await this.categoryService.create(data)
      res.json(newCategory)
    } catch (error) {
      next(new ApiError(500, 'Error creating category'))
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
      if (!updatedCategory) {
        throw new ApiError(404, 'Category not found')
      }
      res.json(updatedCategory)
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error updating category')
      )
    }
  }

  // DELETE a category by ID
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedCategory = await this.categoryService.delete(Number(id))
      if (!deletedCategory) {
        throw new ApiError(404, 'Category not found')
      }
      res.json(deletedCategory)
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error deleting category')
      )
    }
  }
}
