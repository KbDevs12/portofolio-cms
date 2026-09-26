import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const app = new Elysia()
  .use(html())
  .group("/api", (app) => app)

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
  });
