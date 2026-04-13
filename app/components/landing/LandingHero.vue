<template>
  <section class="min-h-screen bg-[#f6f3ed] flex items-center overflow-hidden">
    <div
      class="max-w-[1200px] mx-auto w-full px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-center mt-2"
    >
      <!-- Bloc gauche -->
      <div
        class="max-w-[620px] hero-copy transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="heroReady ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 rounded-full border border-[#e9e1d4] bg-[#f3eee4] px-3 py-1.5 mb-5 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          :class="heroReady ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
        >
          <span class="text-[#c99a3c] text-[10px] leading-none">✦</span>
          <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-medium text-[#8e7b5a]">
            Faire-parts digitaux pour l'Afrique
          </span>
        </div>

        <!-- Titre -->
        <h1
          class="font-serif text-[#15120f] text-[2.1rem] sm:text-[2.8rem] lg:text-[3.4rem] leading-[0.95] font-semibold tracking-[-0.04em] transition-all delay-75 duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          :class="heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
        >
          Chaque événement
          <br />
          mérite une entrée
          <br />
          <span class="italic text-[#d0a03f] font-normal">remarquable.</span>
        </h1>

        <!-- Texte -->
        <p
          class="mt-5 max-w-[540px] text-[#5f5b57] text-[0.95rem] leading-[1.75] transition-all delay-150 duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          :class="heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
        >
          Créez des invitations digitales prestigieuses qui reflètent
          votre héritage. L'élégance du papier, la puissance du digital.
        </p>

        <!-- Boutons -->
        <div
          class="mt-7 flex flex-col sm:flex-row gap-3 transition-all delay-200 duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          :class="heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
        >
          <NuxtLink
            to="/creer"
            class="inline-flex items-center justify-center min-w-[190px] h-[44px] rounded-[14px] bg-[#d1a03f] px-6 text-white font-semibold text-[0.9rem] shadow-[0_8px_24px_rgba(201,148,58,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_16px_34px_rgba(201,148,58,0.22)]"
          >
            Démarrer maintenant
          </NuxtLink>

          <a
            href="#modeles"
            class="inline-flex items-center justify-center min-w-[160px] h-[44px] rounded-[14px] border border-[#ddd3c7] bg-[#f8f5ef] px-6 text-[#1e1a17] font-semibold text-[0.9rem] shadow-[0_1px_0_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(30,26,23,0.08)]"
          >
            Voir les modèles
          </a>
        </div>
      </div>

      <!-- Bloc droite -->
      <div
        class="flex justify-center lg:justify-end transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="heroReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
      >
        <div class="relative hero-card-shell">
          <!-- ombre -->
          <div class="absolute inset-0 scale-[1.08] rounded-[30px] bg-[#7f5600]/10 blur-[80px] transition duration-500 hero-card-glow"></div>

          <!-- carte -->
          <div
            class="hero-card relative w-[260px] sm:w-[290px] lg:w-[320px] aspect-[3/4] overflow-hidden rounded-[20px] border-[10px] border-[#c9943a]/20 bg-[#4a0e0e] p-1 shadow-[0_20px_60px_rgba(74,14,14,0.3)] transition duration-500"
          >
            <div
              class="absolute inset-0 opacity-[1] mix-blend-soft-light"
              style="
                background-image: url('/assets/cardboard-flat.png');
                background-size: 220px 220px;
                background-repeat: repeat;
              "
            ></div>
            <div
              class="absolute inset-0 opacity-[0.14]"
              style="
                background-image:
                  radial-gradient(circle at 18% 20%, rgba(201, 148, 58, 0.26) 0, transparent 30%),
                  radial-gradient(circle at 78% 24%, rgba(201, 148, 58, 0.18) 0, transparent 28%),
                  radial-gradient(circle at 74% 78%, rgba(255, 249, 239, 0.08) 0, transparent 24%);
              "
            ></div>

            <div class="relative h-full w-full rounded-[12px] border-2 border-[#c9943a] px-8 py-8 text-center">
              <div class="absolute top-4 left-4 h-12 w-12 border-l-2 border-t-2 border-[#c9943a]/40"></div>
              <div class="absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-[#c9943a]/40"></div>

              <div class="relative flex h-full flex-col items-center justify-center">
                <div class="mb-6 text-[46px] leading-none text-[#c9943a]">♥</div>

                <h2 class="font-serif text-[1.9rem] font-bold leading-[1.15] text-white">
                  Mariage de Jean &amp; Marie
                </h2>

                <div class="mt-4 h-0.5 w-12 bg-[#c9943a]"></div>

                <p class="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#c9943a]">
                  Samedi 24 Juin 2024
                </p>

                <p class="mt-8 max-w-[210px] font-serif text-[0.88rem] italic leading-relaxed text-[#fdfaf6]/80">
                  "Nous sommes ravis de vous inviter à célébrer notre union..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const heroReady = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    heroReady.value = true
  })
})
</script>

<style scoped>
.hero-card-shell {
  animation: heroCardFloat 7.5s ease-in-out infinite;
}

.hero-card::before {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 249, 239, 0.08), rgba(255, 255, 255, 0) 42%);
  opacity: 0;
  transition: opacity 280ms ease;
  pointer-events: none;
}

.hero-card-shell:hover .hero-card {
  transform: translateY(-6px) rotate(-1deg) scale(1.01);
  box-shadow: 0 28px 72px rgba(74, 14, 14, 0.36);
}

.hero-card-shell:hover .hero-card::before {
  opacity: 1;
}

.hero-card-shell:hover .hero-card-glow {
  transform: scale(1.14);
  opacity: 0.9;
}

@keyframes heroCardFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-card-shell {
    animation: none;
  }
}
</style>
