import { Router } from 'express'
import { AddressController } from '../controllers/address.controller'
const router = Router()
const addressController = new AddressController()

router.get('/', (req, res, next) =>  addressController.getAddresses(req, res, next))
router.get("/:id", (req, res, next) => addressController.getAddress(req, res, next));
router.post("/", (req, res, next) => addressController.createAddress(req, res, next));
router.patch("/:id", (req, res, next) => addressController.updateAddress(req, res, next));
router.delete("/:id", (req, res, next) => addressController.deleteAddress(req, res, next));

export { router }
