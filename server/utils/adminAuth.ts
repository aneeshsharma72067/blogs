import type { H3Event } from 'h3'

import { verifyAdminSessionToken } from './adminSession'

export const requireAdminSession = (event: H3Event) => {
  const config = useRuntimeConfig(event)
  const token = getCookie(event, 'admin_session')
  const session = verifyAdminSessionToken(token, config.adminSessionSecret)

  if (!session.valid) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return session
}