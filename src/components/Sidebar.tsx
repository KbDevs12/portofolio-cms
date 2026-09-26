import { Html } from "@elysiajs/html";
export const Sidebar = () => (
  <aside class="hidden w-60 shrink-0 border-r border-white/10 md:block">
    <div class="sticky top-0 flex h-screen flex-col">
      <div class="flex h-16 items-center border-b border-white/10 px-6">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-bold text-black">
            AP
          </div>

          <div>
            <p class="text-sm font-semibold">Portofolio</p>

            <p class="text-[10px] text-white/30">Content Manager</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-3 py-6">
        <p class="mb-3 px-3 text-[10px] font-medium uppercase tracking-widest text-white/30">
          Menu
        </p>

        <div class="space-y-1">
          <a
            href="/admin"
            class="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 text-sm font-medium"
          >
            <span class="w-4 text-center text-white/60">◈</span>
            Dashboard
          </a>

          <a
            href="/admin/profile"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <span class="w-4 text-center">○</span>
            Profil
          </a>

          <a
            href="/admin/projects"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <span class="w-4 text-center">□</span>
            Proyek
          </a>

          <a
            href="/admin/experience"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <span class="w-4 text-center">◇</span>
            Pengalaman
          </a>
        </div>

        <div class="my-7 border-t border-white/10" />

        <p class="mb-3 px-3 text-[10px] font-medium uppercase tracking-widest text-white/30">
          Lainnya
        </p>

        <a
          href="/admin/settings"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
        >
          <span class="w-4 text-center">⚙</span>
          Pengaturan
        </a>
      </nav>

      <div class="border-t border-white/10 p-4">
        <p class="text-xs text-white/30">CMS Portofolio</p>

        <p class="mt-1 text-[10px] text-white/20">Versi 1.0.0</p>
      </div>
    </div>
  </aside>
);
