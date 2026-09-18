# Repository Guidelines

## Project Structure & Module Organization

This npm-workspace monorepo contains the reusable library in `packages/ui` and a manual component demo in `playground`.

- Library components live in `packages/ui/src/components/<Component>/`; keep a component's TSX, CSS, tests, and local `index.ts` together.
- The public package surface is `packages/ui/src/index.ts`. Export every supported component and public prop/type from here.
- Shared design tokens are in `packages/ui/src/styles/tokens/`.
- Component tests sit alongside implementations as `Component.test.tsx`.
- Playground examples are in `playground/src/showcases/`; add navigation entries in `playground/src/navigation/componentConfig.ts` and render the showcase from `playground/src/App.tsx`.

## Build, Test, and Development Commands

- `npm test` runs the Jest suite for `@ni3stack/ui`.
- `npm run build` produces the distributable UI package in `packages/ui/dist`.
- `npm run test --workspace=@ni3stack/ui -- --watch` runs library tests interactively.
- `npm run start --workspace=@ui-lab/playground` starts the Webpack playground on port 3000.

Run tests and the library build before opening a pull request. The publishing workflow also runs `npm ci`, the library tests, and the library build.

## Coding Style & Naming Conventions

Write TypeScript and React function components. Follow the nearby component's formatting—most production files use two-space indentation and double quotes. Use PascalCase for component names and folders (`Modal/Modal.tsx`), camelCase for props and handlers (`closeOnEscape`, `onClose`), and kebab-case CSS files. Use BEM-like component classes such as `.banner`, `.banner--warning`, and `.banner-close`.

There is no committed formatter or linter. Keep diffs focused, preserve existing style, and rely on TypeScript and Jest for checks.

## Testing Guidelines

Tests use Jest, React Testing Library, and `@testing-library/user-event`. Name test files `Component.test.tsx`; describe observable behavior, accessibility roles/names, prop forwarding, and callbacks. Add regression tests for every bug fix and cover each new variant or interaction. Avoid testing implementation details.

## Commit & Pull Request Guidelines

Use Conventional Commit-style subjects seen in history: `feat: add Banner component`, `fix: correct Textarea stylesheet import`, or `chore: configure GitHub package publishing`. Keep commits single-purpose. Pull requests should explain the user-visible change, link the relevant issue when available, list validation commands, and include screenshots or a short recording for visual/playground changes.
