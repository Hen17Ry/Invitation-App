<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
    <div class="w-full max-w-sm text-center">

      <h1 class="text-4xl font-semibold tracking-tight text-gray-900 mb-3">Avis</h1>
      <p class="text-gray-400 text-sm mb-8">
        Faire-parts digitaux pour l'Afrique.<br/>
        Créez et partagez en 2 minutes.
      </p>

      <NuxtLink
        to="/login"
        class="block w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors"
      >
        Commencer
      </NuxtLink>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const user = useSupabaseUser()

onMounted(() => {
  if (user.value) navigateTo('/dashboard')
})
</script>