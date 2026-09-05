# Movie Browser

A full-stack movie browsing application with an Express API backend and a React frontend powered by Vite.

## Features

- Paginated movie listing with configurable page size (max 100)
- Individual movie detail lookup by ID
- Movie cards displaying poster, title, release date, rating, and genre
- Search bar UI component (ready for wiring up to the API)
- Production-ready Express server that serves the built React SPA
- Request logging with timestamped method, URL, status, and duration
- Global error handling with structured JSON error responses
- Security headers via Helmet and response compression via compression middleware

## Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Backend  | Express 4, Helmet, CORS, compression        |
| Frontend | React 19, Vite 6                            |
| Testing  | Mocha + Chai + Supertest (server), Vitest + React Testing Library (client) |
| Tooling  | nodemon (dev reload), jsdom (test env)       |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running (Development)

Start both processes in separate terminals:

```bash
# Terminal 1 — Express API on port 3000
cd server
npm run dev

# Terminal 2 — Vite dev server on port 3001 (proxies /movies to Express)
cd client
npm run dev
```

Visit `http://localhost:3001` during development.

### Running (Production)

Build the client, then serve everything from Express:

```bash
cd client && npm run build
cd ../server && npm start
```

Visit `http://localhost:3000` — Express serves the React app and the API from a single origin.

## Environment Variables

| Variable | Default | Description            |
| -------- | ------- | ---------------------- |
| `PORT`   | `3000`  | Port for the Express server |

## API Endpoints

| Method | Path          | Description                          | Query Params                          |
| ------ | ------------- | ------------------------------------ | ------------------------------------- |
| GET    | `/movies`     | Paginated list of all movies         | `page` (default 1), `pageSize` (default 10, max 100) |
| GET    | `/movies/:id` | Single movie by ID                   | —                                     |

Both endpoints return JSON. Error responses use the shape `{ error, message }`.

## Testing

```bash
# Server tests (Mocha + Chai + Supertest)
cd server && npm test

# Client tests (Vitest + React Testing Library)
cd client && npm test
```

## Project Structure

```
movie-browser/
├── server/
│   ├── app.js           # Express app, middleware, routes, in-memory data
│   ├── index.js          # Server entry point (listen + error handling)
│   └── test/
│       └── movies.test.js
├── client/
│   ├── src/
│   │   ├── App.jsx       # Root component with sample movie data
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── MovieList.jsx
│   │   └── main.jsx      # Vite entry point
│   └── vite.config.js    # Dev server, proxy, and Vitest config
└── CLAUDE.md
```

## License

MIT
