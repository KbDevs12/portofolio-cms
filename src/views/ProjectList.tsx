import { Html } from "@elysiajs/html";
import { DashboardLayout } from "./layout/DashboardLayout";
import { StatusBadge } from "../components/StatusBadge";
import type { Project } from "../types";

interface ProjectProps {
  projects: Project[];
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const ProjectList = ({ projects }: ProjectProps) => (
  <section>
    <section class="mb-10 flex items-end justify-between">
      <div>
        <p class="font-mono text-[12px] text-paper/35">proyek</p>

        <h1 class="mt-2 text-2xl font-medium tracking-tight text-paper">
          Daftar proyek
        </h1>
      </div>

      <a
        href="/admin/projects/new"
        class="flex h-10 items-center border border-paper/20 px-4 font-mono text-xs transition-colors hover:border-accent hover:bg-accent hover:text-ink"
      >
        + Tambah proyek
      </a>
    </section>

    <section>
      <div class="hidden grid-cols-[1fr_120px_140px_170px] border-b border-paper/10 px-1 py-2 font-mono text-[11px] text-paper/30 sm:grid">
        <span>judul</span>
        <span>status</span>
        <span>dibuat</span>
        <span>aksi</span>
      </div>

      {projects.length === 0 ? (
        <p class="border-b border-paper/10 py-6 text-center text-sm text-paper/35">
          Belum ada proyek.
        </p>
      ) : (
        projects.map((p) => (
          <div class="grid gap-2 border-b border-paper/10 px-1 py-4 transition hover:bg-paper/5 sm:grid-cols-[1fr_120px_140px_170px] sm:items-center">
            <p class="text-sm font-medium text-paper">{p.title}</p>

            <StatusBadge status={p.status} />

            <span class="font-mono text-xs text-paper/35">
              {formatDate(p.created_at)}
            </span>

            <div class="flex items-center gap-3">
              <a
                href={`/admin/projects/${p.id}/aspects`}
                class="text-xs text-paper/40 transition hover:text-accent"
              >
                Kelola aspek
              </a>

              <form
                action={`/admin/projects/${p.id}/delete`}
                method="POST"
                class="inline"
              >
                <button
                  type="submit"
                  class="text-xs text-red-400/70 transition hover:text-red-400"
                  onclick="return confirm('Yakin hapus proyek ini?')"
                >
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </section>

    <div class="mt-8">
      <a
        href="/admin/dashboard"
        class="flex items-center gap-1 text-sm text-paper/40 transition hover:text-accent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          class="h-3 w-3"
        >
          <path
            d="M15 6l-6 6 6 6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Kembali ke dashboard
      </a>
    </div>
  </section>
);
