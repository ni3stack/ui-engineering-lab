# UI Engineering Lab

A production-quality frontend engineering playground focused on:

- Frontend Architecture
- Component Architecture
- Reusable Components
- Shared Libraries
- Design Systems
- State Management
- Browser APIs
- JavaScript Internals
- React Patterns
- Performance

---

## Current Status

### UI Library

Package: `@ui-lab/ui`

#### Button

- [x] React + TypeScript component
- [x] Native button props
- [x] `variant`
- [x] `size`
- [x] Custom `className`
- [x] Class composition
- [x] Jest + Testing Library
- [x] jsdom
- [x] CSS support in Jest
- [x] Design tokens
- [x] Hover / active states
- [x] Focus-visible state
- [x] Disabled state
- [x] Loading behavior
- [ ] Loading indicator
- [ ] Loading accessibility
- [ ] Playground
- [ ] Documentation
- [ ] Package build verification

---

## Project Structure

```text
packages/
└── ui/
    ├── src/
    │   ├── components/
    │   │   └── Button/
    │   ├── styles/
    │   │   └── tokens/
    │   ├── styles.d.ts
    │   └── index.ts
    │
    └── test/
        └── styleMock.js

playground/