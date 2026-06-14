# personal_website

My personal website — a resume / portfolio built with **React + TypeScript + Vite**, styled with **Tailwind CSS** and **shadcn/ui** components.

🔗 Live: https://hastyhippo.github.io/personal_website/

## Edit your content

Almost everything you'll want to change lives in **one file**:

- [`src/data/resume.ts`](src/data/resume.ts) — your name, role, links, experience, projects, and skills.

The page in [`src/App.tsx`](src/App.tsx) renders from that data, so you usually don't need to touch the JSX.

## Run locally

```bash
npm install      # first time only
npm run dev      # start dev server at http://localhost:5173
```

Other commands:

```bash
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build locally
```

## Add more shadcn/ui components

```bash
npx shadcn@latest add dialog tabs avatar   # for example
```

Components land in `src/components/ui/`.

## Hosting (GitHub Pages)

This repo auto-deploys via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

**One-time setup:** on GitHub, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.

After that, every `git push` to `main` rebuilds and publishes the site. Watch progress in the repo's **Actions** tab.

> Note: the site is served from `/personal_website/`, so `base` is set accordingly in
> [`vite.config.ts`](vite.config.ts). If you switch to a custom domain or rename the repo to
> `hastyhippo.github.io`, change `base` back to `"/"`.

## Tech

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev) (build tool / dev server)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (component library)
- [lucide-react](https://lucide.dev) (icons)
