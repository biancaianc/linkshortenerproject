# UI Components Guide

## Component Library Standard

This project uses **shadcn/ui** as the exclusive component library for all UI elements.

## Core Principles

### 1. Use shadcn/ui Components Only

- **DO NOT** create custom UI components (buttons, inputs, dialogs, cards, etc.)
- **ALWAYS** use existing shadcn/ui components
- If a component doesn't exist in your local setup, install it from shadcn/ui

### 2. Component Installation

When you need a shadcn/ui component that isn't available:

```bash
npx shadcn@latest add [component-name]
```

Common components:
- `button`, `input`, `card`, `dialog`, `form`, `select`, `checkbox`, `label`
- `dropdown-menu`, `popover`, `toast`, `alert`, `badge`, `avatar`
- `table`, `tabs`, `sheet`, `skeleton`, `separator`, `scroll-area`

### 3. Component Composition

Build complex UIs by **composing** shadcn/ui primitives:

```tsx
// ✅ CORRECT: Compose shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function FeatureCard() {
  return (
    <Card>
      <CardHeader>Title</CardHeader>
      <CardContent>
        <Button>Action</Button>
      </CardContent>
    </Card>
  )
}
```

```tsx
// ❌ WRONG: Creating custom button component
export function CustomButton({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-500">{children}</button>
}
```

### 4. Customization

Customize shadcn/ui components using:
- **Variants**: Built-in component variants (e.g., `<Button variant="outline">`)
- **Tailwind Classes**: Additional styling via `className` prop
- **Component Props**: Native HTML attributes and shadcn props

```tsx
// ✅ CORRECT: Customize via variants and Tailwind
<Button variant="destructive" size="lg" className="w-full">
  Delete Account
</Button>
```

## Anti-Patterns

### ❌ Don't Create Wrapper Components

```tsx
// ❌ WRONG: Unnecessary wrapper
export function MyButton(props) {
  return <Button {...props} />
}
```

### ❌ Don't Build from Scratch

```tsx
// ❌ WRONG: Building a dialog from scratch
export function CustomDialog() {
  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="bg-white rounded-lg">
        {/* custom dialog implementation */}
      </div>
    </div>
  )
}

// ✅ CORRECT: Use shadcn Dialog
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

export function MyDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>Title</DialogHeader>
        {/* content */}
      </DialogContent>
    </Dialog>
  )
}
```

## Component Location

- shadcn/ui components live in: `@/components/ui/`
- Import from this path: `import { Button } from "@/components/ui/button"`
- Feature-specific compositions can live elsewhere in `components/`

## When in Doubt

1. Check if shadcn/ui has the component: https://ui.shadcn.com/docs/components
2. Install it if needed: `npx shadcn@latest add [component-name]`
3. Use it directly with variants and Tailwind for customization
4. Compose multiple shadcn components for complex UIs

## Quick Reference

| Need | Use |
|------|-----|
| Button | `@/components/ui/button` |
| Form controls | `@/components/ui/input`, `@/components/ui/form` |
| Navigation | `@/components/ui/dropdown-menu`, `@/components/ui/tabs` |
| Overlays | `@/components/ui/dialog`, `@/components/ui/sheet`, `@/components/ui/popover` |
| Feedback | `@/components/ui/toast`, `@/components/ui/alert` |
| Data display | `@/components/ui/table`, `@/components/ui/card` |
| Loading states | `@/components/ui/skeleton` |
