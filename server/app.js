const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Middleware FIRST
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging — logs method, url, status, and duration for every request
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? 'ERROR' : res.statusCode >= 400 ? 'WARN' : 'INFO';
    console.log(`[${new Date().toISOString()}] ${level} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
});

const movies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    releaseYear: 1994,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    genre: 'Drama'
  },
  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    releaseYear: 1972,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    rating: 9.2,
    genre: 'Crime, Drama'
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    releaseYear: 1994,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 8.9,
    genre: 'Crime, Drama'
  },
];

// Read all (GET) with pagination
app.get('/movies', (req, res) => {
  // Validate page param if provided
  if (req.query.page !== undefined) {
    const page = Number(req.query.page);
    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({
        error: 'Invalid page parameter',
        message: 'Page must be a positive integer (e.g. ?page=1).',
      });
    }
  }

  // Validate pageSize param if provided
  if (req.query.pageSize !== undefined) {
    const pageSize = Number(req.query.pageSize);
    if (!Number.isInteger(pageSize) || pageSize < 1) {
      return res.status(400).json({
        error: 'Invalid pageSize parameter',
        message: 'Page size must be a positive integer (e.g. ?pageSize=10).',
      });
    }
    if (pageSize > 100) {
      return res.status(400).json({
        error: 'Invalid pageSize parameter',
        message: 'Page size must not exceed 100.',
      });
    }
  }

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const paginatedMovies = movies.slice(startIndex, endIndex);

  res.json({
    data: paginatedMovies,
    page,
    pageSize,
    total: movies.length,
    totalPages: Math.ceil(movies.length / pageSize),
  });
});

// Read one (GET)
app.get('/movies/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: 'Invalid movie ID',
      message: `"${rawId}" is not a valid movie ID. Please use a positive integer.`,
    });
  }

  const movie = movies.find(m => m.id === id);
  if (!movie) {
    return res.status(404).json({
      error: 'Movie not found',
      message: `No movie found with ID ${id}.`,
    });
  }
  res.json(movie);
});

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route LAST: serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Global error handler — catches unhandled errors in route handlers
app.use((err, req, res, _next) => {
  console.error(`[${new Date().toISOString()}] ERROR Unhandled exception on ${req.method} ${req.originalUrl}:`, err.stack || err);

  // User-facing: generic message. Admin: full error in logs above.
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong. If this persists, please contact the administrator.',
  });
});

module.exports = app;
