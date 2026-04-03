import { defineStore } from 'pinia'
import type { EventType } from '~/types'

export interface CreationState {
  etape: number
  type: EventType | null
  titre: string
  date_evenement: string
  lieu: string
  nombre_invites: number
  description: string
  theme: string
  couleurs: string[]
  langue: string
  brief_genere: string
  image_url: string
  modifications_count: number
  evenement_id: string | null
  prix_base: number
  prix_final: number
}

export const useCreationStore = defineStore('creation', () => {

  const state = ref<CreationState>({
    etape: 1,
    type: null,
    titre: '',
    date_evenement: '',
    lieu: '',
    nombre_invites: 50,
    description: '',
    theme: '',
    couleurs: [],
    langue: 'fr',
    brief_genere: '',
    image_url: '',
    modifications_count: 0,
    evenement_id: null,
    prix_base: 0,
    prix_final: 0,
  })

  // Prix calculé en temps réel
  const prixEstime = computed(() => {
    if (!state.value.type) return 0
    let base = 1500

    // Selon le type
    const prixType: Record<string, number> = {
      mariage: 3000,
      deces: 1500,
      naissance: 2000,
      bapteme: 2000,
      anniversaire: 2000,
      ceremonie: 2500,
    }
    base = prixType[state.value.type] || 1500

    // Selon le nombre d'invités
    const n = state.value.nombre_invites
    if (n > 500) base += 2000
    else if (n > 200) base += 1000
    else if (n > 100) base += 500

    // Majoration modifications
    const modsSup = Math.max(0, state.value.modifications_count - 3)
    base += modsSup * 500

    return base
  })

  function etapeSuivante() {
    if (state.value.etape < 5) state.value.etape++
  }

  function etapePrecedente() {
    if (state.value.etape > 1) state.value.etape--
  }

  function allerEtape(n: number) {
    state.value.etape = n
  }

  function reset() {
    state.value = {
      etape: 1,
      type: null,
      titre: '',
      date_evenement: '',
      lieu: '',
      nombre_invites: 50,
      description: '',
      theme: '',
      couleurs: [],
      langue: 'fr',
      brief_genere: '',
      image_url: '',
      modifications_count: 0,
      evenement_id: null,
      prix_base: 0,
      prix_final: 0,
    }
  }

  return { state, prixEstime, etapeSuivante, etapePrecedente, allerEtape, reset }
})