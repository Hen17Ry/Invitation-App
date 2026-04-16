<template>
  <footer id="apropos" class="bg-[#1a0d08] text-white pt-12 pb-8">
    <div class="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
      <!-- Top -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-8 gap-x-12 pb-10">
        <!-- Brand -->
        <div class="max-w-[260px]">
          <NuxtLink
            to="/"
            class="inline-block font-serif text-[1.5rem] leading-none font-semibold tracking-[-0.03em] text-[#f6f1eb]"
          >
            Avis<span class="text-[#c9952f]">.</span>
          </NuxtLink>

          <p class="mt-4 text-[0.88rem] leading-[1.65] text-[#9e8f86]">
            Le premier curator digital d'évènements
            de prestige en Afrique. L'élégance, sans
            compromis.
          </p>
        </div>

        <!-- Produit -->
        <div>
          <h3 class="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[#f0ebe5] mb-5">
            Produit
          </h3>
          <ul class="space-y-4">
            <li v-for="link in columns[0]?.links" :key="link.label">
              <a :href="link.href" class="text-[0.88rem] text-[#a79a91] hover:text-[#f4ede6] transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[#f0ebe5] mb-5">
            Support
          </h3>
          <ul class="space-y-4">
            <li v-for="link in columns[1]?.links" :key="link.label">
              <a :href="link.href" class="text-[0.88rem] text-[#a79a91] hover:text-[#f4ede6] transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Compagnie -->
        <div>
          <h3 class="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[#f0ebe5] mb-5">
            Compagnie
          </h3>
          <ul class="space-y-4">
            <li v-for="link in columns[2]?.links" :key="link.label">
              <a :href="link.href" class="text-[0.88rem] text-[#a79a91] hover:text-[#f4ede6] transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-[#2a1a14] pt-7">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p class="text-[0.82rem] text-[#7f7168]">
            © {{ currentYear }} Avis Digital Curator. Tous droits réservés.
          </p>
          <div class="flex flex-wrap items-center gap-5">
            <a href="#" class="text-[0.82rem] text-[#7f7168] hover:text-[#efe7df] transition-colors">Confidentialité</a>
            <a href="#" class="text-[0.82rem] text-[#7f7168] hover:text-[#efe7df] transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink { label: string; href: string }
interface FooterColumn { title: string; links: FooterLink[] }

const currentYear = new Date().getFullYear()

const columns: FooterColumn[] = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '#fonctionnalites' },
      { label: 'Modèles', href: '#modeles' },
      { label: 'Tarifs', href: '#tarifs' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Aide en ligne', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Compagnie',
    links: [
      { label: 'À propos', href: '#apropos' },
      { label: 'Blog', href: '#' },
      { label: 'Partenaires', href: '#' },
    ],
  },
]
</script>
