<template>
  <div class="bg-neutral min-h-screen">
    <LandingNavbar />
    <div class="landing-reveal landing-reveal--hero">
      <LandingHero />
    </div>
    <div class="landing-reveal landing-reveal--delay-1">
      <LandingSteps />
    </div>
    <div class="landing-reveal landing-reveal--delay-2">
      <LandingFeatures />
    </div>
    <div class="landing-reveal landing-reveal--delay-1">
      <LandingPricing />
    </div>
    <div class="landing-reveal landing-reveal--delay-2">
      <LandingTestimonials />
    </div>
    <div class="landing-reveal landing-reveal--delay-1">
      <LandingFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const auth = useAuth()
let landingObserver: IntersectionObserver | null = null

onMounted(() => {
  auth.charger()
  if (auth.isLoggedIn.value) navigateTo('/dashboard')

  const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.landing-reveal'))
  if (!revealElements.length) return

  landingObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('landing-reveal--visible')
          landingObserver?.unobserve(entry.target)
        }
      }
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px',
    }
  )

  for (const element of revealElements) {
    landingObserver.observe(element)
  }
})

onUnmounted(() => {
  landingObserver?.disconnect()
})
</script>

<style scoped>
.landing-reveal {
  opacity: 0;
  transform: translateY(40px);
  filter: blur(10px);
  transition:
    opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 720ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 720ms cubic-bezier(0.22, 1, 0.36, 1);
}

.landing-reveal--hero {
  opacity: 1;
  transform: none;
  filter: none;
}

.landing-reveal--delay-1 {
  transition-delay: 90ms;
}

.landing-reveal--delay-2 {
  transition-delay: 160ms;
}

.landing-reveal--visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .landing-reveal,
  .landing-reveal--delay-1,
  .landing-reveal--delay-2 {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
