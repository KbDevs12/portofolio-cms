// import { verify } from "argon2";

// export async function verifyPassword(password: string, hash: string) {
//   try {
//     return await verify(hash.trim(), password);
//   } catch (e) {
//     console.error("[auth] verify error:", e);
//     return false;
//   }
// }

export async function verifyPassword(password: string) {
  const verified = password === process.env.ADMIN_PASSWORD!;

  if (!verified) return false;
  return true;
}
