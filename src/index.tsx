import { Elysia, redirect, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { createClient } from "@supabase/supabase-js";
import { LoginPage } from "./views/Login";
import { verifyPassword } from "./lib/auth";
import jwt from "@elysiajs/jwt";
import { DashboardPage } from "./views/Dashboard";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

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
          redirect("/admin/dashboard");
          return;
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

      .guard(
        {
          async beforeHandle({ jwt, cookie: { auth } }) {
            const profile = await jwt.verify(auth.value as string);

            if (!profile) {
              redirect("/admin/login");
              return "Unauthorized";
            }
          },
        },
        (app) => app.get("/dashboard", () => <DashboardPage />),
      ),
  )
  .listen(3000);

console.log(`🦊 Server jalan di ${app.server?.hostname}:${app.server?.port}`);
