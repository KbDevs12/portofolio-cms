import { Elysia } from "elysia";
import { supabase } from "../db/supabase";

export const apiController = new Elysia({ prefix: "/api" })
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
  })

  .get("tech_stack", async () => {
    const { data, error } = await supabase
      .from("project_aspects")
      .select("tech_stack");

    if (error) return { success: false, error: error.message };

    const uniqueTechStack: string[] = [
      ...new Set((data ?? []).flatMap((item) => item.tech_stack ?? [])),
    ];

    return { success: true, data: { uniqueTechStack } };
  });
