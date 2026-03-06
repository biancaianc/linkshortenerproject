---
description: Apply these instructions when creating or modifying server actions for data mutations in this project.
applyTo: "**/actions.ts"
---

# Server Actions Guidelines

## File Structure

- Server action files **must** be named `actions.ts`
- Place `actions.ts` **colocated** in the same directory as the client component that calls it
- Server actions must only be called from **client components**

## TypeScript

- All data passed to server actions must have explicit TypeScript types
- **Never** use `FormData` as a TypeScript type for action arguments — define a typed object instead

## Validation

- All incoming data **must** be validated using **Zod** before any processing

## Authentication

- Every server action **must** check for a logged-in user **before** performing any database operations
- If no authenticated user is found, return early with an appropriate error

## Database Access

- Database operations must be performed via **helper functions** located in the `/data` directory
- Server actions must **not** use Drizzle queries directly — always delegate to `/data` helpers

## Error Handling

- Server actions must **never** throw errors
- Always return an object with either an `error` property (string, on failure) or a `success` property (on success)
- Wrap database calls in try/catch and return `{ error: "..." }` instead of re-throwing

## Example Pattern

```ts
"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { createLink } from "@/data/links";

const schema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

export async function createLinkAction(input: { url: string; slug: string }) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten() };

  return await createLink(parsed.data);
}
```
