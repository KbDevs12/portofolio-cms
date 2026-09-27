import { Elysia, redirect, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { createClient } from "@supabase/supabase-js";
import { LoginPage } from "./views/Login";
import { verifyPassword } from "./lib/auth";
import jwt from "@elysiajs/jwt";
import { DashboardPage } from "./views/Dashboard";
import { ProjectList } from "./views/ProjectList";
import { ProjectForm } from "./views/ProjectForm";
import { Project } from "./types";
import { DashboardLayout } from "./views/layout/DashboardLayout";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const getPathname = (request: Request) => new URL(request.url).pathname;

const app = new Elysia()
  .use(html())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )

  .group("/api", (app) =>
    app

      .get("profile", async () => {
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .limit(1)
          .single();
        if (error) return { success: false, error: error.message };
        return { success: true, data };
      })

      .get("experience", async () => {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("start_date", { ascending: false });

        if (error) return { success: false, error: error.message };
        return { success: true, data };
      })

      .get("projects", async () => {
        const { data, error } = await supabase
          .from("projects")
          .select(
            `
          *,
          project_aspects (*)
        `,
          )
          .order("created_at", { ascending: false });

        if (error) return { success: false, error: error.message };
        return { success: true, data };
      }),
  )

  .group("/admin", (app) =>
    app
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

        const valid = await verifyPassword(
          password,
          process.env.ADMIN_PASSWORD!,
        );

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
                  <ProjectList projects={(data as Project[]) || []} />
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
              async ({ body, request }) => {
                const pathname = getPathname(request);

                const { title, slug, summary, status } = body;

                const { error: insertError } = await supabase
                  .from("projects")
                  .insert([{ title, slug, summary, status }])
                  .select("");

                if (insertError) {
                  return `Gagal menyimpan project: ${insertError.message}`;
                }

                const { data, error } = await supabase
                  .from("projects")
                  .select("*")
                  .order("created_at");

                if (error) {
                  return `Gagal mengambil data: ${error.message}`;
                }

                return (
                  <DashboardLayout title="Proyek" pathname={pathname}>
                    <ProjectList projects={(data as Project[]) || []} />
                  </DashboardLayout>
                );
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

            .post(
              "/projects/:id/delete",
              async ({ params: { id }, request }) => {
                const pathname = getPathname(request);

                const { error: deleteError } = await supabase
                  .from("projects")
                  .delete()
                  .eq("id", id);

                if (deleteError) {
                  return `Gagal menghapus data: ${deleteError.message}`;
                }
                const { data, error } = await supabase
                  .from("projects")
                  .select("*")
                  .order("created_at");

                if (error) {
                  return `Gagal mengambil data: ${error.message}`;
                }

                return (
                  <DashboardLayout title="Proyek" pathname={pathname}>
                    <ProjectList projects={(data as Project[]) || []} />
                  </DashboardLayout>
                );
              },
            ),
      ),
  )
  .listen(3000);

console.log(`🦊 Server jalan di ${app.server?.hostname}:${app.server?.port}`);
