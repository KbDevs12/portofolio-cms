import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { setup } from "./setup";
import { apiController } from "./controllers/api";
import { adminController } from "./controllers/admin";

const app = new Elysia()
  .use(setup)
  .use(
    staticPlugin({
      assets: "public",
      prefix: "",
    }),
  )
  .use(apiController)
  .use(adminController)
  .listen(3000);

console.log(`🦊 Server jalan di ${app.server?.hostname}:${app.server?.port}`);
