<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#f7f5f2] border-b border-[#ece6dc]">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="font-serif text-[2rem] leading-none font-semibold tracking-[-0.03em] text-[#1a1714]"
      >
        Avis<span class="text-[#c9952f]">.</span>
      </NuxtLink>

      <!-- Navigation desktop -->
      <div class="hidden lg:flex items-center gap-12">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.href"
          class="relative text-[1.05rem] font-medium text-[#2c2723] transition-colors hover:text-[#c9952f]"
          :class="link.active ? 'text-[#c9952f]' : ''"
        >
          {{ link.label }}

          <span
            v-if="link.active"
            class="absolute left-0 right-0 -bottom-[14px] h-[2px] bg-[#c9952f] rounded-full"
          ></span>
        </NuxtLink>
      </div>

      <!-- Actions desktop -->
      <div class="hidden lg:flex items-center gap-6">
        <NuxtLink
          to="/login"
          class="text-[1.05rem] font-medium text-[#2c2723] hover:text-[#c9952f] transition-colors"
        >
          Se connecter
        </NuxtLink>

        <NuxtLink
          to="/creer"
          class="inline-flex items-center justify-center h-[46px] px-7 rounded-[14px] bg-[#cf9a3a] text-white text-[1.02rem] font-semibold hover:brightness-95 transition"
        >
          Créer un faire-part
        </NuxtLink>
      </div>

      <!-- Burger mobile -->
      <button
        @click="menuOpen = !menuOpen"
        class="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[12px] border border-[#e8dfd2] text-[#1a1714]"
        aria-label="Ouvrir le menu"
      >
        <svg
          v-if="!menuOpen"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16" />
        </svg>

        <svg
          v-else
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="nav-fade">
      <div
        v-if="menuOpen"
        class="lg:hidden border-t border-[#ece6dc] bg-[#f7f5f2]"
      >
        <div class="px-4 sm:px-6 py-5 space-y-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.href"
            @click="menuOpen = false"
            class="block text-[1rem] font-medium transition-colors"
            :class="link.active ? 'text-[#c9952f]' : 'text-[#2c2723]'"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="pt-4 border-t border-[#ece6dc] space-y-3">
            <NuxtLink
              to="/login"
              @click="menuOpen = false"
              class="block text-[1rem] font-medium text-[#2c2723]"
            >
              Se connecter
            </NuxtLink>

            <NuxtLink
              to="/creer"
              @click="menuOpen = false"
              class="block w-full text-center h-[48px] leading-[48px] rounded-[14px] bg-[#cf9a3a] text-white text-[1rem] font-semibold"
            >
              Créer un faire-part
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

const navLinks = [
  { label: 'Fonctionnalités', href: '#fonctionnalites', active: true },
  { label: 'Tarifs', href: '#tarifs', active: false },
  { label: 'Comment ça marche', href: '#etapes', active: false },
  { label: 'À propos', href: '#apropos', active: false },
]
</script>

<style scoped>
.nav-fade-enter-active,
.nav-fade-leave-active {
  transition: all 0.22s ease;
}

.nav-fade-enter-from,
.nav-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>