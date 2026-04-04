<template>
  <div>

    <!-- Chargement génération image -->
    <div v-if="loading" class="text-center py-16">
      <div class="flex justify-center mb-4">
        <svg class="animate-spin w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      </div>
      <p class="text-sm text-gray-400">Génération de votre carte en cours...</p>
      <p class="text-xs text-gray-300 mt-1">Cela peut prendre 10 à 20 secondes</p>
    </div>

    <!-- Image générée -->
    <div v-else-if="store.state.image_url && imageGenerated">

      <h2 class="text-xl font-semibold text-gray-900 mb-1">Votre carte</h2>
      <p class="text-sm text-gray-400 mb-5">
        Voici votre faire-part généré. Vous avez
        <strong class="text-gray-700">{{ modificationsRestantes }} modification(s) gratuite(s)</strong>
        restante(s).
      </p>

      <!-- Image -->
      <div class="rounded-2xl overflow-hidden border border-gray-100 mb-5 shadow-sm">
        <img
          :src="store.state.image_url"
          alt="Faire-part généré"
          class="w-full object-cover"
        />
      </div>
login
      <!-- Erreur -->
      <p v-if="error" class="text-xs text-red-400 mb-4 text-center">{{ error }}</p>

      <!-- Champ de modification -->
      <div v-if="modifierMode" class="mb-5">
        <label class="text-xs font-medium text-gray-500 mb-1 block">
          Qu'est-ce que vous souhaitez changer ?
          <span v-if="store.state.modifications_count >= 3" class="text-orange-400 ml-1">
            (+500 FCFA)
          </span>
        </label>
        <textarea
          v-model="corrections"
          rows="3"
          placeholder="Ex: Je veux plus de dorure, enlever les motifs du fond..."
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
        />
        <div class="flex gap-2 mt-2">
          <button
            @click="modifierMode = false"
            class="flex-1 border border-gray-200 text-gray-500 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="soumettreModification"
            :disabled="corrections.trim() === '' || loading"
            class="flex-1 bg-gray-900 text-white text-sm py-2.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-30"
          >
            Régénérer
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div v-else class="space-y-3">

        <!-- Compteur modifications -->
        <div class="flex items-center justify-between px-1 text-xs">
          <span class="text-gray-400">
            Modifications :
            <strong class="text-gray-700">{{ store.state.modifications_count }} / 3</strong> gratuites
          </span>
          <span class="font-semibold text-gray-900">
            {{ store.prixEstime.toLocaleString() }} FCFA
          </span>
        </div>

        <button
          @click="modifierMode = true"
          class="w-full border border-gray-200 text-gray-600 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          ✏️ Modifier la carte
        </button>

        <button
          @click="validerEtPayer"
          class="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors"
        >
          ✅ Parfait — Passer au paiement
        </button>

      </div>

    </div>

    <!-- Erreur initiale -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-sm text-red-400 mb-4">{{ error }}</p>
      <button
        @click="generer"
        class="text-sm underline text-gray-500"
      >
        Réessayer
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
const store = useCreationStore()
const { genererImage } = useIA()
const router = useRouter()

const loading = ref(false)
const error = ref('')
const modifierMode = ref(false)
const corrections = ref('')
const imageGenerated = ref(false)

// Le prompt image a été stocké dans image_url temporairement à l'étape précédente
const promptImage = ref(store.state.image_url)

const modificationsRestantes = computed(() =>
  Math.max(0, 3 - store.state.modifications_count)
)

async function generer() {
  loading.value = true
  error.value = ''

 const result = await $fetch<{ image_url: string }>('/api/image/generate', {
    method: 'POST',
    body: {
      prompt: promptImage.value,
      type: store.state.type,
    },
  }).catch((err) => {
    error.value = "Erreur lors de la génération. Réessayez."
    console.error(err)
    return null
  })

  if (result) {
    store.state.image_url = result.image_url
    imageGenerated.value = true
  }

  loading.value = false
}

async function soumettreModification() {
  store.state.modifications_count++
  modifierMode.value = false

  // Régénère avec les corrections ajoutées au prompt
  const promptModifie = promptImage.value + `, modifications: ${corrections.value}`
  promptImage.value = promptModifie
  corrections.value = ''

  await generer()
}

async function validerEtPayer() {
  // Sauvegarde l'événement en base puis redirige vers le paiement
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error: dbError } = await supabase
    .from('evenements')
    .insert({
      user_id: user.value!.id,
      type: store.state.type ?? '',
      titre: store.state.titre ?? '',
      date_evenement: store.state.date_evenement ?? '',
      lieu: store.state.lieu ?? '',
      nombre_invites: store.state.nombre_invites ?? 0,
      description: store.state.description ?? '',
      theme: store.state.theme ?? '',
      couleurs: store.state.couleurs ?? [],
      langue: store.state.langue ?? 'fr',
      brief_genere: store.state.brief_genere ?? '',
      image_url: store.state.image_url ?? '',
      modifications_count: store.state.modifications_count ?? 0,
      statut: 'brouillon',
      prix_base: store.prixEstime,
      prix_final: store.prixEstime,
    })
    .select()
    .single()

  if (dbError) {
    error.value = "Erreur lors de la sauvegarde. Réessayez."
    return
  }

  store.state.evenement_id = data.id
  await router.push(`/paiement/${data.id}`)
}

onMounted(() => {
  generer()
})
</script>