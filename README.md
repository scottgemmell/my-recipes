# [ My ] Recipes

A clean, minimal recipe app built from the **Stitch "Culinary Zen"** design files using
**React + TypeScript + Redux Toolkit + React Router**, styled with **Tailwind CSS**.

## Stack

- **React 18** + **TypeScript** (Vite)
- **Redux Toolkit** + **React Redux** for state
- **React Router** for navigation
- **Tailwind CSS** with the Culinary Zen design tokens (colors, type scale, spacing)

## What it does

Two screens, faithful to the Stitch designs:

- **Collection** (`/`) — a bento-style grid of recipe cards with a featured hero card.
- **Recipe detail** (`/recipe/:slug`) — hero image, recipe meta, an interactive
  ingredient checklist, numbered instructions, and an ingredient gallery.

Redux Toolkit drives the real interactive state:

- **Favorites** — the ❤️ on each card toggles `favorite` in the store.
- **Ingredient checklist** — checking an ingredient on the detail page strikes it
  through and persists in the store (per recipe).

## Project structure

```
src/
  app/
    store.ts          # configureStore + RootState / AppDispatch types
    hooks.ts          # typed useAppSelector / useAppDispatch
  features/recipes/
    types.ts          # Recipe / Ingredient / Step types
    recipesData.ts    # seed data ported from the Stitch designs
    recipesSlice.ts   # slice: toggleFavorite, toggleIngredient + selectors
  components/
    Navbar.tsx  Footer.tsx  Icon.tsx  RecipeCard.tsx
  pages/
    CollectionPage.tsx
    RecipeDetailPage.tsx
  App.tsx             # routes
  main.tsx            # Provider + Router bootstrap
  index.css           # Tailwind layers + Culinary Zen component styles
tailwind.config.js    # design tokens
```

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev      # start the dev server (http://localhost:5174)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Design source

Design tokens and copy come from the Stitch files under
`stitch_my_recipes/` (`00_my_recipes/DESIGN.md` and the two `code.html` screens).
