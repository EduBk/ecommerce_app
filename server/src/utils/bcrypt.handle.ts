import { hash, compare } from 'bcryptjs'
import * as crypto from 'crypto'
import { config } from '../config/env'

const { SECRET_KEY } = config
const algorithm = 'aes-256-cbc'
const key = crypto.scryptSync(SECRET_KEY!, 'salt', 32)

const encrypt = async (pass: string) => {
  const passwordHash = await hash(pass, 10)
  return passwordHash
}

const verify = async (pass: string, passHash: string) => {
  const isCorrect = await compare(pass, passHash)
  return isCorrect
}

const encryptToken = (text: string) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

const decryptToken = (text: string): string => {
  const [ivHex, encryptedText] = text.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export { encrypt, verify, encryptToken, decryptToken }
