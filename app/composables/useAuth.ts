export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const isLoggedIn = computed(() => !!user.value)

  const displayName = computed(() => {
    if (!user.value) return ''
    return user.value.user_metadata?.full_name
      || user.value.email
      || 'Utilisateur'
  })

  const avatar = computed((): string | null =>
    user.value?.user_metadata?.avatar_url ?? null
  )

  async function logout() {
    await supabase.auth.signOut()
    await navigateTo('/login')
  }

  return { user, isLoggedIn, displayName, avatar, logout }
}