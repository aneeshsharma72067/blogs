import { getAnonSupabaseClient, getAuthCookies } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const { accessToken } = getAuthCookies(event)

  if (!accessToken) {
    return { authenticated: false }
  }

  const supabase = getAnonSupabaseClient(event)
  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !data.user) {
    return { authenticated: false }
  }

  return {
    authenticated: true,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  }
})
