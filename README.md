# linkshortenerproject

A full-stack URL shortener built with **Next.js 16**, **TypeScript**, **Clerk** authentication,
and **shadcn/ui** components, backed by a **Drizzle ORM** database layer.

---

## Overview

Provides a dashboard for authenticated users to create and manage shortened URLs.
Authentication is handled exclusively by Clerk, with protected routes and modal-based sign-in/sign-up flows.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Authentication | Clerk (`@clerk/nextjs` ^6.39.0) |
| UI Components | shadcn/ui + Tailwind CSS v4 |
| Database ORM | Drizzle ORM |
| Runtime | Node.js >= 20.9.0 |

---

## Project Structure

```
linkshortenerproject/
  app/
    dashboard/page.tsx   # Protected dashboard (requires auth)
    page.tsx             # Homepage (redirects to /dashboard if logged in)
    layout.tsx           # Root layout
    globals.css
                                                                 b/                                     client
    schema.ts            # Drizzle schema definitions
  docs/
    01-auth-security.md  # Authentication guidelines
    02-ui-components.md  # UI component standards
  proxy.ts
  drizzle.config.ts
  next.config.ts
  package.json
```

---

## Getting Started

### Prer### Prer### Prer### Prer### Prer### Prer### Prer### Prer### Prer### Prer### Prer### Prer### Prer### Prer##allation

```bash
git clgit clgit clgit clgitm/biancaianc/linkshortenerproject.git
cd linkshortenerproject
npm install
```

### Environment Variables

Create a `.env.local` file and configure your Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Authentication

Authentication is handled exclusively by **Clerk**:

- `/dashboard` is a **protected route** -- unauthenticated users are redirected to sign in
- Authenticated users visiting `/` are **auto-redirected to `/dashboard`**
- Sign-in and sign-up are **modal-based** (no full-page auth screens)
- Uses Clerk middleware for route protection and `auth()` / `useAuth()` helper- Uses Chout

See [docs/01-authSee [docs/01-auocSee [docs/01-urity.mSe for full guidelines.


ee [docs/01-authSee [docs/01-auocSee [docs/01-urity.mSe for full guidelines.
- Uses Chout
eate custom component replacementeate c`beate custom component replacementeate c`beate custom componentponeate custom componennents live in `@/compeate custom component re2-ueate custom component replacementeate c`beate custom comdareate ---

## Available Scripts

| Script | Description |
|---||---||---||---||---||---||---|eve|-pme|---||---||---||pm run build`|---||---for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

##################################################om) ##################################################om) ###################################ct settings.
