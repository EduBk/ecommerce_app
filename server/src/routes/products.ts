import { Request, Response, Router } from 'express'
import { ProductsController } from '../controllers/products.controller'
const router = Router()
const productsController = new ProductsController()

router.get('/', (req, res) =>  productsController.getProducts(req, res))
router.get("/:id", (req, res) => productsController.getProduct(req, res));
router.post("/", (req, res) => productsController.createProduct(req, res));
// router.patch("/:id", ProductsController);
// router.delete("/:id", ProductsController);

export { router }
