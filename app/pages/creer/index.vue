<template>
  <div>

    <!-- Header avec progression -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <button
          v-if="store.state.etape > 1"
          @click="store.etapePrecedente()"
          class="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
        >
          ← Retour
        </button>
        <div v-else></div>
        <span class="text-xs text-gray-400">{{ store.state.etape }} / 5</span>
      </div>

      <!-- Barre de progression -->
      <div class="w-full bg-gray-100 rounded-full h-1">
        <div
          class="bg-gray-900 h-1 rounded-full transition-all duration-500"
          :style="{ width: `${(store.state.etape / 5) * 100}%` }"
        />
      </div>
    </div>

    <!-- Étapes -->
    <Transition name="slide" mode="out-in">

      <CreationStepType
        v-if="store.state.etape === 1"
        key="step1"
      />

      <CreationStepDetails
        v-else-if="store.state.etape === 2"
        key="step2"
      />

      <CreationStepDescription
        v-else-if="store.state.etape === 3"
        key="step3"
      />

      <CreationStepBrief
        v-else-if="store.state.etape === 4"
        key="step4"
      />

      <CreationStepRecap
        v-else-if="store.state.etape === 5"
        key="step5"
      />

    </Transition>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const store = useCreationStore()

onMounted(() => store.reset())
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>