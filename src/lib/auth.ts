import { verify } from "argon2";

export async function verifyPassword(password: string, hash: string) {
  try {
    return await verify(hash.trim(), password);
  } catch (e) {
    console.error("[auth] verify error:", e);
    return false;
  }
}
