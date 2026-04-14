import { createAdminSessionToken } from '../../utils/adminSession'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username?: string; password?: string }>(event)
  const config = useRuntimeConfig(event)

  const validUsername = body?.username === 'admin'
  const validPassword = body?.password === 'root'

  if (!validUsername || !validPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = createAdminSessionToken(config.adminUsername, config.adminSessionSecret)

  setCookie(event, 'admin_session', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return { ok: true }
})