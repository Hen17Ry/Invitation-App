<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#f7f5f2] border-b border-[#ece6dc]">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="font-serif text-[1.4rem] leading-none font-semibold tracking-[-0.03em] text-[#1a1714]"
      >
        Avis<span class="text-[#c9952f]">.</span>
      </NuxtLink>

      <!-- Navigation desktop -->
      <div class="hidden lg:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.href"
          @click="activeSection = link.section"
          class="relative text-[0.9rem] font-medium text-[#2c2723] transition-colors hover:text-[#c9952f]"
          :class="activeSection === link.section ? 'text-[#c9952f]' : ''"
        >
          {{ link.label }}
          <span
            v-if="activeSection === link.section"
            class="absolute left-0 right-0 -bottom-[10px] h-[2px] bg-[#c9952f] rounded-full"
          ></span>
        </NuxtLink>
      </div>

      <!-- Actions desktop -->
      <div class="hidden lg:flex items-center gap-4">
        <NuxtLink
          to="/login"
          class="text-[0.9rem] font-medium text-[#2c2723] hover:text-[#c9952f] transition-colors"
        >
          Se connecter
        </NuxtLink>

        <NuxtLink
          to="/creer"
          class="inline-flex items-center justify-center h-[36px] px-5 rounded-[14px] bg-[#cf9a3a] text-white text-[0.88rem] font-semibold hover:brightness-95 transition"
        >
          Créer un faire-part
        </NuxtLink>
      </div>

      <!-- Burger mobile -->
      <button
        @click="menuOpen = !menuOpen"
        class="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-[10px] border border-[#e8dfd2] text-[#1a1714]"
        aria-label="Ouvrir le menu"
      >
        <svg v-if="!menuOpen" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="nav-fade">
      <div v-if="menuOpen" class="lg:hidden border-t border-[#ece6dc] bg-[#f7f5f2]">
        <div class="px-4 sm:px-6 py-4 space-y-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.href"
            @click="activeSection = link.section; menuOpen = false"
            class="block text-[0.9rem] font-medium transition-colors"
            :class="activeSection === link.section ? 'text-[#c9952f]' : 'text-[#2c2723]'"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="pt-3 border-t border-[#ece6dc] space-y-2">
            <NuxtLink to="/login" @click="menuOpen = false" class="block text-[0.9rem] font-medium text-[#2c2723]">
              Se connecter
            </NuxtLink>
            <NuxtLink
              to="/creer"
              @click="menuOpen = false"
              class="block w-full text-center h-[40px] leading-[40px] rounded-[14px] bg-[#cf9a3a] text-white text-[0.9rem] font-semibold"
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
const activeSection = ref('fonctionnalites')
let sectionObserver: IntersectionObserver | null = null

const navLinks = [
  { label: 'Fonctionnalités', href: '#fonctionnalites', section: 'fonctionnalites' },
  { label: 'Tarifs', href: '#tarifs', section: 'tarifs' },
  { label: 'Comment ça marche', href: '#etapes', section: 'etapes' },
  { label: 'À propos', href: '#apropos', section: 'apropos' },
]

onMounted(() => {
  const sections = navLinks
    .map((link) => document.getElementById(link.section))
    .filter((section): section is HTMLElement => section !== null)

  if (!sections.length) return

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (!visibleEntries.length) return

      const sectionId = visibleEntries[0].target.getAttribute('id')
      if (sectionId) {
        activeSection.value = sectionId
      }
    },
    {
      rootMargin: '-25% 0px -55% 0px',
      threshold: [0.2, 0.35, 0.5, 0.7],
    }
  )

  for (const section of sections) {
    sectionObserver.observe(section)
  }
})

onUnmounted(() => {
  sectionObserver?.disconnect()
})
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
