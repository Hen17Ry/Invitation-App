export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.client) return

  const auth = useAuth()
  auth.charger()

  if (!auth.isLoggedIn.value) {
    return navigateTo('/login')
  }

  // Vérifie que le token est encore valide
  const valide = await auth.verifierToken()
  if (!valide) {
    return navigateTo('/login')
  }
})