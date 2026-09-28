import { Html } from "@elysiajs/html";
import { StatusBadge } from "../../components/StatusBadge";
import { formatDate, formatDateV2 } from "../../util/dayFormat";
import type { Experience } from "../../types";
import { Button } from "../../components/Button";

interface ExperienceListProps {
  experiences: Experience[];
}

export const ExperienceList = ({ experiences }: ExperienceListProps) => (
  <section>
    <section class="mb-10 flex items-end justify-between gap-4">
      <div>
        <p class="font-mono text-[12px] text-paper/35">pengalaman</p>

        <h1 class="mt-2 text-2xl font-medium tracking-tight text-paper">
          Daftar pengalaman
        </h1>
      </div>

      <Button href="/admin/experiences/new" variant="primary">
        + Tambah Pengalaman
      </Button>
    </section>

    <section>
      <div class="hidden min-w-[1000px] grid-cols-[1.2fr_1fr_120px_120px_100px_130px_2fr_120px_50px] border-b border-paper/10 px-1 py-2 font-mono text-[11px] text-paper/30 sm:grid">
        <span>Perusahaan</span>
        <span>Pekerjaan</span>
        <span>Mulai</span>
        <span>Selesai</span>
        <span>Saat ini</span>
        <span>Gambar</span>
        <span>Deskripsi</span>
        <span>Dibuat</span>
        <span></span>
      </div>

      {experiences.length === 0 ? (
        <p class="border-b border-paper/10 py-6 text-center text-sm text-paper/35">
          Belum ada pengalaman.
        </p>
      ) : (
        experiences.map((exp) => (
          <div class="grid min-w-[1000px] gap-2 border-b border-paper/10 px-1 py-4 transition hover:bg-paper/5 sm:grid-cols-[1.2fr_1fr_120px_120px_100px_130px_2fr_120px_50px] sm:items-center">
            <p class="min-w-0 truncate text-sm font-medium text-paper">
              {exp.company_name}
            </p>

            <p class="min-w-0 truncate text-sm text-paper/70">
              {exp.job_title}
            </p>

            <span class="font-mono text-xs text-paper/35">
              {formatDateV2(exp.start_date)}
            </span>

            <span class="font-mono text-xs text-paper/35">
              {exp.end_date ? formatDateV2(exp.end_date) : "-"}
            </span>

            <div>
              <StatusBadge status={exp.is_current ? "Saat ini" : "Selesai"} />
            </div>

            <div class="text-xs">
              {exp.thumbnail_url ? (
                <a
                  href={exp.thumbnail_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-accent transition hover:opacity-70"
                >
                  Lihat gambar
                </a>
              ) : (
                <span class="font-mono text-paper/25">tidak ada</span>
              )}
            </div>

            <p
              class="min-w-0 truncate font-mono text-xs text-paper/35"
              title={exp.description as string}
            >
              {exp.description || "-"}
            </p>

            <span class="font-mono text-xs text-paper/35">
              {formatDate(exp.created_at as string)}
            </span>

            <div class="flex justify-start sm:justify-end">
              <details class="relative">
                <summary
                  class="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-md text-lg leading-none text-paper/40 transition hover:bg-paper/10 hover:text-paper [&::-webkit-details-marker]:hidden"
                  title="Menu"
                >
                  ⋮
                </summary>

                <div class="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-lg border border-paper/10 bg-ink shadow-xl">
                  <a
                    href={`/admin/experiences/${exp.id}/edit`}
                    class="block px-3 py-2.5 text-sm text-paper/70 transition hover:bg-paper/5 hover:text-paper"
                  >
                    Edit
                  </a>

                  <div class="border-t border-paper/10" />

                  <form
                    action={`/admin/experiences/${exp.id}/delete`}
                    method="POST"
                  >
                    <button
                      type="submit"
                      class="w-full px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-400/10"
                      onclick="return confirm('Yakin hapus pengalaman ini?')"
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
