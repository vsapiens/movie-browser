# Movie Browser

A full-stack movie browser app with an Express API backend and a React frontend powered by Vite.

## Prerequisites

- Node.js (version 18.x or higher)
- npm (version 9.x or higher)

## Getting Started

### Server

```bash
cd server
npm install
npm run dev
```

The Express API will be running on `http://localhost:3000`.

### Client

```bash
cd client
npm install
npm run dev
```

The Vite dev server will be running on `http://localhost:3001` with API requests proxied to the Express server.

## Production

Build the client and serve it from Express:

```bash
cd client && npm run build
cd ../server && npm start
```

Visit `http://localhost:3000` — Express serves the built React app and the API.

## API Endpoints

- `GET /movies` — Returns paginated movies (query params: `page`, `pageSize`)
- `GET /movies/:id` — Returns a single movie by ID

## Testing

```bash
# Server tests (Mocha + Chai + Supertest)
cd server && npm test

# Client tests (Vitest + React Testing Library)
cd client && npm test
```

## License

This project is licensed under the MIT License.
