import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'
const router = Router()
const categoryController = new CategoryController()

router.get('/', (req, res, next) =>  categoryController.getCategories(req, res, next))
router.get("/:id", (req, res, next) => categoryController.getCategory(req, res, next));
router.post("/", (req, res, next) => categoryController.createCategory(req, res, next));
router.patch("/:id", (req, res, next) => categoryController.updateCategory(req, res, next));
router.delete("/:id", (req, res, next) => categoryController.deleteCategory(req, res, next));

export { router }
