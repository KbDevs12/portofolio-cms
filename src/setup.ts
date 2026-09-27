import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import jwt from "@elysiajs/jwt";

export const setup = new Elysia({ name: "setup" }).use(html()).use(
  jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET!,
  }),
);
