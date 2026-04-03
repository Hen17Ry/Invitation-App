<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-1">Les détails</h2>
    <p class="text-sm text-gray-400 mb-6">Informations principales de votre événement</p>

    <div class="space-y-4">

      <!-- Titre -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-1 block">Titre de l'événement</label>
        <input
          v-model="store.state.titre"
          type="text"
          placeholder="Ex: Mariage de Jean & Marie"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <!-- Date -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-1 block">Date de l'événement</label>
        <input
          v-model="store.state.date_evenement"
          type="date"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <!-- Lieu -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-1 block">Lieu</label>
        <input
          v-model="store.state.lieu"
          type="text"
          placeholder="Ex: Salle des fêtes de Cotonou"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <!-- Nombre d'invités -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-1 block">
          Nombre d'invités
          <span class="text-gray-900 font-semibold ml-1">{{ store.state.nombre_invites }}</span>
        </label>
        <input
          v-model.number="store.state.nombre_invites"
          type="range"
          min="10"
          max="1000"
          step="10"
          class="w-full accent-gray-900"
        />
        <div class="flex justify-between text-xs text-gray-300 mt-1">
          <span>10</span>
          <span>500</span>
          <span>1000</span>
        </div>
      </div>

      <!-- Langue -->
      <div>
        <label class="text-xs font-medium text-gray-500 mb-1 block">Langue de la carte</label>
        <select
          v-model="store.state.langue"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors bg-white"
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="fon">Fon</option>
          <option value="yoruba">Yoruba</option>
        </select>
      </div>

    </div>

    <!-- Prix estimé -->
    <div class="mt-6 bg-gray-50 rounded-xl p-4 flex items-center justify-between">
      <span class="text-sm text-gray-500">Estimation du prix</span>
      <span class="text-lg font-semibold text-gray-900">
        {{ store.prixEstime.toLocaleString() }} FCFA
      </span>
    </div>

    <button
      @click="store.etapeSuivante()"
      :disabled="!peutContinuer"
      class="mt-4 w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Continuer →
    </button>
  </div>
</template>

<script setup lang="ts">
const store = useCreationStore()

const peutContinuer = computed(() =>
  store.state.titre.trim() !== '' &&
  store.state.date_evenement !== '' &&
  store.state.lieu.trim() !== '' &&
  store.state.nombre_invites > 0
)
</script>