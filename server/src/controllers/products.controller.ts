import { Request, Response, NextFunction } from 'express'
import { ProductsService } from '../services/product.service'
import { CreateProductDto } from '../dtos/types'
import { ApiError } from '../utils/apiError.handle'

export class ProductsController {
  private productsService: ProductsService

  constructor() {
    this.productsService = new ProductsService()
  }

  // GET all products
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productsService.find()
      res.json(products)
    } catch (error) {
      next(new ApiError(500, 'Error fetching products.'))
    }
  }

  // GET a product by ID
  async getProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const product = await this.productsService.findOne(Number(id))
      if (!product) {
        throw new ApiError(404, 'Product not found.')
      } else {
        res.json(product)
      }
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error fetching product')
      )
    }
  }

  // POST to create a new product
  async createProduct(req: Request, res: Response, next: NextFunction) {
    const data: CreateProductDto = req.body
    try {
      const newProduct = await this.productsService.create(data)
      res.json(newProduct)
    } catch (error) {
      next(new ApiError(500, 'Error creating product'))
    }
  }

  // PATCH to update a product by ID
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const changes = req.body
    try {
      const updatedProduct = await this.productsService.update(
        Number(id),
        changes
      )
      if (!updatedProduct) {
        throw new ApiError(404, 'Product not found')
      }
      res.json(updatedProduct)
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error updating product')
      )
    }
  }

  // DELETE a product by ID
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedProduct = await this.productsService.delete(Number(id))
      if (!deletedProduct) {
        throw new ApiError(404, 'Product not found')
      }
      res.json(deletedProduct)
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(500, 'Error deleting product')
      )
    }
  }
}
