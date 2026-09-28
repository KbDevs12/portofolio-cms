import { Html } from "@elysiajs/html";

export const Sidebar = ({ pathname }: { pathname: string }) => {
  const navItem = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: `<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="h-4 w-4 shrink-0"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>`,
    },
    {
      label: "Profil",
      href: "/admin/profil",
      icon: `<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="h-4 w-4 shrink-0"
              >
                <circle cx="12" cy="8" r="3.2" />
                <path
                  d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
                  stroke-linecap="round"
                />
              </svg>`,
    },
    {
      label: "Proyek",
      href: "/admin/projects",
      icon: `<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="h-4 w-4 shrink-0"
              >
                <path
                  d="M3 6.5a1 1 0 0 1 1-1h5l1.6 2H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11Z"
                  stroke-linejoin="round"
                />
              </svg>`,
    },
    {
      label: "Pengalaman",
      href: "/admin/experiences",
      icon: `<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="h-4 w-4 shrink-0"
              >
                <rect x="3" y="8" width="18" height="11" rx="1.2" />
                <path
                  d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"
                  stroke-linecap="round"
                />
                <path d="M3 13h18" />
              </svg>`,
    },
  ];

  return (
    <aside class="hidden w-60 shrink-0 border-r border-paper/10 md:block">
      <div class="sticky top-0 flex h-screen flex-col">
        <div class="flex h-16 items-center border-b border-paper/10 px-6">
          <div>
            <p class="font-mono text-[13px] tracking-tight text-paper">
              portofolio<span class="text-accent">.cms</span>
            </p>
            <p class="mt-0.5 text-[11px] text-paper/35">Panel konten</p>
          </div>
        </div>

        <nav class="flex-1 px-3 py-6">
          <div class="space-y-0.5">
            {navItem.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <a
                  href={item.href}
                  class={
                    active
                      ? "flex items-center gap-3 border-l-2 border-accent bg-paper/5 px-3 py-2.5 text-sm text-paper"
                      : "flex items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm text-paper/45 transition hover:border-paper/20 hover:text-paper"
                  }
                >
                  {item.icon}
                  <span class="font-mono text-[13px]">{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>

        <div class="border-t border-paper/10 p-4">
          <form action="/admin/logout" method="POST">
            <button
              type="submit"
              class={
                "font-mono text-[11px] text-paper/30 transition duration-300 hover:text-red-500"
              }
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};
