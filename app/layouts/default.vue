<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-50">

      <NuxtLink to="/dashboard" class="text-lg font-semibold text-gray-900">
        Avis
      </NuxtLink>

      <div class="flex items-center gap-3">

        <!-- Avatar -->
        <div class="flex items-center gap-2">
          <img
            v-if="avatar"
            :src="avatar"
            class="w-8 h-8 rounded-full object-cover"
          />
          <div
            v-else
            class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600"
          >
            {{ displayName.charAt(0).toUpperCase() }}
          </div>
        </div>

        <!-- Logout -->
        <button
          @click="logout"
          class="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Déconnexion
        </button>

      </div>
    </nav>

    <!-- Contenu -->
    <main class="max-w-2xl mx-auto px-4 py-6">
      <slot />
    </main>

  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { displayName, avatar, logout } = useAuth()
</script>