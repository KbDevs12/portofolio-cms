import { Html } from "@elysiajs/html";
import { Layout } from "./Layout";

interface LoginPageProps {
  error?: string;
}

export const LoginPage = ({ error }: LoginPageProps) => (
  <Layout title="Login">
    <main class="min-h-screen bg-black text-white">
      <div class="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12 lg:px-10">
        <div class="grid w-full gap-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <section class="hidden lg:block">
            <div class="max-w-xl">
              <h1 class="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight">
                Welcome
                <br />
                back.
              </h1>
            </div>
          </section>
          <section class="w-full">
            <div class="mb-8">
              <h2 class="mt-3 text-3xl font-semibold tracking-tight lg:mt-0">
                Sign in
              </h2>

              <p class="mt-2 text-sm text-white/40">
                Masukkan password untuk melanjutkan.
              </p>
            </div>

            <form action="/admin/login" method="POST" class="space-y-6">
              <div>
                <label
                  for="password"
                  class="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/45"
                >
                  Password
                </label>

                <div class="relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    autocomplete="current-password"
                    class="h-12 w-full border-b border-white/20 bg-transparent px-0 pr-10 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-white"
                    required
                  />

                  <button
                    type="button"
                    id="toggle-password"
                    aria-label="Tampilkan password"
                    class="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-white/35 transition-colors hover:text-white"
                  >
                    <svg
                      id="eye-open"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      class="h-[18px] w-[18px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6S2.25 12 2.25 12Z"
                      />
                      <circle cx="12" cy="12" r="2.75" />
                    </svg>

                    <svg
                      id="eye-closed"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      class="hidden h-[18px] w-[18px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3l18 18"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.58 10.58a2 2 0 0 0 2.84 2.84"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.88 5.24A10.6 10.6 0 0 1 12 5c6 0 9.75 7 9.75 7a18.5 18.5 0 0 1-3.17 3.83"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {error && (
                <div class="border-l border-red-500/70 pl-3">
                  <p class="text-xs leading-5 text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                class="group flex h-12 w-full items-center justify-between border border-white/20 px-4 text-sm font-medium transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
              >
                <span>Continue</span>

                <span class="text-lg transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </section>
        </div>
      </div>

      <script>
        {`
          (() => {
            const button = document.getElementById("toggle-password");
            const input = document.getElementById("password");
            const eyeOpen = document.getElementById("eye-open");
            const eyeClosed = document.getElementById("eye-closed");

            if (!button || !input || !eyeOpen || !eyeClosed) {
              return;
            }

            button.addEventListener("click", () => {
              const visible = input.type === "text";

              input.type = visible ? "password" : "text";

              eyeOpen.classList.toggle("hidden", !visible);
              eyeClosed.classList.toggle("hidden", visible);

              button.setAttribute(
                "aria-label",
                visible
                  ? "Tampilkan password"
                  : "Sembunyikan password"
              );
            });
          })();
        `}
      </script>
    </main>
  </Layout>
);
