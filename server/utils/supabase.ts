import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createError, getCookie, type H3Event } from 'h3'

import type { Database } from '../../types/supabase'

const ACCESS_COOKIE = 'sb-access-token'
const REFRESH_COOKIE = 'sb-refresh-token'

const requireSupabaseConfig = (event: H3Event) => {
  const config = useRuntimeConfig(event)

  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase environment variables are not configured.' })
  }

  return {
    supabaseUrl: config.public.supabaseUrl,
    supabaseAnonKey: config.public.supabaseAnonKey,
    supabaseServiceKey: config.supabaseServiceKey,
  }
}

export const getServiceSupabaseClient = (event: H3Event): SupabaseClient<Database> => {
  const config = requireSupabaseConfig(event)

  return createClient<Database>(config.supabaseUrl, config.supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export const getAnonSupabaseClient = (event: H3Event): SupabaseClient<Database> => {
  const config = requireSupabaseConfig(event)

  return createClient<Database>(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export const getUserSupabaseClient = (event: H3Event, accessToken: string): SupabaseClient<Database> => {
  const config = requireSupabaseConfig(event)

  return createClient<Database>(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })
}

export const getAuthCookies = (event: H3Event) => ({
  accessToken: getCookie(event, ACCESS_COOKIE),
  refreshToken: getCookie(event, REFRESH_COOKIE),
})

export const setAuthCookies = (
  event: H3Event,
  input: {
    accessToken: string
    refreshToken: string
    expiresInSeconds: number
  },
) => {
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: input.expiresInSeconds,
  }

  setCookie(event, ACCESS_COOKIE, input.accessToken, cookieOptions)
  setCookie(event, REFRESH_COOKIE, input.refreshToken, cookieOptions)
}

export const clearAuthCookies = (event: H3Event) => {
  deleteCookie(event, ACCESS_COOKIE, { path: '/' })
  deleteCookie(event, REFRESH_COOKIE, { path: '/' })
}

export const requireAuthenticatedUser = async (event: H3Event) => {
  const { accessToken } = getAuthCookies(event)

  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const supabase = getAnonSupabaseClient(event)
  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !data.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return data.user
}
