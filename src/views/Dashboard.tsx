import { Html } from "@elysiajs/html";
import { Layout } from "./Layout";

import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { StatCard } from "../components/StatCard";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";

export const DashboardPage = () => (
  <Layout title="Dashboard">
    <div class="min-h-screen">
      <div class="mx-auto flex">
        <Sidebar />

        <div class="min-w-0 flex-1">
          <Header />

          <main class="px-6 py-10 lg:px-8">
            <section class="mb-10">
              <p class="text-[10px] font-medium uppercase tracking-widest text-white/30">
                Dasbor
              </p>

              <h1 class="mt-2 text-3xl font-semibold tracking-tight">
                Selamat datang kembali.
              </h1>

              <p class="mt-2 max-w-xl text-sm leading-6 text-white/40">
                Kelola informasi profil, proyek, dan pengalaman yang ditampilkan
                pada portofolio Anda.
              </p>
            </section>

            <section class="grid overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
              <StatCard
                label="Profil"
                value="01"
                description="profil aktif"
                href="/admin/profile"
              />

              <StatCard
                label="Proyek"
                value="06"
                description="proyek tersimpan"
                href="/admin/projects"
              />

              <StatCard
                label="Pengalaman"
                value="03"
                description="riwayat pekerjaan"
                href="/admin/experience"
              />
            </section>

            <section class="mt-12">
              <SectionHeader
                eyebrow="Portofolio"
                title="Proyek terbaru"
                href="/admin/projects"
              />

              <div class="overflow-hidden rounded-xl border border-white/10">
                <div class="hidden grid-cols-[1fr_150px_130px] border-b border-white/10 px-5 py-3 text-[10px] uppercase tracking-widest text-white/30 sm:grid">
                  <span>Proyek</span>

                  <span>Status</span>

                  <span>Dibuat</span>
                </div>

                <a
                  href="/admin/projects"
                  class="grid gap-3 border-b border-white/10 px-5 py-4 transition last:border-0 hover:bg-white/[0.025] sm:grid-cols-[1fr_150px_130px] sm:items-center"
                >
                  <div>
                    <p class="text-sm font-medium">Website Portofolio</p>

                    <p class="mt-1 text-xs text-white/30">
                      Website pribadi dan CMS
                    </p>
                  </div>

                  <StatusBadge status="Dalam proses" />

                  <span class="text-xs text-white/30">26 Sep 2026</span>
                </a>

                <a
                  href="/admin/projects"
                  class="grid gap-3 border-b border-white/10 px-5 py-4 transition last:border-0 hover:bg-white/[0.025] sm:grid-cols-[1fr_150px_130px] sm:items-center"
                >
                  <div>
                    <p class="text-sm font-medium">Kantongin</p>

                    <p class="mt-1 text-xs text-white/30">
                      Aplikasi dompet digital
                    </p>
                  </div>

                  <StatusBadge status="Selesai" />

                  <span class="text-xs text-white/30">20 Sep 2026</span>
                </a>
              </div>
            </section>

            <section class="mt-12 pb-12">
              <SectionHeader
                eyebrow="Karier"
                title="Pengalaman terbaru"
                href="/admin/experience"
              />

              <div class="border-l border-white/10 pl-6">
                <div class="relative">
                  <span class="absolute -left-[29px] top-1.5 h-1.5 w-1.5 rounded-full bg-white" />

                  <p class="text-sm font-medium">Website Programmer</p>

                  <p class="mt-1 text-sm text-white/50">Edzillen</p>

                  <p class="mt-2 text-xs text-white/30">
                    Januari 2025 — Maret 2025
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  </Layout>
);
