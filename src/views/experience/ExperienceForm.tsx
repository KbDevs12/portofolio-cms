import { Html } from "@elysiajs/html";
import type { Experience } from "../../types";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { DatePicker } from "../../components/DatePicker";

interface ExperienceFormProps {
  mode?: "create" | "edit";
  experience?: Experience;
}

export const ExperienceForm = ({
  mode = "create",
  experience,
}: ExperienceFormProps) => {
  const isEdit = mode === "edit";

  const action = isEdit
    ? `/admin/experiences/${experience?.id}/edit`
    : "/admin/experiences";

  const isCurrent = experience?.is_current ?? false;

  return (
    <section>
      <section class="mb-8">
        <p class="font-mono text-[12px] text-paper/35">pengalaman</p>

        <h1 class="mt-2 text-2xl font-medium tracking-tight text-paper">
          {isEdit ? "Edit pengalaman" : "Tambah pengalaman baru"}
        </h1>
      </section>

      <form action={action} method="POST" class="max-w-xl space-y-7">
        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            nama perusahaan
          </label>

          <input
            type="text"
            name="company_name"
            required
            value={experience?.company_name ?? ""}
            class="h-11 w-full border-b border-paper/20 bg-transparent px-0 text-sm text-paper outline-none transition-colors placeholder:text-paper/20 focus:border-accent"
            placeholder="Contoh: PT Teknologi Indonesia"
          />
        </div>

        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            posisi / pekerjaan
          </label>

          <input
            type="text"
            name="job_title"
            required
            value={experience?.job_title ?? ""}
            class="h-11 w-full border-b border-paper/20 bg-transparent px-0 text-sm text-paper outline-none transition-colors placeholder:text-paper/20 focus:border-accent"
            placeholder="Contoh: Software Engineer"
          />
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <DatePicker
            name="start_date"
            label="tanggal mulai"
            value={experience?.start_date ?? ""}
            required
          />

          <DatePicker
            name="end_date"
            label="tanggal selesai"
            value={experience?.end_date ?? ""}
          />
        </div>

        <div class="pt-1">
          <Checkbox
            name="is_current"
            value="true"
            label="Saya masih bekerja di perusahaan ini"
            checked={isCurrent}
          />

          <p class="mt-2 font-mono text-[11px] leading-5 text-paper/30">
            Centang jika pengalaman ini masih berlangsung.
          </p>
        </div>

        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            url gambar
          </label>

          <input
            type="url"
            name="thumbnail_url"
            value={experience?.thumbnail_url ?? ""}
            class="h-11 w-full border-b border-paper/20 bg-transparent px-0 text-sm text-paper outline-none transition-colors placeholder:text-paper/20 focus:border-accent"
            placeholder="https://example.com/company.jpg"
          />

          <p class="mt-2 font-mono text-[11px] text-paper/30">
            URL gambar perusahaan atau pengalaman kerja.
          </p>
        </div>

        <div>
          <label class="mb-2 block font-mono text-xs text-paper/45">
            deskripsi
          </label>

          <textarea
            name="description"
            rows="5"
            class="w-full resize-none border-b border-paper/20 bg-transparent px-0 py-2 text-sm leading-6 text-paper outline-none transition-colors placeholder:text-paper/20 focus:border-accent"
            placeholder="Jelaskan pekerjaan, tanggung jawab, atau kontribusi..."
          >
            {experience?.description ?? ""}
          </textarea>
        </div>

        <div class="flex justify-end gap-6 pt-4">
          <Button href="/admin/experiences" variant="destructive">
            Batal
          </Button>

          <Button type="submit" variant="primary">
            {isEdit ? "Simpan perubahan" : "Simpan pengalaman"}
          </Button>
        </div>
      </form>
      <script>
        {`
    document.addEventListener("DOMContentLoaded", function () {
      const checkbox = document.getElementById("is_current");
      const endDateWrapper = document.getElementById("end_date_wrapper");

      if (checkbox && endDateWrapper && window.DatePicker) {
        // sinkronkan state awal (mode edit, kalau is_current sudah true saat load)
        window.DatePicker.setDisabled(endDateWrapper, checkbox.checked);

        checkbox.addEventListener("change", function () {
          window.DatePicker.setDisabled(endDateWrapper, checkbox.checked);
        });
      }
    });
  `}
      </script>
    </section>
  );
};
