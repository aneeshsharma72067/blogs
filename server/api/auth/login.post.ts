import { z } from 'zod'

import { getAnonSupabaseClient, setAuthCookies } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required.'),
  })
  const parsedBody = schema.safeParse(await readBody(event))

  if (!parsedBody.success) {
    throw createError({ statusCode: 400, statusMessage: parsedBody.error.issues[0]?.message ?? 'Invalid login payload.' })
  }

  const supabase = getAnonSupabaseClient(event)
  const { data, error } = await supabase.auth.signInWithPassword(parsedBody.data)

  if (error || !data.session || !data.user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  setAuthCookies(event, {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresInSeconds: data.session.expires_in,
  })

  return {
    ok: true,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  }
})
