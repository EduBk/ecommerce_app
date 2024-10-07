import { Request, Response, NextFunction } from 'express'
import { ProductsService } from '../services/product.service'

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
      next(error)
    }
  }

  // GET a product by ID
  async getProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const product = await this.productsService.findOne(Number(id))
      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  // POST to create a new product
  async createProduct(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    try {
      const newProduct = await this.productsService.create(body)
      res.json(newProduct)
    } catch (error) {
      next(error)
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
      res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }

  // DELETE a product by ID
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedProduct = await this.productsService.delete(Number(id))
      res.json(deletedProduct)
    } catch (error) {
      next(error)
    }
  }
}
