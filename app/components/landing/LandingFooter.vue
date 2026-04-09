<template>
  <footer class="bg-[#1a0d08] text-white pt-20 pb-10">
    <div class="max-w-[1400px] mx-auto px-7 sm:px-8 lg:px-10">
      <!-- Top -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12 gap-x-16 pb-16">
        <!-- Brand -->
        <div class="max-w-[300px]">
          <NuxtLink
            to="/"
            class="inline-block font-serif text-[2.2rem] leading-none font-semibold tracking-[-0.03em] text-[#f6f1eb]"
          >
            Avis<span class="text-[#c9952f]">.</span>
          </NuxtLink>

          <p class="mt-8 text-[1.05rem] leading-[1.7] text-[#9e8f86]">
            Le premier curator digital d'évènements
            de prestige en Afrique. L'élégance, sans
            compromis.
          </p>
        </div>

        <!-- Produit -->
        <div>
          <h3
            class="text-[0.95rem] font-bold uppercase tracking-[0.12em] text-[#f0ebe5] mb-8"
          >
            Produit
          </h3>

          <ul class="space-y-6">
            <li v-for="link in columns[0]?.links" :key="link.label">
              <a
                :href="link.href"
                class="text-[1.05rem] text-[#a79a91] hover:text-[#f4ede6] transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3
            class="text-[0.95rem] font-bold uppercase tracking-[0.12em] text-[#f0ebe5] mb-8"
          >
            Support
          </h3>

          <ul class="space-y-6">
            <li v-for="link in columns[1]?.links" :key="link.label">
              <a
                :href="link.href"
                class="text-[1.05rem] text-[#a79a91] hover:text-[#f4ede6] transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Compagnie -->
        <div>
          <h3
            class="text-[0.95rem] font-bold uppercase tracking-[0.12em] text-[#f0ebe5] mb-8"
          >
            Compagnie
          </h3>

          <ul class="space-y-6">
            <li v-for="link in columns[2]?.links" :key="link.label">
              <a
                :href="link.href"
                class="text-[1.05rem] text-[#a79a91] hover:text-[#f4ede6] transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-[#2a1a14] pt-10">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <p class="text-[0.98rem] text-[#7f7168]">
            © 2024 Avis Digital Curator. Tous droits réservés.
          </p>

          <div class="flex flex-wrap items-center gap-8">
            <a
              href="#"
              class="text-[0.98rem] text-[#7f7168] hover:text-[#efe7df] transition-colors"
            >
              Confidentialité
            </a>
            <a
              href="#"
              class="text-[0.98rem] text-[#7f7168] hover:text-[#efe7df] transition-colors"
            >
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

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