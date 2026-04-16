import { computed } from 'vue'

interface AuthUser {
  id: string
  email: string | null
}

interface AuthSessionResponse {
  authenticated: boolean
  user?: AuthUser
}

interface LoginPayload {
  email: string
  password: string
}

export const useAuth = () => {
  const session = useState<AuthSessionResponse>('auth-session', () => ({ authenticated: false }))
  const loading = useState<boolean>('auth-session-loading', () => false)

  const refreshSession = async () => {
    loading.value = true
    try {
      const headers = process.server ? useRequestHeaders(['cookie']) : undefined
      const nextSession = await $fetch<AuthSessionResponse>('/api/auth/session', { headers })
      session.value = nextSession
      return nextSession
    } finally {
      loading.value = false
    }
  }

  const login = async (payload: LoginPayload) => {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload,
    })

    await refreshSession()
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    session.value = { authenticated: false }
  }

  const isAuthenticated = computed(() => session.value.authenticated)
  const user = computed(() => session.value.user ?? null)

  return {
    session,
    loading,
    isAuthenticated,
    user,
    refreshSession,
    login,
    logout,
  }
}
