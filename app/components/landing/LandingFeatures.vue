<template>
  <section id="fonctionnalites" class="bg-[#f6f4f1] py-20 lg:py-24">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-16">
        <div class="max-w-[620px]">
          <h2
            class="font-serif text-[#16130f] text-[3.1rem] sm:text-[4.1rem] lg:text-[4.7rem] leading-[0.92] tracking-[-0.04em] font-semibold"
          >
            Tout ce dont vous avez
            <br />
            besoin
          </h2>

          <p
            class="mt-6 text-[#4f4a44] text-[1.1rem] sm:text-[1.2rem] leading-[1.65] max-w-[560px]"
          >
            Plus qu'une simple carte, une expérience complète pour vos invités
            et pour vous.
          </p>
        </div>

        <div class="lg:pb-2">
          <a
            href="#fonctionnalites"
            class="inline-flex items-center gap-2 text-[#b07a13] font-semibold text-[1.02rem] border-b border-[#d8c8a8] pb-2 whitespace-nowrap transition hover:opacity-80"
          >
            Découvrir toutes les fonctions
            <span class="text-[1.1rem] leading-none">→</span>
          </a>
        </div>
      </div>

      <!-- Grille -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
        <article
          v-for="feature in visibleFeatures"
          :key="feature.title"
          class="bg-[#fbfaf8] rounded-[22px] border border-[#f1ece5] px-10 py-10 min-h-[280px] shadow-[0_6px_20px_rgba(0,0,0,0.02)]"
        >
          <!-- Icône -->
          <div
            class="w-[56px] h-[56px] rounded-[14px] bg-[#f4d19c] flex items-center justify-center mb-8"
          >
            <component
              :is="feature.icon"
              class="w-6 h-6 text-[#a86f09]"
              stroke-width="2.1"
            />
          </div>

          <!-- Titre -->
          <h3
            class="text-[#16130f] text-[1.05rem] sm:text-[1.9rem] leading-[1.25] font-semibold mb-5 tracking-[-0.02em]"
          >
            {{ feature.title }}
          </h3>

          <!-- Texte -->
          <p class="text-[#564f48] text-[1rem] sm:text-[1.15rem] leading-[1.75] max-w-[290px]">
            {{ feature.desc }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { QrCode, WandSparkles, Map } from 'lucide-vue-next'

const features = [
  {
    icon: QrCode,
    title: 'Gestion des RSVPs',
    desc: 'Suivez les réponses en temps réel via un tableau de bord intuitif. Vos invités confirment en un clic.',
  },
  {
    icon: WandSparkles,
    title: 'Design IA Sur-Mesure',
    desc: 'Notre intelligence artificielle adapte les motifs et les couleurs à la culture de votre événement.',
  },
  {
    icon: Map,
    title: 'Plans Interactifs',
    desc: 'Intégration Google Maps native pour que vos invités arrivent à bon port, sans stress.',
  },
]

const visibleFeatures = features
</script>