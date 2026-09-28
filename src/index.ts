import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { setup } from "./setup";
import { apiController } from "./controllers/api";
import { adminController } from "./controllers/admin";

const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const app = new Elysia()
  .use(
    cors({
      origin: allowedOrigins.length ? allowedOrigins : true,
      methods: ["GET", "OPTIONS"],
    }),
  )
  .use(setup);

if (!process.env.VERCEL) {
  app.use(staticPlugin({ assets: "public", prefix: "" }));
}

app.use(apiController).use(adminController);

if (!process.env.VERCEL) {
  app.listen(3000);
  console.log(`🦊 Server jalan di ${app.server?.hostname}:${app.server?.port}`);
}

export default app;
