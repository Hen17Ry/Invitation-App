<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <svg class="animate-spin mx-auto mb-4 text-gray-400" width="32" height="32" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      <p class="text-sm text-gray-500">Connexion en cours...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const router = useRouter()

onMounted(() => {
  const auth = useAuth()
  auth.charger()
  if (auth.isLoggedIn.value) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
})
</script>