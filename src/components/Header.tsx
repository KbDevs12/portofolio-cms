import { Html } from "@elysiajs/html";
export const Header = () => (
  <header class="h-16 border-b border-paper/10">
    <div class="flex h-full items-center justify-between px-6 lg:px-8">
      <p class="font-mono text-[12px] text-paper/35">admin panel</p>

      <div class="flex items-center gap-3">
        <div class="hidden text-right sm:block">
          <p class="text-sm font-medium">Aditya Putra Perdana</p>
          <p class="font-mono text-[11px] text-paper/35">administrator</p>
        </div>

        <div class="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-xs font-medium text-accent">
          AP
        </div>
      </div>
    </div>
  </header>
);
