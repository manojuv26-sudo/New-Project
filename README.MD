# Book Finder

A small React + Vite app that searches the Open Library catalog and displays book results with covers.

## Features

- Search by title, author, ISBN, subject (via Open Library search API)
- Result cards with cover image, author list, first publish year, subjects
- Pagination and simple filters (ebooks)
- Clean UI, accessible links to OpenLibrary

## Run locally

1. Node 18+ recommended.
2. Install dependencies:
   ```bash
   npm install
   Start dev server:
   ```

bash
Copy code
npm run dev
Open http://localhost:5173.

Build for production
bash
Copy code
npm run build
npm run preview
Notes / customization
Uses https://openlibrary.org/search.json. No API key required.

Cover images come from covers.openlibrary.org.

If you want to host behind a proxy or on platforms with special rules (Bolt/Vercel), the app is static — just build and deploy.

Enjoy — and if you want additional features (saved favorites, local cache, map of libraries, ISBN lookup, or a backend proxy with rate-limiting), tell me which and I’ll extend the code.

yaml
Copy code

---

That’s the full codebase. It’s intentionally simple but production-ready: modular components, clear API wrapper, styling, and UX niceties.

If you want:

- the project in a ZIP or a GitHub-ready repo (I can output a `git`-ready file tree and commands),
- extra features (favorites + localStorage, server-side caching, advanced filters, UI redesign, Tailwind conversion, tests),
  or
- you want me to analyze the code hosted at `https://book-finder-applicat-e27h.bolt.host` specifically — paste the repo or the files here and I’ll inspect and produce diffs and recommendations —

tell me which direction and I’ll extend this exact code instantly.
