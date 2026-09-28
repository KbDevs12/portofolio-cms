import { Html } from "@elysiajs/html";
import type { Profile } from "../types";
import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";

type ProfileFormProps = {
  profile?: Profile | null;
  action?: string;
};

function formatUpdatedAt(value: string | null | undefined): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });
}

const SectionHeading = ({ index, title }: { index: string; title: string }) => (
  <div class="mb-5 border-b border-paper/10 pb-3">
    <p class="font-mono text-xs uppercase tracking-widest text-accent">
      {index}
    </p>
    <h2 class="font-serif text-2xl font-medium text-paper">{title}</h2>
  </div>
);

export const ProfileForm = ({
  profile,
  action = "/admin/profile",
}: ProfileFormProps) => {
  const updatedAt = formatUpdatedAt(profile?.updated_at);

  return (
    <form
      method="post"
      action={action}
      class="mx-auto flex max-w-3xl flex-col gap-8"
    >
      {profile?.id && <input type="hidden" value={profile?.id} />}
      <section class="rounded-xl border border-paper/10 p-6">
        <SectionHeading index="01" title="Profil" />

        <div class="grid gap-5 md:grid-cols-2">
          <TextField
            name="full_name"
            label="Nama lengkap"
            value={profile?.full_name}
            placeholder="Nama Anda"
            required
          />
          <TextField
            name="headline"
            label="Headline"
            value={profile?.headline}
            placeholder="Backend Developer"
          />

          <div class="md:col-span-2">
            <TextArea
              name="bio"
              label="Bio"
              value={profile?.bio}
              rows={"5"}
              placeholder="Ceritakan singkat tentang diri Anda"
            />
          </div>

          <div class="md:col-span-2">
            <TextField
              name="email"
              label="Email"
              type="email"
              value={profile?.email}
              placeholder="nama@email.com"
            />
          </div>

          <TextField
            name="github_url"
            label="GitHub"
            type="url"
            value={profile?.github_url}
            placeholder="https://github.com/username"
          />
          <TextField
            name="linkedin_url"
            label="LinkedIn"
            type="url"
            value={profile?.linkedin_url}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </section>

      <section class="rounded-xl border border-paper/10 p-6">
        <SectionHeading index="02" title="SEO" />

        <div class="flex flex-col gap-5">
          <TextField
            name="meta_title"
            label="Meta title"
            value={profile?.meta_title}
            placeholder="Judul yang tampil di hasil pencarian"
            recommended={60}
          />
          <TextArea
            name="meta_description"
            label="Meta description"
            value={profile?.meta_description}
            rows={"3"}
            placeholder="Ringkasan singkat halaman portofolio Anda"
            recommended={160}
          />
          <TextField
            name="meta_keywords"
            label="Meta keywords"
            value={profile?.meta_keywords}
            placeholder="backend, elysia, bun, portofolio"
            hint="Pisahkan dengan koma."
          />
        </div>
      </section>

      <div class="flex items-center justify-between gap-4">
        <p class="font-mono text-xs text-paper/40" safe>
          {updatedAt
            ? `Terakhir diperbarui: ${updatedAt}`
            : "Belum pernah disimpan"}
        </p>

        <button
          type="submit"
          class="rounded-lg bg-accent px-5 py-2 font-mono text-sm font-medium text-ink transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Simpan perubahan
        </button>
      </div>
    </form>
  );
};
