# Copilot Instructions

## Core Principles

- Always build **reusable components**
- Maintain **clean separation of concerns**
- Avoid **over-engineering**
- Keep **design consistent across the application**

---

## Component Design

- Break UI into **small, reusable, and composable components**
- Avoid duplication — extract shared logic and UI into reusable pieces
- Prefer **props-driven components** over hardcoded values
- Keep components **focused on a single responsibility**

---

## Code Structure

- Follow a **clear folder structure** (components, hooks, utils, services, etc.)
- Separate:
  - UI (components)
  - Business logic (hooks/services)
  - State management
- Do not mix unrelated logic in the same file

---

## Simplicity Over Complexity

- Do not introduce abstractions unless they are **clearly needed**
- Avoid premature optimization
- Prefer **readability over cleverness**
- Write code that is easy to understand and maintain

---

## Consistency

- Use existing **design tokens, styles, and patterns**
- Maintain consistent:
  - Spacing
  - Typography
  - Colors
  - Component structure
- Reuse existing components before creating new ones

---

## Best Practices

- Write **clean and readable code**
- Use meaningful variable and function names
- Keep functions small and focused
- Avoid deeply nested logic
- Ensure components are **functional and interactive**

---

## UI & Interaction

- All UI should be:
  - Functional
  - Interactive
  - Responsive
- Add **subtle animations** where appropriate
- Ensure a smooth and consistent user experience

---

## Final Rule

> If a solution feels complex, rethink it. Prefer simple, reusable, and consistent implementations.