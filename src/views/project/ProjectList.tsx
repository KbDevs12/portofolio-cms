import { Html } from "@elysiajs/html";
import { StatusBadge } from "../../components/StatusBadge";
import { formatDate } from "../../util/dayFormat";
import type { Project } from "../../types";
import { Button } from "../../components/Button";

interface ProjectProps {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectProps) => (
  <section>
    <section class="mb-10 flex items-end justify-between">
      <div>
        <p class="font-mono text-[12px] text-paper/35">proyek</p>

        <h1 class="mt-2 text-2xl font-medium tracking-tight text-paper">
          Daftar proyek
        </h1>
      </div>

      <Button href="/admin/projects/new" variant="primary">
        + Tambah proyek
      </Button>
    </section>

    <section>
      <div class="hidden grid-cols-[1fr_120px_140px_50px] border-b border-paper/10 px-1 py-2 font-mono text-[11px] text-paper/30 sm:grid">
        <span>judul</span>
        <span>status</span>
        <span>dibuat</span>
        <span></span>
      </div>

      {projects.length === 0 ? (
        <p class="border-b border-paper/10 py-6 text-center text-sm text-paper/35">
          Belum ada proyek.
        </p>
      ) : (
        projects.map((p) => (
          <div class="grid gap-2 border-b border-paper/10 px-1 py-4 transition hover:bg-paper/5 sm:grid-cols-[1fr_120px_140px_50px] sm:items-center">
            <p class="text-sm font-medium text-paper">{p.title}</p>

            <StatusBadge status={p.status} />

            <span class="font-mono text-xs text-paper/35">
              {formatDate(p.created_at)}
            </span>

            <div class="flex justify-start sm:justify-end">
              <details class="relative">
                <summary
                  class="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-md text-lg leading-none text-paper/40 transition hover:bg-paper/10 hover:text-paper [&::-webkit-details-marker]:hidden"
                  title="Menu"
                >
                  ⋮
                </summary>

                <div class="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-lg border border-paper/10 bg-ink shadow-xl">
                  <a
                    href={`/admin/projects/${p.id}/aspects`}
                    class="block px-3 py-2.5 text-sm text-paper/70 transition hover:bg-paper/5 hover:text-paper"
                  >
                    Kelola Aspek
                  </a>

                  <a
                    href={`/admin/projects/${p.id}/edit`}
                    class="block px-3 py-2.5 text-sm text-paper/70 transition hover:bg-paper/5 hover:text-paper"
                  >
                    Edit
                  </a>

                  <div class="border-t border-paper/10" />

                  <form action={`/admin/projects/${p.id}/delete`} method="POST">
                    <button
                      type="submit"
                      class="w-full px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-400/10"
                      onclick="return confirm('Yakin hapus proyek ini?')"
                    >
                      Hapus
                    </button>
                  </form>
                </div>
              </details>
            </div>
          </div>
        ))
      )}
    </section>

    <div class="mt-8 w-fit">
      <Button href="/admin/dashboard" variant="secondary">
        Kembali ke dashboard
      </Button>
    </div>
  </section>
);
