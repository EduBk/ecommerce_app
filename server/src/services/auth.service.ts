import { PrismaClient } from '@prisma/client'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import axios from 'axios'

import prismaService from './prisma.service'
import { config } from '../config/env'
import { ApiError } from '../utils/apiError.handle'
import { configSession } from '../config/session'
import { encrypt, encryptToken, decryptToken } from '../utils/bcrypt.handle'
import { UserInput } from '../schemas/user.schema'

interface GoogleProfile {
  id: string
  emails?: { value: string; verified: boolean }[]
  displayName: string
}

const { SECRET_KEY } = config

export class AuthService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prismaService.getInstance()
    this.initializeGoogleStrategy()
  }

  initializeGoogleStrategy() {
    passport.use(
      new GoogleStrategy(
        configSession,
        async (
          accessToken: string,
          refreshToken: string,
          profile: GoogleProfile,
          done: (error: any, user?: any) => void
        ) => {
          try {
            const user = await this.findOrCreateUser(profile)
            // Calculamos la expiración del accessToken (1 hora en este caso)
            const expiresAt = new Date()
            expiresAt.setSeconds(expiresAt.getSeconds() + 3600) // El tiempo de expiración depende de la API de Google

            await this.saveTokens(user.id, accessToken, refreshToken, expiresAt)
            done(null, user)
          } catch (error) {
            done(error, null)
          }
        }
      )
    )

    passport.serializeUser((user, done: (error: any, user?: any) => void) => {
      done(null, user)
    })

    passport.deserializeUser(async (userObject: any, done) => {
      try {
        // Access user information from the deserialized object
        const userId = userObject.id
        const user = await this.prisma.user.findUnique({
          where: { id: userId }
        })
        done(null, user)
      } catch (error) {
        done(error, null)
      }
    })
  }

  async findOrCreateUser(profile: GoogleProfile) {
    let user = await this.prisma.user.findUnique({
      where: {
        googleId: profile.id
      }
    })

    if (!user) {
      const passEncrypt = await encrypt(profile.displayName)
      user = await this.prisma.user.create({
        data: {
          googleId: profile.id,
          email: profile.emails?.[0].value || '',
          password: passEncrypt || '',
          name: profile.displayName
        }
      })
    }

    return user
  }

  async saveTokens(
    userId: number,
    accessToken: string,
    refreshToken: string,
    expiresAt: Date
  ) {
    const encryptedAccessToken = encryptToken(accessToken)
    const encryptedRefreshToken = encryptToken(refreshToken)

    await this.prisma.session.upsert({
      where: { userId },
      update: {
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt
      },
      create: {
        userId,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt
      }
    })
  }

  // Método para verificar si el token ha expirado
  async isTokenValid(userId: number) {
    const session = await this.prisma.session.findUnique({
      where: { userId }
    })

    if (!session) return false

    const currentDate = new Date()
    if (currentDate > session.expiresAt) {
      return false // Token ha expirado
    }

    return true // Token es válido
  }

  // Método para refrescar el accessToken
  async refreshAccessToken(userId: number) {
    const session = await this.prisma.session.findUnique({
      where: { userId }
    })

    if (!session) throw new ApiError(404, 'Not session found')

    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: session.refreshToken,
        grant_type: 'refresh_token'
      })

      const newAccessToken = response.data.access_token

      // Calculamos nueva expiración
      const expiresAt = new Date()
      expiresAt.setSeconds(expiresAt.getSeconds() + response.data.expires_in)

      // Actualiza el token y la expiración
      await this.prisma.session.update({
        where: { userId },
        data: {
          accessToken: newAccessToken,
          expiresAt
        }
      })

      return newAccessToken
    } catch (error) {
      throw new ApiError(400, 'Failed to refresh token')
    }
  }
}
