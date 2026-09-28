import { Html } from "@elysiajs/html";
import { Button } from "../../components/Button";
import type { Project } from "../../types";

interface ProjectFormProps {
  mode?: "create" | "edit";
  project?: Project;
}

export const ProjectForm = ({ mode = "create", project }: ProjectFormProps) => {
  const isEdit = mode === "edit";

  const action = isEdit
    ? `/admin/projects/${project?.id}/edit`
    : "/admin/projects";

  return (
    <section>
      <section class="mb-8">
        <p class="font-mono text-[12px] text-paper/35">proyek</p>

        <h1 class="mt-2 text-2xl font-medium tracking-tight text-paper">
          {isEdit ? "Edit proyek" : "Tambah proyek baru"}
        </h1>
      </section>

      <form action={action} method="POST" class="max-w-xl space-y-6">
        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            judul proyek
          </label>

          <input
            type="text"
            name="title"
            required
            value={project?.title ?? ""}
            class="h-11 w-full border-b border-paper/20 bg-transparent px-0 text-sm text-paper outline-none transition-colors placeholder:text-paper/20 focus:border-accent"
            placeholder="Contoh: Sistem Pembayaran Terintegrasi"
          />
        </div>

        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            slug url
          </label>

          <input
            type="text"
            name="slug"
            required
            value={project?.slug ?? ""}
            class="h-11 w-full border-b border-paper/20 bg-transparent px-0 text-sm text-paper outline-none transition-colors placeholder:text-paper/20 focus:border-accent"
            placeholder="contoh: sistem-pembayaran-terintegrasi"
          />
        </div>

        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            ringkasan
          </label>

          <textarea
            name="summary"
            rows="3"
            class="w-full resize-none border-b border-paper/20 bg-transparent px-0 py-2 text-sm leading-6 text-paper outline-none transition-colors placeholder:text-paper/20 focus:border-accent"
            placeholder="Deskripsi singkat proyek..."
          >
            {project?.summary ?? ""}
          </textarea>
        </div>

        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            status
          </label>

          <div class="relative">
            <select
              name="status"
              class="h-11 w-full appearance-none border-b border-paper/20 bg-transparent px-0 pr-8 text-sm text-paper outline-none transition-colors focus:border-accent"
            >
              <option
                class="bg-ink"
                value="Dalam proses"
                selected={project?.status === "Dalam proses"}
              >
                Dalam proses
              </option>

              <option
                class="bg-ink"
                value="Selesai"
                selected={project?.status === "Selesai"}
              >
                Selesai
              </option>

              <option
                class="bg-ink"
                value="Pemeliharaan"
                selected={project?.status === "Pemeliharaan"}
              >
                Pemeliharaan
              </option>
            </select>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              class="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/35"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div class="flex justify-end gap-6 pt-4">
          <Button href="/admin/projects" variant="destructive">
            Batal
          </Button>

          <Button type="submit" variant="primary">
            {isEdit ? "Simpan perubahan" : "Simpan proyek"}
          </Button>
        </div>
      </form>
    </section>
  );
};
