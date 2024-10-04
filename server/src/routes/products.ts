import { Router } from 'express'
import { ProductsController } from '../controllers/products.controller'
const router = Router()
const productsController = new ProductsController()

router.get('/', (req, res, next) =>  productsController.getProducts(req, res, next))
router.get("/:id", (req, res, next) => productsController.getProduct(req, res, next));
router.post("/", (req, res, next) => productsController.createProduct(req, res, next));
router.patch("/:id", (req, res, next) => productsController.updateProduct(req, res, next));
router.delete("/:id", (req, res, next) => productsController.deleteProduct(req, res, next));

export { router }
