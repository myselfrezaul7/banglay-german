---
description: Mobile-first design mandate for Banglay German
---

# Mobile-First Design Rule

**This website primarily targets mobile users.** All design decisions, layout choices, and interactions must be optimized for mobile screens first, then progressively enhanced for desktop.

## Guidelines
- Always design for small screens (375px–428px) first, then scale up via `md:` and `lg:` breakpoints.
- Touch targets must be at least 44×44px.
- Animations should be lightweight and respect `prefers-reduced-motion`.
- Bottom navigation (Dynamic Island dock) is the primary nav for mobile — desktop nav is secondary.
- All interactive elements must have visible `:active` states for tactile feedback on touch.
- Avoid hover-only interactions — they don't work on mobile. Always pair hover with tap/active states.
- Test all layouts at 375px width minimum.
