<template>
  <section class="min-h-screen bg-[#f6f3ed] flex items-center">
    <div
      class="max-w-[1200px] mx-auto w-full px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-center mt-2"
    >
      <!-- Bloc gauche -->
      <div class="max-w-[620px]">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 rounded-full border border-[#e9e1d4] bg-[#f3eee4] px-3 py-1.5 mb-5"
        >
          <span class="text-[#c99a3c] text-[10px] leading-none">✦</span>
          <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-medium text-[#8e7b5a]">
            Faire-parts digitaux pour l'Afrique
          </span>
        </div>

        <!-- Titre -->
        <h1
          class="font-serif text-[#15120f] text-[2.1rem] sm:text-[2.8rem] lg:text-[3.4rem] leading-[0.95] font-semibold tracking-[-0.04em]"
        >
          Chaque événement
          <br />
          mérite une entrée
          <br />
          <span class="italic text-[#d0a03f] font-normal">remarquable.</span>
        </h1>

        <!-- Texte -->
        <p class="mt-5 max-w-[540px] text-[#5f5b57] text-[0.95rem] leading-[1.75]">
          Créez des invitations digitales prestigieuses qui reflètent
          votre héritage. L'élégance du papier, la puissance du digital.
        </p>

        <!-- Boutons -->
        <div class="mt-7 flex flex-col sm:flex-row gap-3">
          <NuxtLink
            to="/creer"
            class="inline-flex items-center justify-center min-w-[190px] h-[44px] rounded-[14px] bg-[#d1a03f] px-6 text-white font-semibold text-[0.9rem] shadow-[0_2px_0_rgba(0,0,0,0.04)] transition hover:brightness-95"
          >
            Démarrer maintenant
          </NuxtLink>

          <a
            href="#modeles"
            class="inline-flex items-center justify-center min-w-[160px] h-[44px] rounded-[14px] border border-[#ddd3c7] bg-[#f8f5ef] px-6 text-[#1e1a17] font-semibold text-[0.9rem] shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:bg-white"
          >
            Voir les modèles
          </a>
        </div>
      </div>

      <!-- Bloc droite -->
      <div class="flex justify-center lg:justify-end">
        <div class="relative">
          <!-- ombre -->
          <div class="absolute inset-0 translate-y-4 scale-[0.96] rounded-[22px] bg-[#7c1f13]/10 blur-2xl"></div>

          <!-- carte -->
          <div
            class="relative w-[260px] sm:w-[290px] lg:w-[300px] aspect-[0.76/1] rounded-[20px] bg-[#6d0907] border-[5px] border-[#7f2a17] shadow-[0_20px_40px_rgba(87,23,15,0.18)] overflow-hidden"
          >
            <!-- texture légère -->
            <div
              class="absolute inset-0 opacity-[0.06]"
              style="
                background-image:
                  radial-gradient(circle at 20% 20%, #f4c35d 0, transparent 32%),
                  radial-gradient(circle at 80% 30%, #f4c35d 0, transparent 28%),
                  radial-gradient(circle at 30% 80%, #f4c35d 0, transparent 30%),
                  radial-gradient(circle at 75% 75%, #f4c35d 0, transparent 26%);
              "
            ></div>

            <!-- double cadre -->
            <div class="absolute inset-[10px] rounded-[14px] border border-[#d3a03f]/80"></div>
            <div class="absolute inset-[15px] rounded-[10px] border border-[#d3a03f]/30"></div>

            <!-- coins décoratifs -->
            <div class="absolute top-[22px] left-[22px] w-[36px] h-[36px] border-t border-l border-[#d3a03f]/70"></div>
            <div class="absolute bottom-[22px] right-[22px] w-[36px] h-[36px] border-b border-r border-[#d3a03f]/70"></div>

            <!-- contenu -->
            <div class="relative h-full flex flex-col items-center justify-start text-center px-6 pt-14">
              <!-- coeur -->
              <div class="text-[#d3a03f] text-[28px] leading-none">♥</div>

              <h2 class="mt-6 font-serif text-white text-[1.5rem] leading-[1.1] font-semibold">
                Mariage de Jean &amp;<br />Marie
              </h2>

              <div class="mt-6 text-[#d3a03f]/85 text-[10px] uppercase tracking-[0.34em] font-medium">
                Samedi 24 Juin 2024
              </div>

              <div class="mt-6 w-8 h-px bg-[#d3a03f]/50"></div>

              <p class="mt-6 text-white/90 italic text-[0.82rem] leading-[1.9] max-w-[200px] font-serif">
                "Nous sommes ravis de vous inviter à célébrer notre union..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
