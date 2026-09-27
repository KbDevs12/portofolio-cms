import { Html } from "@elysiajs/html";
import type { Project, ProjectAspects } from "../../types";

interface ProjectAspectsProps {
  project: Project;
  aspects: ProjectAspects[];
}

export const ProjectAspectsPage = ({
  project,
  aspects,
}: ProjectAspectsProps) => (
  <section class="mx-auto">
    <div class="flex justify-between mb-10 items-end">
      <div>
        <h1 class="mt-2 text-2xl font-medium tracking-tight text-paper">
          Kelola Aspek Proyek
        </h1>
        <p class="font-mono text-[12px] text-paper/35">
          Proyek: <span class="font-semibold">{project.title}</span>
        </p>
      </div>
      <a
        href="/admin/dashboard"
        class="flex items-center gap-1 text-sm text-paper/40 transition hover:text-accent"
      >
        Kembali ke Dashboard
      </a>
    </div>
    <section class="mb-10">
      <h2 class="text-2xl font-semibold border-b border-paper/10 pb-2">
        Aspek / Role saat ini
      </h2>
      {aspects.length === 0 ? (
        <p class="text-paper/35 text-center mt-[80px]">
          Belum ada aspek. Silahkan tambah dibawah
        </p>
      ) : (
        <div class="space-y-4">
          {aspects.map((item, _) => (
            <div class="flex justify-between items-start border border-paper/10 p-4 rounded ">
              <div id={_}>
                <h3 class="font-bold text-lg">{item.aspect_title}</h3>
                <p class="text-sm text-paper/40 mb-2">{item.description}</p>
                <div class="flex gap-2 text-xs">
                  {item.tech_stack.map((tech, _) => (
                    <span
                      id={_}
                      class="bg-accent text-paper px-2 py-1 rounded-2xl hover:opacity-65 transition duration-300 ease-in hover:cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <form
                action={`/admin/projects/${project.id}/aspects/${item.id}/delete`}
                method="POST"
              >
                <button
                  type="submit"
                  class="text-red-600 hover:underline text-sm"
                  onclick="return confirm('Hapus aspek ini?')"
                >
                  Hapus
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-4 border-b border-paper/10 pb-2">
        Tambah Aspek Baru
      </h2>
      <form
        action={`/admin/projects/${project.id}/aspects`}
        method="POST"
        class="space-y-4 max-w-2xl"
      >
        <div>
          <label class="block text-sm font-medium mb-1">
            Judul Aspek / Role
          </label>
          <input
            type="text"
            name="aspect_title"
            required
            class="w-full border border-paper/10 p-2 rounded"
            placeholder="Contoh: Cross-Platform Mobile App"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Deskripsi Tugas</label>
          <textarea
            name="description"
            required
            rows="3"
            class="w-full border border-paper/10 p-2 rounded"
            placeholder="Deskripsi teknis pengerjaan..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Tech Stack (Pisahkan dengan Koma)
          </label>

          <input
            type="text"
            name="tech_stack"
            required
            class="w-full border border-paper/10 p-2 rounded"
            placeholder="Contoh: Flutter, Dart, BLoC"
          />
        </div>

        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">
              Repository URL (Opsional)
            </label>
            <input
              type="url"
              name="repo_url"
              class="w-full border border-paper/10 p-2 rounded"
              placeholder="https://github.com/..."
            />
          </div>
          <div class="w-32">
            <label class="block text-sm font-medium mb-1">Urutan Tampil</label>
            <input
              type="number"
              name="sort_order"
              value="1"
              required
              class="w-full border border-paper/10 p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          class="bg-accent text-paper px-4 py-2 rounded hover:bg-accent/50 transition duration-300 mt-2"
        >
          Simpan Aspek
        </button>
      </form>
    </section>
  </section>
);
