<template>
  <div class="min-h-screen bg-[#f6f1e8] lg:grid lg:grid-cols-[45%_55%]">
    <!-- Colonne gauche -->
    <aside
      class="relative hidden lg:flex min-h-screen overflow-hidden bg-[#1a0d08] text-white"
    >
      <div
        class="absolute inset-0"
        style="
          background:
            radial-gradient(circle at 45% 65%, rgba(180,110,22,0.35), transparent 28%),
            radial-gradient(circle at 55% 60%, rgba(93,44,8,0.22), transparent 42%),
            linear-gradient(180deg, #1a0d08 0%, #140905 100%);
        "
      ></div>

      <div class="relative z-10 flex h-full w-full flex-col justify-between px-14 py-14">
        <div class="flex-1 flex flex-col items-center justify-center">
          <h2
            class="font-serif text-center text-[5.2rem] leading-[0.92] tracking-[-0.04em] font-medium text-[#f7f2ec]"
          >
            Votre
            <br />
            évènement
            <br />
            commence ici.
          </h2>

          <div class="mt-14 rotate-[-4deg]">
            <div
              class="w-[330px] rounded-[18px] bg-[#f8f4ee] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
            >
              <div
                class="border border-dashed border-[#e5ddd0] px-8 py-12 text-center"
              >
                <div class="mb-8 text-[#99630d] text-[2rem]">✦</div>

                <h3
                  class="font-serif text-[#2a241f] text-[1.25rem] leading-[1.25] font-medium"
                >
                  Mariage d'Élise &
                  <br />
                  Marc
                </h3>

                <p
                  class="mt-5 text-[#7b736a] text-[0.82rem] uppercase tracking-[0.28em]"
                >
                  12 octobre 2024
                </p>

                <div class="mx-auto mt-5 h-px w-14 bg-[#d7c4a2]"></div>

                <p class="mt-8 text-[#534c45] text-[0.95rem] leading-[1.7]">
                  Nous avons hâte de célébrer ce
                  moment unique avec vous.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span
            class="inline-block h-10 w-10 rounded-full bg-gradient-to-br from-[#d7a245] to-[#9f5e12]"
          ></span>
          <span class="font-serif text-[2rem] font-semibold tracking-[-0.03em]">
            Avis
          </span>
        </div>
      </div>
    </aside>

    <!-- Colonne droite -->
    <main class="min-h-screen bg-[#f6f1e8]">
      <div
        class="mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-6 py-10 sm:px-10 lg:px-16"
      >
        <!-- haut -->
        <div class="pt-6">
          <NuxtLink to="/" class="inline-block">
            <h1
              class="font-serif text-[#17130f] text-[3.4rem] leading-none font-semibold tracking-[-0.04em]"
            >
              Avis
            </h1>
            <p class="mt-3 text-[#2f2924] text-[1.15rem]">Digital Curator</p>
          </NuxtLink>
        </div>

        <!-- centre -->
        <div class="flex-1 flex items-center">
          <div class="w-full max-w-[520px]">
            <!-- switch animé -->
            <div class="relative mb-12 rounded-full bg-[#efe9de] p-1.5">
              <div
                class="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-gradient-to-r from-[#d39a34] to-[#9f5d12] shadow-[0_8px_18px_rgba(159,93,18,0.22)] transition-all duration-300 ease-out"
                :class="activeTab === 'login' ? 'left-1.5' : 'left-[calc(50%+3px)]'"
              ></div>

              <div class="relative grid grid-cols-2">
                <button
                  type="button"
                  @click="switchTab('login')"
                  class="h-[54px] rounded-full text-[1.05rem] font-semibold transition-colors duration-300"
                  :class="activeTab === 'login' ? 'text-white' : 'text-[#3a332d]'"
                >
                  Connexion
                </button>

                <button
                  type="button"
                  @click="switchTab('register')"
                  class="h-[54px] rounded-full text-[1.05rem] font-semibold transition-colors duration-300"
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
                <div class="mb-8">
                  <h2
                    class="font-serif text-[#17130f] text-[3.3rem] leading-none font-semibold tracking-[-0.03em]"
                  >
                    Bon retour 👋
                  </h2>
                  <p class="mt-4 text-[#4d4640] text-[1.15rem] leading-[1.65]">
                    Entrez vos identifiants pour accéder à votre tableau de bord.
                  </p>
                </div>

                <button
                  type="button"
                  :disabled="loading"
                  class="flex h-[64px] w-full items-center justify-center gap-4 rounded-[18px] bg-white text-[#17130f] text-[1.05rem] font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] border border-[#eee4d7] disabled:opacity-60"
                >
                  <span
                    class="inline-flex h-8 w-8 items-center justify-center rounded-[6px] bg-black text-white text-sm font-bold"
                  >
                    G
                  </span>
                  <span>{{ loading ? 'Connexion...' : 'Continuer avec Google' }}</span>
                </button>

                <div class="my-10 flex items-center gap-4">
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                  <span class="text-[#9d9387] text-[0.9rem] uppercase tracking-[0.16em]">
                    Ou avec votre email
                  </span>
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                </div>

                <form class="space-y-6">
                  <div>
                    <label class="mb-3 block text-[#3b342d] text-[0.98rem] font-semibold uppercase">
                      Adresse email
                    </label>
                    <input
                      v-model="loginForm.email"
                      type="email"
                      placeholder="nom@exemple.com"
                      class="h-[66px] w-full rounded-[18px] border border-[#e8dccb] bg-white px-5 text-[1.05rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <div>
                    <div class="mb-3 flex items-center justify-between">
                      <label class="block text-[#3b342d] text-[0.98rem] font-semibold uppercase">
                        Mot de passe
                      </label>
                      <a href="#" class="text-[#a56d12] text-[0.98rem] font-medium">
                        Oublié ?
                      </a>
                    </div>

                    <div class="relative">
                      <input
                        v-model="loginForm.password"
                        :type="showLoginPassword ? 'text' : 'password'"
                        placeholder="••••••••"
                        class="h-[66px] w-full rounded-[18px] border border-[#e8dccb] bg-white px-5 pr-14 text-[1.05rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                      />
                      <button
                        type="button"
                        @click="showLoginPassword = !showLoginPassword"
                        class="absolute inset-y-0 right-4 flex items-center text-[#b1a596]"
                      >
                        <svg
                          v-if="!showLoginPassword"
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                          <circle cx="12" cy="12" r="3" stroke-width="1.8" />
                        </svg>
                        <svg
                          v-else
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-.586M9.88 5.09A9.77 9.77 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.57 10.57 0 01-4.132 5.411M6.228 6.228A10.523 10.523 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.77 9.77 0 004.29-.91"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p v-if="error" class="text-sm text-red-600">
                    {{ error }}
                  </p>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="h-[68px] w-full rounded-[18px] bg-gradient-to-r from-[#d39a34] to-[#9f5d12] text-white text-[1.15rem] font-semibold shadow-[0_10px_25px_rgba(167,105,21,0.18)] transition hover:brightness-95 disabled:opacity-60"
                  >
                    Se connecter
                  </button>
                </form>

                <p class="mt-10 text-center text-[#4c453e] text-[1.05rem]">
                  Vous n'avez pas de compte ?
                  <button
                    type="button"
                    @click="switchTab('register')"
                    class="font-semibold text-[#9b6410]"
                  >
                    Créer un compte
                  </button>
                </p>
              </div>

              <!-- REGISTER -->
              <div v-else key="register">
                <div class="mb-8">
                  <h2
                    class="font-serif text-[#17130f] text-[3.3rem] leading-none font-semibold tracking-[-0.03em]"
                  >
                    Bienvenue ✨
                  </h2>
                  <p class="mt-4 text-[#4d4640] text-[1.15rem] leading-[1.65]">
                    Créez votre compte pour commencer à concevoir vos faire-parts.
                  </p>
                </div>

                <button
                  type="button"
                  :disabled="loading"
                  class="flex h-[64px] w-full items-center justify-center gap-4 rounded-[18px] bg-white text-[#17130f] text-[1.05rem] font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] border border-[#eee4d7] disabled:opacity-60"
                >
                  <span
                    class="inline-flex h-8 w-8 items-center justify-center rounded-[6px] bg-black text-white text-sm font-bold"
                  >
                    G
                  </span>
                  <span>{{ loading ? 'Chargement...' : "S'inscrire avec Google" }}</span>
                </button>

                <div class="my-10 flex items-center gap-4">
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                  <span class="text-[#9d9387] text-[0.9rem] uppercase tracking-[0.16em]">
                    Ou avec votre email
                  </span>
                  <div class="h-px flex-1 bg-[#eadfce]"></div>
                </div>

                <form class="space-y-6">
                  <div>
                    <label class="mb-3 block text-[#3b342d] text-[0.98rem] font-semibold uppercase">
                      Nom complet
                    </label>
                    <input
                      v-model="registerForm.fullName"
                      type="text"
                      placeholder="Votre nom complet"
                      class="h-[66px] w-full rounded-[18px] border border-[#e8dccb] bg-white px-5 text-[1.05rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <div>
                    <label class="mb-3 block text-[#3b342d] text-[0.98rem] font-semibold uppercase">
                      Adresse email
                    </label>
                    <input
                      v-model="registerForm.email"
                      type="email"
                      placeholder="nom@exemple.com"
                      class="h-[66px] w-full rounded-[18px] border border-[#e8dccb] bg-white px-5 text-[1.05rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <div>
                    <label class="mb-3 block text-[#3b342d] text-[0.98rem] font-semibold uppercase">
                      Mot de passe
                    </label>
                    <div class="relative">
                      <input
                        v-model="registerForm.password"
                        :type="showRegisterPassword ? 'text' : 'password'"
                        placeholder="Créez un mot de passe"
                        class="h-[66px] w-full rounded-[18px] border border-[#e8dccb] bg-white px-5 pr-14 text-[1.05rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                      />
                      <button
                        type="button"
                        @click="showRegisterPassword = !showRegisterPassword"
                        class="absolute inset-y-0 right-4 flex items-center text-[#b1a596]"
                      >
                        <svg
                          v-if="!showRegisterPassword"
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                          <circle cx="12" cy="12" r="3" stroke-width="1.8" />
                        </svg>
                        <svg
                          v-else
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-.586M9.88 5.09A9.77 9.77 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.57 10.57 0 01-4.132 5.411M6.228 6.228A10.523 10.523 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.77 9.77 0 004.29-.91"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-3 block text-[#3b342d] text-[0.98rem] font-semibold uppercase">
                      Confirmer le mot de passe
                    </label>
                    <input
                      v-model="registerForm.confirmPassword"
                      :type="showRegisterPassword ? 'text' : 'password'"
                      placeholder="Confirmez votre mot de passe"
                      class="h-[66px] w-full rounded-[18px] border border-[#e8dccb] bg-white px-5 text-[1.05rem] text-[#17130f] outline-none placeholder:text-[#b7ada1] focus:border-[#c9943a]"
                    />
                  </div>

                  <p v-if="error" class="text-sm text-red-600">
                    {{ error }}
                  </p>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="h-[68px] w-full rounded-[18px] bg-gradient-to-r from-[#d39a34] to-[#9f5d12] text-white text-[1.15rem] font-semibold shadow-[0_10px_25px_rgba(167,105,21,0.18)] transition hover:brightness-95 disabled:opacity-60"
                  >
                    Créer un compte
                  </button>
                </form>

                <p class="mt-10 text-center text-[#4c453e] text-[1.05rem]">
                  Vous avez déjà un compte ?
                  <button
                    type="button"
                    @click="switchTab('login')"
                    class="font-semibold text-[#9b6410]"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- footer -->
        <div
          class="pt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[#7c7368] text-[0.95rem] uppercase tracking-[0.08em]"
        >
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

const router = useRouter()
const activeTab = ref<'login' | 'register'>('login')
const loading = ref(false)
const error = ref('')
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ fullName: '', email: '', password: '', confirmPassword: '' })




function switchTab(tab: 'login' | 'register') {
  activeTab.value = tab
  error.value = ''
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
</style>