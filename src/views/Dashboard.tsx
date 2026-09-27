import { Html } from "@elysiajs/html";
import { StatCard } from "../components/StatCard";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";

import dayFormat from "../util/dayFormat";

export const DashboardPage = () => (
  <div>
    <section class="mb-10">
      <p class="font-mono text-[12px] text-paper/35">{dayFormat(new Date())}</p>

      <h1 class="mt-2 text-2xl font-medium tracking-tight text-paper">
        Ringkasan portofolio
      </h1>

      <p class="mt-2 max-w-xl text-sm leading-6 text-paper/50">
        Kelola profil, proyek, dan pengalaman yang tampil di portofolio Anda.
      </p>
    </section>

    <section class="mb-12 flex divide-x divide-paper/10 border-y border-paper/10">
      <StatCard
        label="profil"
        value="01"
        description="profil aktif"
        href="/admin/profil"
      />

      <StatCard
        label="proyek"
        value="06"
        description="proyek tersimpan"
        href="/admin/projects"
      />

      <StatCard
        label="pengalaman"
        value="03"
        description="riwayat kerja"
        href="/admin/experience"
      />
    </section>

    <section class="mt-12">
      <SectionHeader title="Proyek terbaru" href="/admin/projects" />

      <div>
        <div class="hidden grid-cols-[1fr_150px_130px] px-1 py-2 font-mono text-[11px] text-paper/30 sm:grid">
          <span>proyek</span>
          <span>status</span>
          <span>dibuat</span>
        </div>

        <a
          href="/admin/projects"
          class="grid gap-3 border-t border-paper/10 px-1 py-4 transition hover:bg-paper/5 sm:grid-cols-[1fr_150px_130px] sm:items-center"
        >
          <div>
            <p class="text-sm font-medium text-paper">Website Portofolio</p>

            <p class="mt-1 text-xs text-paper/35">Website pribadi dan CMS</p>
          </div>

          <StatusBadge status="Dalam proses" />

          <span class="font-mono text-xs text-paper/35">26 Sep 2026</span>
        </a>

        <a
          href="/admin/projects"
          class="grid gap-3 border-t border-paper/10 px-1 py-4 transition hover:bg-paper/5 sm:grid-cols-[1fr_150px_130px] sm:items-center"
        >
          <div>
            <p class="text-sm font-medium text-paper">Kantongin</p>

            <p class="mt-1 text-xs text-paper/35">Aplikasi dompet digital</p>
          </div>

          <StatusBadge status="Selesai" />

          <span class="font-mono text-xs text-paper/35">20 Sep 2026</span>
        </a>
      </div>
    </section>

    <section class="mt-12 pb-12">
      <SectionHeader title="Pengalaman terbaru" href="/admin/experience" />

      <div class="border-t border-paper/10">
        <div class="grid gap-1 border-b border-paper/10 py-4 sm:grid-cols-[1fr_180px]">
          <div>
            <p class="text-sm font-medium text-paper">Website Programmer</p>

            <p class="mt-1 text-sm text-paper/50">Edzillen</p>
          </div>

          <p class="font-mono text-xs text-paper/35 sm:text-right">
            Jan 2025 — Mar 2025
          </p>
        </div>
      </div>
    </section>
  </div>
);
