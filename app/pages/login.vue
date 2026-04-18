<template>
  <div class="min-h-screen bg-[#f6f1e8] lg:grid lg:grid-cols-[45%_55%]">
    <!-- Colonne gauche -->
    <aside class="relative hidden lg:flex min-h-screen overflow-hidden bg-[#1a0d08] text-white">
      <div
        class="absolute inset-0"
        style="
          background:
            radial-gradient(circle at 45% 65%, rgba(180,110,22,0.35), transparent 28%),
            radial-gradient(circle at 55% 60%, rgba(93,44,8,0.22), transparent 42%),
            linear-gradient(180deg, #1a0d08 0%, #140905 100%);
        "
      ></div>

      <div class="relative z-10 flex h-full w-full flex-col justify-between px-10 py-10">
        <div class="flex-1 flex flex-col items-center justify-center">
          <h2
            class="font-serif text-center text-[3.2rem] leading-[0.95] tracking-[-0.04em] font-medium text-[#f7f2ec]"
          >
            <span class="whitespace-pre-line">{{ heroTypedText }}</span>
            <span v-if="showHeroCursor" class="typing-cursor" aria-hidden="true"></span>
          </h2>

          <div class="mt-8 rotate-[-4deg] [perspective:1400px]">
            <div
              ref="previewCardRef"
              class="login-preview-card w-[260px] rounded-[14px] bg-[#f8f4ee] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
              :style="previewCardStyle"
              @mousemove="handlePreviewCardMove"
              @mouseleave="resetPreviewCard"
            >
              <div class="border border-dashed border-[#e5ddd0] px-5 py-8 text-center">
                <div class="mb-5 text-[#99630d] text-[1.4rem]">✦</div>

                <h3 class="font-serif text-[#2a241f] text-[1rem] leading-[1.3] font-medium">
                  Mariage d'Élise &
                  <br />
                  Marc
                </h3>

                <p class="mt-3 text-[#7b736a] text-[0.72rem] uppercase tracking-[0.28em]">
                  12 octobre 2024
                </p>

                <div class="mx-auto mt-3 h-px w-10 bg-[#d7c4a2]"></div>

                <p class="mt-5 text-[#534c45] text-[0.82rem] leading-[1.65]">
                  Nous avons hâte de célébrer ce
                  moment unique avec vous.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <span class="inline-block h-8 w-8 rounded-full bg-gradient-to-br from-[#d7a245] to-[#9f5e12]"></span>
          <span class="font-serif text-[1.5rem] font-semibold tracking-[-0.03em]">
            Avis
          </span>
        </div>
      </div>
    </aside>

    <!-- Colonne droite -->
    <main class="min-h-screen bg-[#f6f1e8]">
      <div
        class="mx-auto flex min-h-screen w-full max-w-[680px] flex-col px-6 py-6 sm:px-8 lg:px-12"
      >
        <!-- haut -->
        <div class="pt-4">
          <NuxtLink to="/" class="inline-block">
            <h1 class="font-serif text-[#17130f] text-[2rem] leading-none font-semibold tracking-[-0.04em]">
              Avis
            </h1>
            <p class="mt-1.5 text-[#2f2924] text-[0.88rem]">Digital Curator</p>
          </NuxtLink>
        </div>

        <!-- centre -->
        <div class="flex-1 flex items-center">
          <div class="w-full max-w-[460px]">
            <!-- switch animé -->
            <div class="relative mb-7 rounded-full bg-[#efe9de] p-1">
              <div
                class="absolute top-1 bottom-1 w-[calc(50%-5px)] rounded-full bg-gradient-to-r from-[#d39a34] to-[#9f5d12] shadow-[0_6px_14px_rgba(159,93,18,0.22)] transition-all duration-300 ease-out"
                :class="activeTab === 'login' ? 'left-1' : 'left-[calc(50%+3px)]'"
              ></div>

              <div class="relative grid grid-cols-2">
                <button
                  type="button"
                  @click="switchTab('login')"
                  class="h-[40px] rounded-full text-[0.88rem] font-semibold transition-colors duration-300"
                  :class="activeTab === 'login' ? 'text-white' : 'text-[#3a332d]'"
                >
                  Connexion
                </button>

                <button
                  type="button"
                  @click="switchTab('register')"
                  class="h-[40px] rounded-full text-[0.88rem] font-semibold transition-colors duration-300"
                  :class="activeTab === 'register' ? 'text-white' : 'text-[#3a332d]'"
                >
                  Inscription
                </button>
              </div>
            </div>

            <!-- contenu animé -->
            <Transition name="auth-fade" mode="out-in">
              <!-- LOGIN -->
              <div v-if="activeTab === 'login'" key="login">
                <div class="mb-5">
                  <h2 class="font-serif text-[#17130f] text-[1.8rem] leading-none font-semibold tracking-[-0.03em]">
                    Bon retour
                  </h2>
                  <p class="mt-2 text-[#4d4640] text-[0.92rem] leading-[1.65]">
                    Entrez vos identifiants pour accéder à votre tableau de bord.
                  </p>
                </div>

                <button
                  type="button"
                  :disabled="loading"
                  @click="handleGoogleAuth"
                  class="flex h-[46px] w-full items-center justify-center gap-3 rounded-[14px] bg-white text-[#17130f] text-[0.9rem] font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] border border-[#eee4d7] disabled:opacity-60"
                >
                  <span class="inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-black text-white text-[11px] font-bold">G</span>
                  <span>{{ loading ? 'Connexion...' : 'Continuer avec Google' }}</span>
                </button>

                <div class="my-6 flex items-center gap-3">
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                  <span class="text-[#9d9387] text-[0.78rem] uppercase tracking-[0.16em]">
                    Ou avec votre email
                  </span>
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                </div>

                <form class="space-y-4" @submit.prevent="handleLogin">
                  <div>
                    <label class="mb-1.5 block text-[#3b342d] text-[0.78rem] font-semibold uppercase tracking-wide">
                      Adresse email
                    </label>
                    <input
                      v-model="loginForm.email"
                      type="email"
                      placeholder="nom@exemple.com"
                      class="h-[46px] w-full rounded-[14px] border border-[#e8dccb] bg-white px-4 text-[0.9rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <div>
                    <div class="mb-1.5 flex items-center justify-between">
                      <label class="block text-[#3b342d] text-[0.78rem] font-semibold uppercase tracking-wide">
                        Mot de passe
                      </label>
                      <a href="#" class="text-[#a56d12] text-[0.82rem] font-medium">Oublié ?</a>
                    </div>

                    <div class="relative">
                      <input
                        v-model="loginForm.password"
                        :type="showLoginPassword ? 'text' : 'password'"
                        placeholder="••••••••"
                        class="h-[46px] w-full rounded-[14px] border border-[#e8dccb] bg-white px-4 pr-12 text-[0.9rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                      />
                      <button
                        type="button"
                        @click="showLoginPassword = !showLoginPassword"
                        class="absolute inset-y-0 right-3.5 flex items-center text-[#b1a596]"
                      >
                        <svg v-if="!showLoginPassword" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          <circle cx="12" cy="12" r="3" stroke-width="1.8" />
                        </svg>
                        <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-.586M9.88 5.09A9.77 9.77 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.57 10.57 0 01-4.132 5.411M6.228 6.228A10.523 10.523 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.77 9.77 0 004.29-.91" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="h-[46px] w-full rounded-[14px] bg-gradient-to-r from-[#d39a34] to-[#9f5d12] text-white text-[0.95rem] font-semibold shadow-[0_8px_20px_rgba(167,105,21,0.18)] transition hover:brightness-95 disabled:opacity-60"
                  >
                    Se connecter
                  </button>
                </form>

                <p class="mt-6 text-center text-[#4c453e] text-[0.88rem]">
                  Vous n'avez pas de compte ?
                  <button type="button" @click="switchTab('register')" class="font-semibold text-[#9b6410]">
                    Créer un compte
                  </button>
                </p>
              </div>

              <!-- REGISTER -->
              <div v-else key="register">
                <div class="mb-5">
                  <h2 class="font-serif text-[#17130f] text-[1.8rem] leading-none font-semibold tracking-[-0.03em]">
                    Bienvenue
                  </h2>
                  <p class="mt-2 text-[#4d4640] text-[0.92rem] leading-[1.65]">
                    Créez votre compte pour commencer à concevoir vos faire-parts.
                  </p>
                </div>

                <button
                  type="button"
                  :disabled="loading"
                  @click="handleGoogleAuth"
                  class="flex h-[46px] w-full items-center justify-center gap-3 rounded-[14px] bg-white text-[#17130f] text-[0.9rem] font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] border border-[#eee4d7] disabled:opacity-60"
                >
                  <span class="inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-black text-white text-[11px] font-bold">G</span>
                  <span>{{ loading ? 'Chargement...' : "S'inscrire avec Google" }}</span>
                </button>

                <div class="my-6 flex items-center gap-3">
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                  <span class="text-[#9d9387] text-[0.78rem] uppercase tracking-[0.16em]">
                    Ou avec votre email
                  </span>
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                </div>

                <form class="space-y-4" @submit.prevent="handleRegister">
                  <div>
                    <label class="mb-1.5 block text-[#3b342d] text-[0.78rem] font-semibold uppercase tracking-wide">
                      Nom complet
                    </label>
                    <input
                      v-model="registerForm.fullName"
                      type="text"
                      placeholder="Votre nom complet"
                      class="h-[46px] w-full rounded-[14px] border border-[#e8dccb] bg-white px-4 text-[0.9rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <div>
                    <label class="mb-1.5 block text-[#3b342d] text-[0.78rem] font-semibold uppercase tracking-wide">
                      Adresse email
                    </label>
                    <input
                      v-model="registerForm.email"
                      type="email"
                      placeholder="nom@exemple.com"
                      class="h-[46px] w-full rounded-[14px] border border-[#e8dccb] bg-white px-4 text-[0.9rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <div>
                    <label class="mb-1.5 block text-[#3b342d] text-[0.78rem] font-semibold uppercase tracking-wide">
                      Mot de passe
                    </label>
                    <div class="relative">
                      <input
                        v-model="registerForm.password"
                        :type="showRegisterPassword ? 'text' : 'password'"
                        placeholder="Créez un mot de passe"
                        class="h-[46px] w-full rounded-[14px] border border-[#e8dccb] bg-white px-4 pr-12 text-[0.9rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                      />
                      <button
                        type="button"
                        @click="showRegisterPassword = !showRegisterPassword"
                        class="absolute inset-y-0 right-3.5 flex items-center text-[#b1a596]"
                      >
                        <svg v-if="!showRegisterPassword" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          <circle cx="12" cy="12" r="3" stroke-width="1.8" />
                        </svg>
                        <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-.586M9.88 5.09A9.77 9.77 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.57 10.57 0 01-4.132 5.411M6.228 6.228A10.523 10.523 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.77 9.77 0 004.29-.91" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-1.5 block text-[#3b342d] text-[0.78rem] font-semibold uppercase tracking-wide">
                      Confirmer le mot de passe
                    </label>
                    <input
                      v-model="registerForm.confirmPassword"
                      :type="showRegisterPassword ? 'text' : 'password'"
                      placeholder="Confirmez votre mot de passe"
                      class="h-[46px] w-full rounded-[14px] border border-[#e8dccb] bg-white px-4 text-[0.9rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="h-[46px] w-full rounded-[14px] bg-gradient-to-r from-[#d39a34] to-[#9f5d12] text-white text-[0.95rem] font-semibold shadow-[0_8px_20px_rgba(167,105,21,0.18)] transition hover:brightness-95 disabled:opacity-60"
                  >
                    Créer un compte
                  </button>
                </form>

                <p class="mt-6 text-center text-[#4c453e] text-[0.88rem]">
                  Vous avez déjà un compte ?
                  <button type="button" @click="switchTab('login')" class="font-semibold text-[#9b6410]">
                    Se connecter
                  </button>
                </p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- footer -->
        <div class="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[#7c7368] text-[0.78rem] uppercase tracking-[0.08em]">
          <a href="#">Aide</a>
          <a href="#">Confidentialité</a>
          <a href="#">Français (FR)</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const heroFullText = 'Votre\névènement\ncommence ici.'
const heroTypedText = ref('')
const showHeroCursor = ref(true)
const previewCardRef = ref<HTMLElement | null>(null)
const previewRotateX = ref(0)
const previewRotateY = ref(0)
const activeTab = ref<'login' | 'register'>('login')
const loading = ref(false)
const error = ref('')
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ fullName: '', email: '', password: '', confirmPassword: '' })
let heroTypingTimer: number | undefined = undefined

const previewCardStyle = computed(() => ({
  transform: `rotateX(${previewRotateX.value}deg) rotateY(${previewRotateY.value}deg) translateY(-6px) scale(1.01)`,
}))

onMounted(() => {
  // Redirige si déjà connecté
  const auth = useAuth()
  auth.charger()
  if (auth.isLoggedIn.value) {
    navigateTo('/dashboard')
    return
  }

  let index = 0
  heroTypingTimer = window.setInterval(() => {
    heroTypedText.value = heroFullText.slice(0, index + 1)
    index += 1

    if (index >= heroFullText.length) {
      window.clearInterval(heroTypingTimer)
      heroTypingTimer = undefined
      showHeroCursor.value = false
    }
  }, 55)
})

onUnmounted(() => {
  if (heroTypingTimer !== undefined) {
    window.clearInterval(heroTypingTimer)
  }
})

function handlePreviewCardMove(event: MouseEvent) {
  const element = previewCardRef.value
  if (!element) return

  const rect = element.getBoundingClientRect()
  const relativeX = (event.clientX - rect.left) / rect.width
  const relativeY = (event.clientY - rect.top) / rect.height

  previewRotateY.value = (relativeX - 0.5) * 16
  previewRotateX.value = (0.5 - relativeY) * 16
}

function resetPreviewCard() {
  previewRotateX.value = 0
  previewRotateY.value = 0
}

function switchTab(tab: 'login' | 'register') {
  activeTab.value = tab
  error.value = ''
}

// ── Auth handlers ──────────────────────────────

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    const data = await $fetch<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: {
        email: loginForm.value.email,
        password: loginForm.value.password,
      },
    })

    const auth = useAuth()
    auth.sauvegarder(data.user, data.token)
    await navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.'
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  error.value = ''

  if (!registerForm.value.fullName.trim()) {
    error.value = 'Veuillez entrer votre nom complet.'
    return
  }

  if (registerForm.value.password.length < 8) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères.'
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  loading.value = true

  try {
    const data = await $fetch<{ token: string; user: any }>('/api/auth/register', {
      method: 'POST',
      body: {
        email: registerForm.value.email,
        password: registerForm.value.password,
        nom_complet: registerForm.value.fullName,
      },
    })

    const auth = useAuth()
    auth.sauvegarder(data.user, data.token)
    await navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.message || "Erreur lors de l'inscription."
  } finally {
    loading.value = false
  }
}

function handleGoogleAuth() {
  error.value = 'Connexion Google bientôt disponible.'
}
</script>

<style scoped>
.auth-fade-enter-active,
.auth-fade-leave-active {
  transition: all 0.28s ease;
}
.auth-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.auth-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.typing-cursor {
  display: inline-block;
  width: 0.08em;
  height: 0.9em;
  margin-left: 0.08em;
  background: currentColor;
  vertical-align: -0.08em;
  animation: blink 0.9s steps(1) infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  50.01%, 100% {
    opacity: 0;
  }
}

.login-preview-card {
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 220ms ease, box-shadow 220ms ease;
  will-change: transform;
}

.login-preview-card:hover {
  box-shadow: 0 34px 70px rgba(0, 0, 0, 0.32);
}
</style>
