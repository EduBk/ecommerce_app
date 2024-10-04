import { Request, Response, NextFunction } from 'express'
import { AddressService } from '../services/address.service'

export class AddressController {
  private addressService: AddressService

  constructor() {
    this.addressService = new AddressService()
  }

  // GET all address
  async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const addresses = await this.addressService.find()
      res.json(addresses)
    } catch (error) {
      next(error)
    }
  }

  // GET a address by ID
  async getAddress(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const address = await this.addressService.findOne(Number(id))
      res.json(address)
    } catch (error) {
      next(error)
    }
  }

  // POST to create a new address
  async createAddress(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    try {
      const newAddress = await this.addressService.create(body)
      res.json(newAddress)
    } catch (error) {
      next(error)
    }
  }

  // PATCH to update a address by ID
  async updateAddress(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const changes = req.body
    try {
      const updatedAddress = await this.addressService.update(
        Number(id),
        changes
      )
      res.json(updatedAddress)
    } catch (error) {
      next(error)
    }
  }

  // DELETE a address by ID
  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedAddress = await this.addressService.delete(Number(id))
      res.json(deletedAddress)
    } catch (error) {
      next(error)
    }
  }
}
