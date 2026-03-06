import { and, eq } from "drizzle-orm";
import db from "@/db";
import { links } from "@/db/schema";

export async function getLinksByUserId(userId: string) {
  return db.select().from(links).where(eq(links.clerkUserId, userId));
}

export async function createLink(data: {
  url: string;
  shortCode: string;
  clerkUserId: string;
}) {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function updateLink(
  id: number,
  userId: string,
  data: { url: string; shortCode: string }
) {
  const [link] = await db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.clerkUserId, userId)))
    .returning();
  return link;
}

export async function deleteLink(id: number, userId: string) {
  await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.clerkUserId, userId)));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode));
  return link ?? null;
}
