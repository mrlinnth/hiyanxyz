# AGENTS.md

This file provides guidelines for AI agents working in this codebase.

## Project Overview

Astro-based personal portfolio website with TypeScript, Tailwind CSS, and MDX support.
Built for Cloudflare Pages deployment. Features include light/dark theme, SEO optimization
with sitemap and RSS feed, and 100/100 Lighthouse performance.

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run dev:network` | Start dev server accessible on network |
| `npm run build` | Build production site (runs `astro check` + `astro build`) |
| `npm run preview` | Preview build locally |
| `npm run preview:network` | Preview build with network access |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run astro check` | Type-check TypeScript files |

**Note:** This project has no test suite. Do not add tests.

## Code Style

### TypeScript

- Uses Astro's strict TypeScript config with `strictNullChecks`
- Path alias: `@/*` maps to `./src/*`
- Always use explicit return types for utility functions
- Enable strict null checks when accessing potentially undefined values
- Use optional chaining (`?.`) and nullish coalescing (`??`) appropriately

### ESLint Rules

- **Semicolons required** - `semi: ["error", "always"]`
- **Double quotes** - `quotes: ["error", "double", { "allowTemplateLiterals": true }]`
- No triple-slash references (`@typescript-eslint/triple-slash-reference: "off"`)
- Follows Astro and TypeScript ESLint recommended rules
- Runs with Node.js and browser environments enabled

### Naming Conventions

- **Files**: kebab-case (e.g., `rss.xml.ts`, `robots.txt.ts`)
- **Components**: PascalCase (e.g., `Card.astro`, `Button.tsx`)
- **Utilities**: camelCase (e.g., `formatDate`, `cn`)
- **Constants**: UPPER_SNAKE_CASE for runtime constants (e.g., `SITE_URL`, `DEFAULT_AUTHOR`)
- **Content collections**: camelCase collection names (`blog`, `work`, `projects`)

### Imports

```typescript
// Relative imports for same-module files
import { cn } from "../../lib/utils";

// Path aliases for src/ files
import { formatDate } from "@/lib/utils";

// Astro content collections
import { getCollection } from "astro:content";

// Type imports
import type { CollectionEntry } from "astro:content";
```

### Formatting

- Use Prettier (Astro includes it via `astro dev` and `astro build`)
- 2-space indentation in Astro files
- 2-space indentation in TypeScript/JavaScript files
- Max line length: 100 characters when practical
- Use trailing commas in arrays and objects

### Error Handling

- Use try/catch for async operations that may fail
- Use Astro's built-in error boundaries where applicable
- Log errors appropriately for debugging using console.error
- Handle edge cases in utility functions defensively
- Validate external data with Zod schemas

### Tailwind CSS

- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- Use `@tailwindcss/typography` plugin for prose content
- Prefer Tailwind's utility classes over custom CSS
- Use `dark:` variant for dark mode styles
- Use responsive prefixes (`sm:`, `md:`, `lg:`) for breakpoints

### Astro Patterns

- Content collections defined in `src/content/config.ts`
- Use Zod schemas for content validation
- Prefer `.mdx` files for content needing components
- Use `z.coerce.date()` for date fields to handle string parsing
- Use `draft: true` in frontmatter to hide content from production

### File Organization

```
src/
├── components/     # Reusable UI components (PascalCase .astro files)
├── content/         # MDX content (blog, work, projects collections)
│   ├── blog/       # Blog posts (numbered for ordering)
│   ├── work/       # Work experience entries
│   └── projects/   # Project entries
├── layouts/        # Page layouts
├── lib/            # Utilities and helpers (camelCase)
├── pages/          # File-based routing (kebab-case)
└── styles/         # Global styles
```

### Common Patterns

```typescript
// Content collection usage
import { getCollection } from "astro:content";

const posts = await getCollection("blog", ({ data }) => !data.draft);

// Filtering work entries by date
const sortedWork = (await getCollection("work")).sort(
  (a, b) => b.data.dateStart.valueOf() - a.data.dateStart.valueOf()
);

// Type-safe props in Astro components
interface Props {
  title: string;
  description?: string;
}

const { title, description = "" } = Astro.props;

// Using cn() for conditional classes
const buttonClass = cn(
  "px-4 py-2 rounded-lg",
  variant === "primary" && "bg-blue-500 text-white",
  disabled && "opacity-50 cursor-not-allowed"
);
```

### Props and Types

- Define Props interfaces for all Astro components
- Use `type` for type-only imports (not `interface` for imports)
- Export types from `src/types.ts` for shared type definitions
- Use `CollectionEntry<"blog" | "work" | "projects">` for content collection types

### Frontmatter Patterns

```markdown
---
title: "Post Title"
description: "A brief description"
date: 2024-01-15
draft: false
---
```

## Key Files

- `astro.config.mjs` - Astro configuration (integrations: mdx, sitemap, tailwind)
- `tsconfig.json` - TypeScript configuration (strict mode, path aliases)
- `.eslintrc.cjs` - ESLint configuration
- `tailwind.config.mjs` - Tailwind configuration (typography plugin)
- `src/content/config.ts` - Content collections schema (blog, work, projects)
- `src/lib/utils.ts` - Utility functions (cn, formatDate, readingTime, dateRange)
- `src/consts.ts` - Site constants

## Deployment

Built for Cloudflare Pages via Wrangler. Production builds deploy automatically.
Set `site` in astro.config.mjs to `https://hiyan.xyz` for proper URL generation.

## Git Workflow

1. Create feature branch from main: `git checkout -b feature/<description>`
2. Make changes and commit at logical checkpoints
3. Run `npm run lint` before committing
4. Create PR or merge when ready
5. Never force push to main