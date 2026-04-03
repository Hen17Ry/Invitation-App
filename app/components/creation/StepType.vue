<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-1">Quel type de faire-part ?</h2>
    <p class="text-sm text-gray-400 mb-6">Choisissez le type d'événement</p>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="evt in evenements"
        :key="evt.type"
        @click="choisir(evt.type)"
        class="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
        :class="store.state.type === evt.type
          ? 'border-gray-900 bg-gray-900 text-white'
          : 'border-gray-100 bg-white text-gray-700 hover:border-gray-300'"
      >
        <span class="text-2xl">{{ evt.emoji }}</span>
        <span class="text-sm font-medium">{{ evt.label }}</span>
      </button>
    </div>

    <button
      @click="store.etapeSuivante()"
      :disabled="!store.state.type"
      class="mt-8 w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Continuer →
    </button>
  </div>
</template>

<script setup lang="ts">
import type { EventType } from '~/types'

const store = useCreationStore()

const evenements = [
  { type: 'mariage' as EventType,     emoji: '💍', label: 'Mariage' },
  { type: 'deces' as EventType,       emoji: '🕯️', label: 'Décès' },
  { type: 'naissance' as EventType,   emoji: '👶', label: 'Naissance' },
  { type: 'bapteme' as EventType,     emoji: '✝️', label: 'Baptême' },
  { type: 'anniversaire' as EventType,emoji: '🎂', label: 'Anniversaire' },
  { type: 'ceremonie' as EventType,   emoji: '🎓', label: 'Cérémonie' },
]

function choisir(type: EventType) {
  store.state.type = type
}
</script>