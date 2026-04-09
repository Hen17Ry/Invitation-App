<template>
  <div class="bg-neutral min-h-screen">
    <LandingNavbar />
    <LandingHero />
    <LandingSteps />
    <LandingFeatures />
    <LandingPricing />
    <LandingTestimonials />
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const user = useSupabaseUser()
onMounted(() => {
  if (user.value) navigateTo('/dashboard')
})
</script>