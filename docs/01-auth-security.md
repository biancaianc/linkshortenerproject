# Authentication & Security

## Authentication Provider

**Clerk is the sole authentication provider for this application.** No other authentication methods or libraries should be used.

## Protected Routes

### Dashboard Protection

- The `/dashboard` route is **protected** and requires user authentication
- Unauthenticated users attempting to access `/dashboard` must be redirected to sign in

### Homepage Redirect

- If a logged-in user navigates to the homepage (`/`), they should be **automatically redirected** to `/dashboard`
- This ensures authenticated users land directly in the application workspace

## Authentication UI

### Modal-Based Authentication

- **Sign in** and **sign up** flows must always launch as **modals**
- Do not use full-page authentication screens
- Use Clerk's modal components to maintain this pattern

## Implementation Guidelines

- Use Clerk's Next.js SDK for all authentication logic
- Leverage Clerk middleware for route protection
- Use `auth()` and `currentUser()` helpers for server components
- Use `useAuth()` and `useUser()` hooks for client components
- Always check authentication state before rendering protected content

## Security Best Practices

- Never bypass Clerk authentication with custom auth solutions
- Keep Clerk SDK and dependencies up to date
- Respect authentication state across all routes and components
- Handle authentication errors gracefully with appropriate user feedback
