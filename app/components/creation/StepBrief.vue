<template>
  <div>

    <!-- État : chargement -->
    <div v-if="loading" class="text-center py-16">
      <div class="flex justify-center mb-4">
        <svg class="animate-spin w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      </div>
      <p class="text-sm text-gray-400">Génération du brief en cours...</p>
      <p class="text-xs text-gray-300 mt-1">L'IA analyse vos informations</p>
    </div>

    <!-- État : brief généré -->
    <div v-else-if="store.state.brief_genere">

      <div class="flex items-center justify-between mb-1">
        <h2 class="text-xl font-semibold text-gray-900">Votre carte en mots</h2>
        <span class="text-xs text-gray-300 bg-gray-100 px-2 py-1 rounded-full">
          Généré par IA
        </span>
      </div>
      <p class="text-sm text-gray-400 mb-5">
        Lisez attentivement. Si c'est bon, on génère l'image.
      </p>

      <!-- Brief affiché -->
      <div class="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-5">
        <p class="text-sm text-gray-700 leading-relaxed">
          {{ store.state.brief_genere }}
        </p>
      </div>

      <!-- Erreur modification -->
      <p v-if="error" class="text-xs text-red-400 mb-4 text-center">{{ error }}</p>

      <!-- Champ de modification -->
      <div v-if="modifierMode" class="mb-4">
        <label class="text-xs font-medium text-gray-500 mb-1 block">
          Qu'est-ce que vous souhaitez changer ?
        </label>
        <textarea
          v-model="corrections"
          rows="3"
          placeholder="Ex: Je veux plus de dorure, et une ambiance plus solennelle..."
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
        />
        <div class="flex gap-2 mt-2">
          <button
            @click="modifierMode = false"
            class="flex-1 border border-gray-200 text-gray-500 text-sm py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="soumettrModification"
            :disabled="corrections.trim() === '' || loading"
            class="flex-1 bg-gray-900 text-white text-sm py-2 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-30"
          >
            Appliquer
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div v-else class="space-y-3">

        <!-- Compteur modifications -->
        <div
          v-if="store.state.modifications_count > 0"
          class="flex items-center justify-between text-xs px-1"
        >
          <span class="text-gray-400">
            Modifications utilisées :
            <strong class="text-gray-700">
              {{ store.state.modifications_count }} / 3
            </strong>
          </span>
          <span
            v-if="store.state.modifications_count >= 3"
            class="text-orange-400"
          >
            +500 FCFA / modification supplémentaire
          </span>
        </div>

        <button
          @click="modifierMode = true"
          class="w-full border border-gray-200 text-gray-600 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          ✏️ Modifier le brief
        </button>

        <button
          @click="validerEtGenerer"
          class="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors"
        >
          ✨ C'est parfait — Générer la carte
        </button>

      </div>

    </div>

    <!-- État initial : pas encore généré -->
    <div v-else>
      <h2 class="text-xl font-semibold text-gray-900 mb-1">Brief de votre carte</h2>
      <p class="text-sm text-gray-400 mb-8">
        L'IA va analyser vos informations et créer une description détaillée de votre carte.
      </p>

      <!-- Récap des infos -->
      <div class="space-y-3 mb-8">
        <div class="flex justify-between items-center py-2 border-b border-gray-50">
          <span class="text-xs text-gray-400">Événement</span>
          <span class="text-sm text-gray-700 font-medium">{{ store.state.titre }}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-gray-50">
          <span class="text-xs text-gray-400">Date</span>
          <span class="text-sm text-gray-700">{{ store.state.date_evenement }}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-gray-50">
          <span class="text-xs text-gray-400">Lieu</span>
          <span class="text-sm text-gray-700">{{ store.state.lieu }}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-gray-50">
          <span class="text-xs text-gray-400">Invités</span>
          <span class="text-sm text-gray-700">{{ store.state.nombre_invites }} personnes</span>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-xs text-gray-400">Prix estimé</span>
          <span class="text-sm font-semibold text-gray-900">
            {{ store.prixEstime.toLocaleString() }} FCFA
          </span>
        </div>
      </div>

      <p v-if="error" class="text-xs text-red-400 mb-4 text-center">{{ error }}</p>

      <button
        @click="lancerGeneration"
        class="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors"
      >
        🤖 Générer le brief
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
const store = useCreationStore()
const { loading, error, genererBrief } = useIA()

const modifierMode = ref(false)
const corrections = ref('')
const promptImageCache = ref('')

async function lancerGeneration() {
  const result = await genererBrief({
    type: store.state.type!,
    titre: store.state.titre,
    date_evenement: store.state.date_evenement,
    lieu: store.state.lieu,
    nombre_invites: store.state.nombre_invites,
    description: store.state.description,
    theme: store.state.theme,
    couleurs: store.state.couleurs,
    langue: store.state.langue,
  })

  if (result) {
    store.state.brief_genere = result.brief_utilisateur
    promptImageCache.value = result.prompt_image
  }
}

async function soumettrModification() {
  // Incrémente le compteur
  store.state.modifications_count++

  // Régénère avec les corrections
  const result = await genererBrief({
    type: store.state.type!,
    titre: store.state.titre,
    date_evenement: store.state.date_evenement,
    lieu: store.state.lieu,
    nombre_invites: store.state.nombre_invites,
    description: store.state.description + '\n\nCorrections demandées : ' + corrections.value,
    theme: store.state.theme,
    couleurs: store.state.couleurs,
    langue: store.state.langue,
  })

  if (result) {
    store.state.brief_genere = result.brief_utilisateur
    promptImageCache.value = result.prompt_image
    modifierMode.value = false
    corrections.value = ''
  }
}

function validerEtGenerer() {
  // Stocke le prompt image dans le store pour l'étape suivante
  store.state.image_url = promptImageCache.value
  store.etapeSuivante()
}

// Lance automatiquement la génération à l'arrivée sur l'étape
onMounted(() => {
  if (!store.state.brief_genere) {
    lancerGeneration()
  }
})
</script>