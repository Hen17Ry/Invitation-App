export interface Utilisateur {
  id: string
  email: string
  nom_complet: string
  avatar_url: string | null
  provider: string
}

export const useAuth = () => {
  const utilisateur = useState<Utilisateur | null>('utilisateur', () => null)
  const token = useState<string | null>('token', () => null)

  const isLoggedIn = computed(() => !!utilisateur.value)
  const displayName = computed(() => utilisateur.value?.nom_complet || utilisateur.value?.email || '')
  const avatar = computed(() => utilisateur.value?.avatar_url || null)

  function sauvegarder(user: Utilisateur, jwt: string) {
    utilisateur.value = user
    token.value = jwt
    if (import.meta.client) {
      localStorage.setItem('avis_token', jwt)
      localStorage.setItem('avis_user', JSON.stringify(user))
    }
  }

  function charger() {
    if (!import.meta.client) return
    const t = localStorage.getItem('avis_token')
    const u = localStorage.getItem('avis_user')
    if (t && u) {
      token.value = t
      utilisateur.value = JSON.parse(u)
    }
  }

  async function verifierToken() {
    if (!token.value) return false
    try {
      const data = await $fetch<{ user: Utilisateur }>('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      utilisateur.value = data.user
      return true
    } catch {
      deconnecter()
      return false
    }
  }

  function deconnecter() {
    utilisateur.value = null
    token.value = null
    if (import.meta.client) {
      localStorage.removeItem('avis_token')
      localStorage.removeItem('avis_user')
    }
    navigateTo('/login')
  }

  // Suggestion de mot de passe fort
  function suggererMotDePasse(): string {
    const mots = ['Soleil', 'Lune', 'Etoile', 'Fleuve', 'Sahel', 'Baobab', 'Savane']
    const mot = mots[Math.floor(Math.random() * mots.length)]
    const num = Math.floor(Math.random() * 900) + 100
    const special = ['!', '@', '#', '$', '&'][Math.floor(Math.random() * 5)]
    return `${mot}${num}${special}`
  }

  return {
    utilisateur,
    token,
    isLoggedIn,
    displayName,
    avatar,
    sauvegarder,
    charger,
    verifierToken,
    deconnecter,
    logout: deconnecter,
    suggererMotDePasse,
  }
}