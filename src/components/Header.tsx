import { Html } from "@elysiajs/html";
export const Header = () => (
  <header class="h-16 border-b border-white/10">
    <div class="flex h-full items-center justify-between px-6 lg:px-8">
      <div>
        <p class="text-xs text-white/30">CMS Portofolio</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden text-right sm:block">
          <p class="text-sm font-medium">Aditya Putra Perdana</p>

          <p class="text-[11px] text-white/30">Administrator</p>
        </div>

        <div class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium">
          AP
        </div>
      </div>
    </div>
  </header>
);
