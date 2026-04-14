import { verifyAdminSessionToken } from '../../utils/adminSession'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const token = getCookie(event, 'admin_session')
  const session = verifyAdminSessionToken(token, config.adminSessionSecret)

  if (!session.valid) {
    return { authenticated: false }
  }

  return { authenticated: true, username: session.username }
})