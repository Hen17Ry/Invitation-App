<template>
  <section id="etapes" class="bg-[#efebe4] py-12 lg:py-16">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-8">
      <!-- Titre -->
      <h2
        class="text-center font-serif text-[#16130f] font-semibold text-[1.75rem] sm:text-[2rem] lg:text-[2.3rem] leading-tight tracking-[-0.03em] mb-10 lg:mb-12"
      >
        Votre invitation en 4 étapes
      </h2>

      <!-- Steps -->
      <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-6">
        <!-- Ligne pointillée desktop -->
        <div
          class="hidden lg:block absolute left-0 right-0 top-[28px] border-t border-dashed border-[#e3cfa9] z-0"
        ></div>

        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative z-10 flex flex-col items-center text-center"
        >
          <!-- Cercle -->
          <div
            class="w-[46px] h-[46px] rounded-full bg-[#f7f5f2] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.02)] mb-4"
          >
            <span class="font-semibold text-[1.3rem] leading-none text-[#b37a12] font-serif">
              {{ index + 1 }}
            </span>
          </div>

          <!-- Titre -->
          <h3 class="font-sans text-[#16130f] font-semibold text-[1rem] leading-[1.25] mb-2">
            {{ step.title }}
          </h3>

          <!-- Description -->
          <p class="max-w-[220px] text-[0.88rem] leading-[1.7] text-[#5f5850] font-normal">
            {{ step.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "Décrivez l'événement",
    desc: "Remplissez les détails : date, lieu, et l'ambiance souhaitée.",
  },
  {
    title: "L'IA génère votre carte",
    desc: "Notre algorithme crée un design unique basé sur vos informations.",
  },
  {
    title: "Payez & obtenez le lien",
    desc: "Validez le design et recevez instantanément votre lien de partage.",
  },
  {
    title: "Téléchargez le PDF",
    desc: "Vos invités peuvent enregistrer leur invitation PDF en un clic.",
  },
]
</script>
