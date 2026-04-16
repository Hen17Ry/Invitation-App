<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Mes événements</h1>
        <p class="text-sm text-gray-400 mt-0.5">Bonjour, {{ displayName }}</p>
      </div>
      <NuxtLink
        to="/creer"
        class="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
      >
        + Créer
      </NuxtLink>
    </div>

    <div
      v-if="evenements.length === 0"
      class="text-center py-16 border border-dashed border-gray-200 rounded-2xl"
    >
      <p class="text-gray-400 text-sm">Aucun événement pour l'instant</p>
      <NuxtLink
        to="/creer"
        class="mt-3 inline-block text-sm font-medium text-gray-900 underline underline-offset-2"
      >
        Créer mon premier faire-part
      </NuxtLink>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="evt in evenements"
        :key="evt.id"
        class="bg-white border border-gray-100 rounded-2xl p-4"
      >
        <p class="font-medium text-gray-900">{{ evt.titre }}</p>
        <p class="text-sm text-gray-400 mt-1">{{ evt.type }} · {{ evt.date_evenement }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' as any })

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const displayName = "Henry GOSSOU"
const evenements = ref<any[]>([])

onMounted(async () => {
  if (!user.value) return
  const { data } = await supabase
    .from('evenements')
    .select('*')
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false })
  evenements.value = data || []
})
</script>