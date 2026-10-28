# Project Context (scanned: 2026-10-28)

## Stack
- **Language / Framework:** TypeScript 5, Next.js 16.4.2 (App Router with TurboPack, `cacheComponents: true`, `partialPrefetching: true`), React 19.3.0, React DOM 19.3.0
- **UI & Styling:** Tailwind CSS 4.3.3 (`@tailwindcss/postcss`, `@tailwindcss/turbopack`, `tw-animate-css`), shadcn/ui (`base-nova` style with `@base-ui/react` primitives and `lucide-react`), `next-themes` (dark/light theme support)
- **Utilities & Validation:** `class-variance-authority`, `cn`, `zod` (v4.6.7), `sonner` (v2.0.8)
- **Backend / BaaS:** Supabase (`@supabase/supabase-js` v2.118.0, `@supabase/ssr` v0.12.7), local Supabase CLI setup (`supabase/config.toml`, Postgres v17)
- **Package Manager:** npm (`package-lock.json` lockfileVersion 3)
- **Tooling / Linting:** ESLint 9 (`eslint-config-next` 16.4.2 flat config in `eslint.config.mjs`), `dotenv-cli`, `univar`
- **Testing / CI:** None configured yet

## Commands
- `npm run dev`: Starts Next.js development server with Turbopack (`next dev`)
- `npm run build`: Production build (`next build`)
- `npm run start`: Starts production server (`next start`)
- `npm run lint`: Runs ESLint 9 (`eslint`)
- `npm run db:new`: Generates a new Supabase migration (`npx supabase migration new`)
- `npm run db:push`: Pushes migrations to Supabase database (`dotenv -e .env.local -- univar npx supabase db push --db-url $SUPABASE_DB_URL`)
- `npm run db:types`: Generates TypeScript types from Supabase database schema into `src/utils/supabase/types/database.ts`

## Structure
- `src/app/` → Next.js App Router entry points:
  - `layout.tsx` → Root layout configuring fonts (Geist, Noto Sans, Noto Sans Thai), `ThemeProvider`, Header (RSC with Supabase session check inside Suspense), ClientLayoutWrapper, and Footer.
  - `page.tsx` → Home landing page composing sections from `@/features/home`.
  - `(views)/` → Route group organizing view pages:
    - `auth/login/page.tsx` → Sign-in page with UI card.
    - `auth/register/page.tsx` → Registration page with UI form.
  - `globals.css` → Tailwind CSS 4 setup with theme variables, custom color palette (forest green theme matching Figma designs), dark mode classes, and Base UI styling.
- `src/proxy.ts` → Next.js 16 network proxy / routing middleware entrypoint (replaces legacy `middleware.ts`), delegating session refresh to `updateSession()`.
- `src/features/` → Feature-sliced architectural pattern:
  - `home/` → Home landing page feature modules:
    - `components/` → UI sections (`HeroSection`, `PainPointSection`, `HowItWorkSection`, `SkillPreview`, `SectionWrapper`, etc.)
    - `types/` → Feature-scoped type definitions (`content.d.ts`).
    - `index.ts` → Public barrel export.
  - `auth/` → Authentication feature module (`index.ts` placeholder).
- `src/components/` → Shared and UI components:
  - `ui/` → shadcn UI components built on `@base-ui/react` primitives (`button`, `card`, `input`, `label`, `dialog`, `dropdown-menu`, `badge`, `separator`, `sonner`).
  - `layouts/` → Common layout components (`Header.tsx` [async Server Component], `Footer.tsx`, `Container.tsx`).
  - `common/` → Cross-cutting components (`ClientLayoutWrapper.tsx`, `theme/ThemeToggle.tsx`, `theme/ThemeLogo.tsx`).
- `src/providers/` → React Context providers (`theme-provider.tsx` wrapping `next-themes`).
- `src/utils/` → Utility helper modules:
  - `supabase/` → Supabase SSR integration:
    - `client.ts` → Browser client factory (`createBrowserClient`).
    - `server.ts` → Server client factory (`createServerClient` with `next/headers` cookies).
    - `middleware.ts` → Session updater (`updateSession`) with cookie propagation and session refresh via `supabase.auth.getClaims()`.
    - `types/database.ts` → Generated TypeScript schema types from Supabase database (includes `profiles` table).
- `src/lib/` → Library wrappers (`utils.ts` re-exporting `cn`).
- `src/types/` → Ambient/global TypeScript declarations (`global.d.ts` defining `BaseProps` and `ReactNodeProps`).
- `src/constants/` → Application constants (e.g. `app.ts` with `GITHUB_URL`).
- `supabase/` → Supabase CLI configuration (`config.toml` targeting Postgres 17, local ports, auth configuration).

## Conventions & Patterns
- **Architecture:** Feature-based structure (`src/features/<feature>/components`, `types`, etc.) + shared atomic components (`src/components/ui/`, `src/components/layouts/`).
- **App Router & RSC:** Next.js 16 conventions with Typed Routes & `LayoutProps`, `cacheComponents: true`, `partialPrefetching: true`. Server components by default; `'use client'` only on interactive components.
- **Middleware / Proxy:** Next.js 16 uses `src/proxy.ts` with `export async function proxy(request: NextRequest)` instead of `middleware.ts`.
- **Styling:** Tailwind CSS v4 using CSS variables (`@theme inline`) and Base UI design system (`base-nova` style). No `tailwind.config.js` needed.
- **shadcn/ui:** Built on `@base-ui/react` (Base UI) instead of Radix UI. Components use `render={<Link href="..." />}` pattern.
- **Database & Auth:** Supabase SSR pattern with separate client, server, and middleware helpers. Session checks in server components use `await supabase.auth.getUser()`.
- **Global Types:** Ambient interfaces in `src/types/global.d.ts` (`ReactNodeProps`, `BaseProps`) available globally without explicit imports.
- **Aliases:** `@/*` mapped to `./src/*` in `tsconfig.json`.

## Fingerprint
- `package.json`: v0.1.0, dependencies Next.js 16.4.2, React 19.3.0, Tailwind 4.3.3, Base UI 1.9.0, Supabase JS 2.118.0
- `package-lock.json`: lockfileVersion 3
- `next.config.ts`: turbopack rules, partialPrefetching, cacheComponents
- `components.json`: base-nova style, `@base-ui/react`, lucide icons
- `supabase/config.toml`: project_id relearn-next-react, Postgres 17

## Open Questions & Next Steps
- Authentication forms (`LoginPage` and `RegisterPage`) are currently UI shells without server action integration.
- Supabase auth guards in `src/utils/supabase/middleware.ts` are currently commented out to allow unauthenticated development.
- Automated testing (Vitest/Jest, Playwright) and CI/CD pipelines are not yet established.
