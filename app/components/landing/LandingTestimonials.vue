<template>
  <section class="bg-[#f7f5f2] py-10 sm:py-12">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6">
      <!-- Titre -->
      <h2
        class="text-center font-serif text-[#1a1714] text-[1.4rem] sm:text-[1.65rem] lg:text-[1.9rem] font-semibold leading-tight mb-7"
      >
        Ils nous font confiance
      </h2>

      <!-- Témoignages -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        <article
          v-for="t in testimonials"
          :key="t.name"
          class="bg-[#efe8dc] rounded-[10px] px-5 py-5"
        >
          <!-- Header -->
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold shrink-0"
              :style="{ backgroundColor: t.color }"
            >
              {{ t.initial }}
            </div>

            <div class="leading-tight">
              <p class="text-[#1a1714] text-[12px] font-semibold">{{ t.name }}</p>
              <p class="text-[#8b8175] text-[10px]">{{ t.role }}</p>
            </div>
          </div>

          <!-- Citation -->
          <p class="font-serif italic text-[#2f2a25] text-[13px] leading-[1.55]">
            "{{ t.quote }}"
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    initial: 'A',
    name: 'Aminata Diallo',
    role: 'Wedding Planner, Dakar',
    color: '#C9943A',
    quote: 'Un outil révolutionnaire qui allie modernité et respect de nos traditions esthétiques.',
  },
  {
    initial: 'M',
    name: 'Moussa Traoré',
    role: 'Designer, Abidjan',
    color: '#C9943A',
    quote: "La fluidité de l'interface et la qualité des rendus générés par l'IA sont bluffantes.",
  },
  {
    initial: 'S',
    name: 'Sarah Koffi',
    role: 'Particulier, Accra',
    color: '#C9943A',
    quote: "Mes invités n'en revenaient pas de recevoir une invitation aussi élégante directement sur WhatsApp.",
  },
]
</script>
