"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createLink, updateLink, deleteLink } from "@/data/links";

const schema = z.object({
  url: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(1, "Short code is required")
    .max(20, "Short code must be 20 characters or less")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Only letters, numbers, hyphens, and underscores allowed"
    ),
});

type FieldErrors = { url?: string[]; shortCode?: string[] };

export async function createLinkAction(input: {
  url: string;
  shortCode: string;
}): Promise<{ error: string | FieldErrors } | { success: true }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as FieldErrors };
  }

  try {
    await createLink({ ...parsed.data, clerkUserId: userId });
    return { success: true };
  } catch (err) {
    if (err instanceof Error && err.message.includes("unique")) {
      return { error: { shortCode: ["This short code is already taken"] } };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export async function updateLinkAction(input: {
  id: number;
  url: string;
  shortCode: string;
}): Promise<{ error: string | FieldErrors } | { success: true }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse({ url: input.url, shortCode: input.shortCode });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as FieldErrors };
  }

  try {
    await updateLink(input.id, userId, parsed.data);
    return { success: true };
  } catch (err) {
    if (err instanceof Error && err.message.includes("unique")) {
      return { error: { shortCode: ["This short code is already taken"] } };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export async function deleteLinkAction(input: {
  id: number;
}): Promise<{ error: string } | { success: true }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    await deleteLink(input.id, userId);
    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
