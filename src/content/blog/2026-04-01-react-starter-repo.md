---
date: 2026-04-01
title: React Starter
description: A full-stack React template built on TanStack Start. Fork it,
  configure your API URL, and you have auth, routing, data fetching, state
  management, and a component library already connected and working together
tags: developer, frontend, react, template
---
# A Practical Foundation for Real Projects

Every React project starts the same way. You run `create vite@latest`, pick your options, and then spend the next two hours wiring up routing, state management, data fetching, and authentication before you write a single line of actual business logic. If you have done this more than once, you already know the pain.

> [https://github.com/mrlinnth/react-starter](https://github.com/mrlinnth/react-starter) 

This starter exists to skip that part.

`react-starter` is a full-stack React template built on TanStack Start. Fork it, configure your API URL, and you have auth, routing, data fetching, state management, and a component library already connected and working together. The goal is not to be clever. The goal is to get you to the real work faster.

---

## The Stack and Why It Was Chosen

Every tool in this project was chosen for a reason. None of them are experimental. All of them are production-ready.

### TanStack Start

TanStack Start is an SSR-capable React framework built on top of Vite. It sits in the same category as Next.js or Remix, but it is built around the TanStack ecosystem, which means TanStack Router and TanStack Query are first-class citizens rather than afterthoughts bolted on later.

If you are building a client-rendered SPA, you might not need SSR today. But having it available from the start means you are not doing a painful migration six months later when SEO becomes a requirement or initial load performance becomes a complaint.

### TanStack Router

File-based routing with full TypeScript support. Your routes live in `src/routes/` and the structure of that folder maps directly to your URL structure. The router generates the types automatically, which means broken links become compile errors instead of runtime surprises.

This is a meaningful upgrade over manually configuring React Router. The file-based approach also makes the project easier to navigate for someone joining the codebase for the first time.

### TanStack Query

TanStack Query solves the problem that every developer solves badly on their own the first time: server state. Loading states, error states, caching, background refetching, and SSR dehydration — all of it is handled.

In this starter, query calls live in custom hooks inside `src/hooks/`. Components do not fetch their own data. They call a hook and receive data. This separation keeps components clean and makes the data logic testable and reusable.

### Zustand

Zustand handles client state — things like the currently logged-in user and the active theme. It is small, straightforward, and does not require wrapping your entire application in a provider tree.

The stores in this project use `skipHydration: true` with manual client-side rehydration. This is an intentional decision to prevent server-side crashes when Zustand tries to read `localStorage` during SSR. It is the kind of detail that is invisible when it works and deeply frustrating to debug when it does not.

### shadcn/ui and Tailwind CSS v4

shadcn/ui is not a component library in the traditional sense. You do not install it as a dependency. You add components directly into your project, which means you own the code and can modify it freely without fighting library internals.

Tailwind CSS v4 handles the styling. Dark mode is supported out of the box, and the theme toggle is persisted to `localStorage`. Critically, an inline script applies the theme class before React hydrates, which eliminates the flash of wrong theme that plagues most dark mode implementations.

---

## What Is Already Built

Beyond the stack, the starter includes several working features that you would otherwise build yourself.

**Authentication flow.** Register, login, and logout are all wired up. The current implementation uses `localStorage` as a mock backend, but it is deliberately structured so that swapping in a real API requires changing only the login and register calls. The auth store itself does not need to change. The `login()` function accepts a user object, so whatever shape your JWT payload returns, you map it there and everything downstream continues to work.

**Protected routes.** The `/customers` route redirects unauthenticated users to `/login` using TanStack Router's `beforeLoad` hook. The guard is SSR-safe, wrapped in a `typeof window` check so it does not execute on the server where `localStorage` does not exist.

**API service layer.** All API calls live in `src/services/ApiService.ts`. Helper functions in `src/lib/api.ts` handle building URLs and requests. Bearer token injection is automatic, pulled from the auth store. Your base URL is configured via an environment variable. Adding a new endpoint means adding one function in one file.

**Data fetching example.** The customers list demonstrates the full pattern: an API function in the service layer, a custom hook in `src/hooks/` that calls TanStack Query, and a component that consumes the hook. Follow this pattern for every new feature and the codebase stays consistent.

---

## Project Structure

The folder structure is intentional and worth understanding before you start adding to it.

```
src/
├── components/
│   ├── layout/          # TopNavigation, Layout
│   └── ui/              # shadcn components
├── hooks/               # custom hooks (e.g. useCustomers)
├── lib/
│   ├── api.ts           # buildUrl, buildRequest helpers
│   └── utils.ts         # cn() utility
├── routes/              # file-based pages
├── services/
│   └── ApiService.ts    # all API endpoint functions
├── store/               # Zustand stores
└── styles.css           # Tailwind + CSS variables

```

The separation between `services/` and `hooks/` is deliberate. Services are pure functions that talk to the API. Hooks are where you connect those functions to TanStack Query and expose them to components. Keeping these two layers separate makes each one easier to test and reason about independently.

---

## Getting Started

```bash
git clone https://github.com/mrlinnth/react-starter.git
cd react-starter
pnpm install
cp .env.example .env
pnpm dev

```

Set `VITE_API_BASE_URL` in your `.env` file to point to your API. The demo is configured against `jsonplaceholder.typicode.com` so you can see it working immediately without a backend.

When you are ready to connect your real backend, the checklist is short:

1. Replace the mock calls in `login.tsx` and `register.tsx` with real API calls
2. Update the user type in the auth store to match your JWT payload
3. Add your endpoints to `ApiService.ts`
4. Add query hooks for your new endpoints in `src/hooks/`

---

## Who This Is For

This starter is useful if you are beginning a new React project and you want a solid, conventional foundation without making all the architectural decisions yourself. The patterns here are not novel. They are the patterns that experienced React developers tend to arrive at after a few projects. This just gives you a head start.

It is also useful as a reference if you are working with a codebase that has grown inconsistent over time and you want to see what a clean separation of concerns looks like in a modern React project.

The stack is stable. The patterns are practical. Fork it, build something.