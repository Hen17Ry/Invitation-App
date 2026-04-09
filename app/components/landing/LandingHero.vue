<template>
  <section class="min-h-screen bg-[#f6f3ed] flex items-center">
    <div
      class="max-w-[1200px] mx-auto w-full px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center mt-8"
    >
      <!-- Bloc gauche -->
      <div class="max-w-[620px]">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 rounded-full border border-[#e9e1d4] bg-[#f3eee4] px-4 py-2 mb-8"
        >
          <span class="text-[#c99a3c] text-[11px] leading-none">✦</span>
          <span
            class="text-[11px] sm:text-xs uppercase tracking-[0.12em] font-medium text-[#8e7b5a]"
          >
            Faire-parts digitaux pour l'Afrique
          </span>
        </div>

        <!-- Titre -->
        <h1
          class="font-serif text-[#15120f] text-[3.1rem] sm:text-[4.2rem] lg:text-[5.2rem] leading-[0.92] font-semibold tracking-[-0.04em]"
        >
          Chaque événement
          <br />
          mérite une entrée
          <br />
          <span class="italic text-[#d0a03f] font-normal">remarquable.</span>
        </h1>

        <!-- Texte -->
        <p
          class="mt-8 max-w-[650px] text-[#5f5b57] text-[1.15rem] leading-[1.75]"
        >
          Créez des invitations digitales prestigieuses qui reflètent
          votre héritage. L'élégance du papier, la puissance du digital.
        </p>

        <!-- Boutons -->
        <div class="mt-10 flex flex-col sm:flex-row gap-4">
          <NuxtLink
            to="/creer"
            class="inline-flex items-center justify-center min-w-[220px] h-[58px] rounded-[14px] bg-[#d1a03f] px-8 text-white font-semibold text-[1.02rem] shadow-[0_2px_0_rgba(0,0,0,0.04)] transition hover:brightness-95"
          >
            Démarrer maintenant
          </NuxtLink>

          <a
            href="#modeles"
            class="inline-flex items-center justify-center min-w-[190px] h-[58px] rounded-[14px] border border-[#ddd3c7] bg-[#f8f5ef] px-8 text-[#1e1a17] font-semibold text-[1.02rem] shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:bg-white"
          >
            Voir les modèles
          </a>
        </div>
      </div>

      <!-- Bloc droite -->
      <div class="flex justify-center lg:justify-end">
        <div class="relative">
          <!-- ombre -->
          <div
            class="absolute inset-0 translate-y-6 scale-[0.96] rounded-[22px] bg-[#7c1f13]/10 blur-2xl"
          ></div>

          <!-- carte -->
          <div
            class="relative w-[320px] sm:w-[360px] lg:w-[370px] aspect-[0.76/1] rounded-[20px] bg-[#6d0907] border-[6px] border-[#7f2a17] shadow-[0_20px_40px_rgba(87,23,15,0.18)] overflow-hidden"
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
            <div class="absolute inset-[12px] rounded-[14px] border border-[#d3a03f]/80"></div>
            <div class="absolute inset-[18px] rounded-[10px] border border-[#d3a03f]/30"></div>

            <!-- coins décoratifs -->
            <div class="absolute top-[28px] left-[28px] w-[44px] h-[44px] border-t border-l border-[#d3a03f]/70"></div>
            <div class="absolute bottom-[28px] right-[28px] w-[44px] h-[44px] border-b border-r border-[#d3a03f]/70"></div>

            <!-- contenu -->
            <div class="relative h-full flex flex-col items-center justify-start text-center px-8 pt-20">
              <!-- coeur -->
              <div class="text-[#d3a03f] text-[38px] leading-none">♥</div>

              <h2
                class="mt-10 font-serif text-white text-[2.2rem] leading-[1.05] font-semibold"
              >
                Mariage de Jean &amp;<br />
                Marie
              </h2>

              <div
                class="mt-10 text-[#d3a03f]/85 text-[11px] uppercase tracking-[0.34em] font-medium"
              >
                Samedi 24 Juin 2024
              </div>

              <div class="mt-10 w-10 h-px bg-[#d3a03f]/50"></div>

              <p
                class="mt-10 text-white/90 italic text-[0.98rem] leading-[1.9] max-w-[250px] font-serif"
              >
                “Nous sommes ravis de vous inviter à célébrer
                notre union...”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>