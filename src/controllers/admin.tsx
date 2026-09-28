import { Elysia, t, redirect } from "elysia";
import { Html } from "@elysiajs/html";
import { setup } from "../setup";
import { supabase } from "../db/supabase";
import { verifyPassword } from "../lib/auth";
import { LoginPage } from "../views/Login";
import { DashboardPage } from "../views/Dashboard";
import { ProjectList } from "../views/project/ProjectList";
import { ProjectForm } from "../views/project/ProjectForm";
import { DashboardLayout } from "../views/layout/DashboardLayout";
import { ProjectAspectsPage } from "../views/project/ProjectAspect";
import { ExperienceList } from "../views/experience/ExperienceList";
import { ExperienceForm } from "../views/experience/ExperienceForm";

const getPathname = (request: Request) => new URL(request.url).pathname;

export const adminController = new Elysia({ prefix: "/admin" })
  .use(setup)
  .get("/login", ({ cookie: { auth } }) => {
    if (auth.value) {
      return redirect("/admin/dashboard");
    }
    return <LoginPage />;
  })

  .post("/login", async ({ request, jwt, cookie: { auth } }) => {
    const formData = await request.formData();

    const password = formData.get("password");

    if (typeof password !== "string" || !password) {
      return <LoginPage error="Password wajib diisi!" />;
    }

    const valid = await verifyPassword(password, process.env.ADMIN_PASSWORD!);

    if (!valid) {
      return <LoginPage error="Password Salah!" />;
    }

    const token = await jwt.sign({
      for: "admin",
    });

    auth.set({
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 86400,
      path: "/",
    });

    return redirect("/admin/dashboard");
  })

  .post("/logout", ({ cookie: { auth } }) => {
    auth.remove();
    return redirect("/admin/login");
  })

  .guard(
    {
      async beforeHandle({ jwt, cookie: { auth } }) {
        const profile = await jwt.verify(auth.value as string);

        if (!profile) {
          return redirect("/admin/login");
        }
      },
    },
    (app) =>
      app
        .get("/dashboard", ({ request }) => {
          const pathname = getPathname(request);

          return (
            <DashboardLayout title="Dashboard" pathname={pathname}>
              <DashboardPage />
            </DashboardLayout>
          );
        })

        .get("/projects", async ({ request }) => {
          const pathname = getPathname(request);
          const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) return <DashboardPage />;

          return (
            <DashboardLayout title="Proyek" pathname={pathname}>
              <ProjectList projects={data} />
            </DashboardLayout>
          );
        })

        .get("/projects/new", ({ request }) => {
          const pathname = getPathname(request);

          return (
            <DashboardLayout title="Proyek Form" pathname={pathname}>
              <ProjectForm />
            </DashboardLayout>
          );
        })

        .post(
          "/projects",
          async ({ body }) => {
            const { title, slug, summary, status } = body;

            const { error: insertError } = await supabase
              .from("projects")
              .insert([{ title, slug, summary, status }])
              .select("");

            if (insertError) {
              return `Gagal menyimpan project: ${insertError.message}`;
            }

            return redirect("/admin/projects");
          },
          {
            body: t.Object({
              title: t.String(),
              slug: t.String(),
              summary: t.Optional(t.String()),
              status: t.String(),
            }),
          },
        )

        .get("/projects/:id/edit", async ({ params: { id }, request }) => {
          const pathname = getPathname(request);
          const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .single();

          if (error) return `Gagal mengambil data: ${error.message}`;

          return (
            <DashboardLayout title="Edit Proyek" pathname={pathname}>
              <ProjectForm mode="edit" project={data} />
            </DashboardLayout>
          );
        })

        .post(
          "/projects/:id/edit",
          async ({ params: { id }, body }) => {
            const { title, slug, summary, status } = body;

            const { error: insertError } = await supabase
              .from("projects")
              .update([{ title, slug, summary, status }])
              .eq("id", id);

            if (insertError) {
              return `Gagal menyimpan project: ${insertError.message}`;
            }

            return redirect("/admin/projects");
          },
          {
            params: t.Object({ id: t.String() }),
            body: t.Object({
              title: t.String(),
              slug: t.String(),
              summary: t.Optional(t.String()),
              status: t.String(),
            }),
          },
        )

        .post("/projects/:id/delete", async ({ params: { id } }) => {
          const { error: deleteError } = await supabase
            .from("projects")
            .delete()
            .eq("id", id);

          if (deleteError) {
            return `Gagal menghapus data: ${deleteError.message}`;
          }

          return redirect("/admin/projects");
        })

        .get(
          "/projects/:id/aspects",
          async ({ params: { id }, request }) => {
            const pathname = getPathname(request);
            const { data: project, error: projectError } = await supabase
              .from("projects")
              .select("*")
              .eq("id", id)
              .single();

            if (projectError)
              return `Gagal mengambil data ${projectError.message}`;
            if (!project) return "Data tidak ditemukan";

            const { data: aspects, error: aspectsError } = await supabase
              .from("project_aspects")
              .select("*")
              .eq("project_id", project.id)
              .order("sort_order", { ascending: true });

            if (aspectsError)
              return `Gagal mengambil data: ${aspectsError.message}`;

            return (
              <DashboardLayout title="Aspek Proyek" pathname={pathname}>
                <ProjectAspectsPage project={project} aspects={aspects} />
              </DashboardLayout>
            );
          },
          {
            params: t.Object({ id: t.String() }),
          },
        )

        .post(
          "/projects/:id/aspects",
          async ({ params: { id }, body }) => {
            const {
              aspect_title,
              description,
              tech_stack,
              repo_url,
              sort_order,
            } = body;

            const techStackArray = tech_stack
              .split(",")
              .map((item) => item.trim());

            const { error: postError } = await supabase
              .from("project_aspects")
              .insert([
                {
                  project_id: id,
                  aspect_title,
                  description,
                  tech_stack: techStackArray,
                  repo_url: repo_url || null,
                  sort_order: Number(sort_order),
                },
              ]);

            if (postError) return `Error insert data: ${postError.message}`;

            return redirect(`/admin/projects/${id}/aspects`);
          },
          {
            params: t.Object({ id: t.String() }),
            body: t.Object({
              aspect_title: t.String(),
              description: t.String(),
              tech_stack: t.String(),
              repo_url: t.Optional(t.String()),
              sort_order: t.String(),
            }),
          },
        )

        .post(
          "/projects/:id/aspects/:aspectId/delete",
          async ({ params: { id, aspectId } }) => {
            const { error } = await supabase
              .from("project_aspects")
              .delete()
              .eq("id", aspectId)
              .eq("project_id", id);

            if (error) return `Gagal menghapus data: ${error.message}`;

            return redirect(`/admin/projects/${id}/aspects`);
          },
        )

        .get("/experiences", async ({ request }) => {
          const pathname = getPathname(request);
          const { data, error } = await supabase
            .from("experiences")
            .select("*")
            .order("created_at", { ascending: true });

          if (error) return `Gagal mengambil data: ${error.message}`;

          return (
            <DashboardLayout title="Daftar Pengalaman" pathname={pathname}>
              <ExperienceList experiences={data} />
            </DashboardLayout>
          );
        })

        .get("/experiences/new", async ({ request }) => {
          const pathname = getPathname(request);

          return (
            <DashboardLayout title="Tambah Pengalaman" pathname={pathname}>
              <ExperienceForm />
            </DashboardLayout>
          );
        })

        .post(
          "/experiences",
          async ({ body }) => {
            const {
              company_name,
              job_title,
              start_date,
              end_date,
              is_current,
              description,
            } = body;

            const isActive = is_current === "true";

            const { error } = await supabase.from("experiences").insert({
              company_name,
              job_title,
              start_date,
              end_date: end_date || null,
              is_current: isActive,
              description,
            });

            if (error) return `Gagal update data: ${error.message}`;

            return redirect("/admin/experiences");
          },
          {
            body: t.Object({
              company_name: t.String(),
              job_title: t.String(),
              start_date: t.String(),
              end_date: t.Optional(t.String()),
              is_current: t.String(),
              description: t.String(),
            }),
          },
        )

        .post(
          "/experiences/:id/edit",
          async ({ params: { id }, body }) => {
            const {
              company_name,
              job_title,
              start_date,
              end_date,
              is_current,
              description,
            } = body;

            const isActive = is_current === "true";

            const { error } = await supabase
              .from("experiences")
              .update({
                company_name,
                job_title,
                start_date,
                end_date: end_date || null,
                is_current: isActive,
                description,
              })
              .eq("id", id);

            if (error) return `Gagal update data: ${error.message}`;

            return redirect("/admin/experiences");
          },
          {
            params: t.Object({ id: t.String() }),
            body: t.Object({
              company_name: t.String(),
              job_title: t.String(),
              start_date: t.String(),
              end_date: t.Optional(t.String()),
              is_current: t.String(),
              description: t.String(),
            }),
          },
        ),
  );
