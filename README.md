# UI Engineering Lab

A production-oriented React + TypeScript UI component library built as a monorepo.

The goal is to build reusable, accessible, and well-tested UI components that can
eventually be consumed by other React applications and Git repositories.

---

## Goals

This project is also an engineering lab for exploring:

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
- Accessibility
- Testing
- Package Design

---

## Project Structure

```text
ui-engineering-lab/
│
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Button/
│       │   │   └── Input/
│       │   │
│       │   ├── styles/
│       │   │   └── tokens/
│       │   │
│       │   ├── styles.d.ts
│       │   └── index.ts
│       │
│       ├── test/
│       │   └── styleMock.js
│       │
│       ├── jest.config.js
│       ├── jest.setup.js
│       ├── tsconfig.json
│       └── webpack.config.js
│
├── playground/
│   ├── src/
│   │   ├── navigation/
│   │   └── showcases/
│   │
│   └── webpack.config.js
│
├── babel.config.js
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md