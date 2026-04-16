export default defineNuxtRouteMiddleware(async () => {
  if (!process.server) return

  const headers = useRequestHeaders(['cookie'])

  try {
    const session = await $fetch<{ authenticated: boolean }>('/api/auth/session', {
      headers,
    })

    if (!session.authenticated) {
      return navigateTo('/admin')
    }
  } catch {
    return navigateTo('/admin')
  }
})