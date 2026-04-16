<template>
  <section id="tarifs" class="bg-[#f0ebe3] py-12 lg:py-16">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-10">
        <h2
          class="font-serif text-[#17130f] text-[1.75rem] sm:text-[2.1rem] lg:text-[2.4rem] leading-[1] tracking-[-0.03em] font-semibold"
        >
          Des tarifs transparents
        </h2>
        <p class="mt-3 text-[#5c554d] text-[0.9rem] leading-[1.6]">
          Choisissez le plan qui correspond à l'ampleur de votre célébration.
        </p>
      </div>

      <!-- Pricing cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="relative rounded-[18px] bg-[#fbfaf8] px-6 pt-7 pb-6 border"
          :class="
            plan.featured
              ? 'border-[#d09a37] shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
              : 'border-[#eee8e0] shadow-[0_8px_20px_rgba(0,0,0,0.015)]'
          "
        >
          <!-- Badge -->
          <div v-if="plan.featured" class="absolute -top-4 left-1/2 -translate-x-1/2">
            <span
              class="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#cf9a3a] text-white text-[0.72rem] font-bold uppercase tracking-[0.06em]"
            >
              Populaire
            </span>
          </div>

          <!-- Name -->
          <h3 class="text-[#17130f] text-[1rem] font-semibold mb-3">
            {{ plan.name }}
          </h3>

          <!-- Price -->
          <div class="flex items-end gap-1.5 mb-5">
            <span class="font-serif text-[#17130f] text-[1.9rem] sm:text-[2.2rem] leading-none font-semibold tracking-[-0.03em]">
              {{ plan.price }}
            </span>
            <span class="text-[#534d46] text-[0.88rem] mb-0.5">
              {{ plan.period }}
            </span>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-6">
            <li
              v-for="feat in plan.features"
              :key="feat.label"
              class="flex items-center gap-2.5 text-[0.88rem]"
              :class="feat.included ? 'text-[#5a534c]' : 'text-[#bcb4aa]'"
            >
              <span
                class="w-[16px] h-[16px] rounded-full border flex items-center justify-center text-[10px] flex-shrink-0"
                :class="
                  feat.included
                    ? 'border-[#c68b22] text-[#c68b22]'
                    : 'border-[#bdb5ac] text-[#bdb5ac]'
                "
              >
                {{ feat.included ? '✓' : '○' }}
              </span>
              <span>{{ feat.label }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <NuxtLink
            :to="plan.link"
            class="mt-auto block w-full text-center h-[40px] leading-[40px] rounded-[12px] font-semibold text-[0.88rem] transition"
            :class="
              plan.featured
                ? 'bg-[#cf9a3a] text-white hover:brightness-95'
                : 'border border-[#ddd0bc] text-[#a36e08] hover:bg-[#f8f3eb]'
            "
          >
            {{ plan.cta }}
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '/événement',
    featured: false,
    cta: 'Commencer',
    link: '/login',
    features: [
      { label: "Jusqu'à 10 invités", included: true },
      { label: 'Modèle standard', included: true },
      { label: 'Gestion RSVP illimitée', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '49€',
    period: '/an',
    featured: true,
    cta: 'Devenir Premium',
    link: '/creer',
    features: [
      { label: 'Événements illimités', included: true },
      { label: 'Accès à tous les designs IA', included: true },
      { label: 'Gestion RSVP illimitée', included: true },
      { label: 'Suppression logo Avis', included: true },
    ],
  },
  {
    name: "À l'unité",
    price: '19€',
    period: '/événement',
    featured: false,
    cta: 'Choisir',
    link: '/login',
    features: [
      { label: 'Un seul événement', included: true },
      { label: '1 design premium', included: true },
      { label: 'Gestion RSVP complète', included: true },
    ],
  },
]
</script>
