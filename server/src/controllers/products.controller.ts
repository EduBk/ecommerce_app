import { Request, Response } from 'express'
import { ProductsService } from '../services/product.service'
import { CreateProductDto } from '../dtos/types'

export class ProductsController {
  private productsService: ProductsService

  constructor() {
    this.productsService = new ProductsService()
  }

  // GET all products
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productsService.find()
      res.json(products)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error })
    }
  }

  // GET a product by ID
  async getProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const product = await this.productsService.findOne(Number(id))
      if (!product) {
        res.status(404).json({ message: 'Product not found' })
      }
      res.json(product)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error })
    }
  }

  //   // POST to create a new product
  async createProduct(req: Request, res: Response): Promise<void> {
    const data: CreateProductDto = req.body
    try {
      const newProduct = await this.productsService.create(data)
      res.json(newProduct)
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error })
    }
  }

  //   // PATCH to update a product by ID
  //   async updateTask(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params
  //     const changes = req.body
  //     try {
  //       const updatedProduct = await this.productsService.update(id, changes)
  //       res.json(updatedProduct)
  //     } catch (error) {
  //       res.status(500).json({ message: 'Error updating product', error })
  //     }
  //   }

  //   // DELETE a product by ID
  //   async deleteTask(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params
  //     try {
  //       const deletedProduct = await this.productsService.delete(id)
  //       res.json(deletedProduct)
  //     } catch (error) {
  //       res.status(500).json({ message: 'Error deleting product', error })
  //     }
  //   }
}
