<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-1">Décrivez votre carte</h2>
    <p class="text-sm text-gray-400 mb-6">
      Plus vous donnez de détails, plus la carte sera belle et personnalisée
    </p>

    <div class="space-y-4">

      <!-- Description libre -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-1 block">
          Description de la carte souhaitée
        </label>
        <textarea
          v-model="store.state.description"
          rows="5"
          placeholder="Ex: Je veux une carte élégante avec des tons dorés et bordeaux, style traditionnel africain, avec des motifs de kente. Le texte doit être sobre et raffiné..."
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
        />
        <p class="text-xs text-gray-300 mt-1 text-right">
          {{ store.state.description.length }} caractères
        </p>
      </div>

      <!-- Thème -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-1 block">Thème / Ambiance</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="t in themes"
            :key="t"
            @click="store.state.theme = t"
            class="py-2 px-3 rounded-xl text-xs border transition-all"
            :class="store.state.theme === t
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-100 text-gray-500 hover:border-gray-300'"
          >
            {{ t }}
          </button>
        </div>
      </div>

      <!-- Couleurs -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-2 block">
          Couleurs principales (max 3)
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="couleur in couleursDispo"
            :key="couleur.hex"
            @click="toggleCouleur(couleur.hex)"
            class="flex items-center gap-2 py-1.5 px-3 rounded-full border text-xs transition-all"
            :class="store.state.couleurs.includes(couleur.hex)
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-100 text-gray-500 hover:border-gray-300'"
          >
            <span
              class="w-3 h-3 rounded-full border border-white/30"
              :style="{ background: couleur.hex }"
            />
            {{ couleur.nom }}
          </button>
        </div>
      </div>

    </div>

    <button
      @click="store.etapeSuivante()"
      :disabled="!peutContinuer"
      class="mt-8 w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Générer le brief →
    </button>
  </div>
</template>

<script setup lang="ts">
const store = useCreationStore()

const themes = [
  'Traditionnel', 'Moderne', 'Élégant',
  'Festif', 'Sobre', 'Coloré',
  'Minimaliste', 'Luxueux', 'Naturel',
]

const couleursDispo = [
  { hex: '#C9A84C', nom: 'Or' },
  { hex: '#8B1A1A', nom: 'Bordeaux' },
  { hex: '#1B4332', nom: 'Vert forêt' },
  { hex: '#1A1A2E', nom: 'Bleu nuit' },
  { hex: '#F5F0E8', nom: 'Ivoire' },
  { hex: '#2C2C2C', nom: 'Noir' },
  { hex: '#FFFFFF', nom: 'Blanc' },
  { hex: '#D4A5A5', nom: 'Rose poudré' },
  { hex: '#4A90D9', nom: 'Bleu ciel' },
]

function toggleCouleur(hex: string) {
  const idx = store.state.couleurs.indexOf(hex)
  if (idx >= 0) {
    store.state.couleurs.splice(idx, 1)
  } else if (store.state.couleurs.length < 3) {
    store.state.couleurs.push(hex)
  }
}

const peutContinuer = computed(() =>
  store.state.description.trim().length >= 20
)
</script>