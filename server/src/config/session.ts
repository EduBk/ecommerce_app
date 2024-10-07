import { config } from './env'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = config
export const configSession = {
  clientID: GOOGLE_CLIENT_ID as string,
  clientSecret: GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/auth/google/callback'
}
