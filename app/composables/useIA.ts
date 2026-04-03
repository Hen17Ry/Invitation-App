export const useIA = () => {

  const loading = ref(false)
  const error = ref('')

  async function genererBrief(data: {
    type: string
    titre: string
    date_evenement: string
    lieu: string
    nombre_invites: number
    description: string
    theme: string
    couleurs: string[]
    langue: string
  }) {
    loading.value = true
    error.value = ''

    try {
      const result = await $fetch('/api/brief/generate', {
        method: 'POST',
        body: data,
      })
      return result
    } catch (err) {
      error.value = 'Erreur lors de la génération. Réessayez.'
      return null
    } finally {
      loading.value = false
    }
  }

  async function genererImage(promptImage: string, type: string) {
    loading.value = true
    error.value = ''

    try {
      const result = await $fetch('/api/image/generate', {
        method: 'POST',
        body: { prompt: promptImage, type },
      })
      return result
    } catch (err) {
      error.value = 'Erreur lors de la génération de l\'image.'
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, genererBrief, genererImage }
}