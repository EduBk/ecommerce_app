import { config } from './env'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, LOCAL_URL } = config
export const configSession = {
  clientID: GOOGLE_CLIENT_ID as string,
  clientSecret: GOOGLE_CLIENT_SECRET as string,
  callbackURL: `${LOCAL_URL}/api/v1/auth/google/callback`,
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile'],
  accessType: 'offline',
  prompt: 'consent'
}
