# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack movie browser app with an Express backend and a Vite-powered React frontend, organized as a monorepo.

## Repository Structure

- `server/` — Express API serving movie data (in-memory) and static React build
  - `app.js` — Express app config, middleware, routes (exports `app`)
  - `index.js` — Thin entry point that starts the server
- `client/` — React 19 SPA (Vite + Vitest)

## Commands

### Server (run from `server/`)
- `npm start` — Start production server (`node index.js`, port 3000)
- `npm run dev` — Start dev server with nodemon auto-reload
- `npm test` — Run API tests (`mocha --recursive --exit`)

### Client (run from `client/`)
- `npm run dev` — Start Vite dev server (port 3001, proxies `/movies` to server on port 3000)
- `npm run build` — Production build (output to `dist/`)
- `npm run preview` — Preview production build
- `npm test` — Run Vitest tests once
- `npm run test:watch` — Run Vitest in watch mode

## Architecture

**Backend** (`server/app.js`): Express app split into `app.js` (config/routes) and `index.js` (server start). Middleware: helmet, compression, CORS, express.json. Serves the React production build from `../client/dist` as static files with a catch-all route for client-side routing.

**API endpoints:**
- `GET /movies` — Returns paginated movies (query params: `page`, `pageSize`)
- `GET /movies/:id` — Returns a single movie by ID (404 if not found)

**Frontend** (`client/src/`): Props-driven React 19 app with Vite bundler. No state management library or routing. App.jsx holds hardcoded sample movie data and renders three components:
- `components/Header.jsx` — App title bar
- `components/SearchBar.jsx` — Search input (UI only, not wired up)
- `components/MovieList.jsx` — Renders movie cards in a flexbox grid

**Data flow:** Frontend currently uses static sample data in App.jsx — no API integration yet. The backend and frontend are independent; in production the server serves the built React app. In development, Vite's dev proxy routes `/movies` requests to the Express server.

## Testing

- **Server tests** use Mocha + Chai + Supertest (`server/test/movies.test.js`), importing from `server/app.js`
- **Client tests** use Vitest + React Testing Library (`src/*.test.jsx`), configured in `vite.config.js`

## Development Workflow

1. Start the Express server: `cd server && npm run dev`
2. Start the Vite dev server: `cd client && npm run dev`
3. Visit `http://localhost:3001` for development (Vite proxies API calls to Express)
4. For production: `cd client && npm run build`, then `cd server && npm start` and visit `http://localhost:3000`
