import React from 'react';
import './MovieList.css';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list">
        <p className="movie-list-empty">No movies to display.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <div className="movie-card-poster">
            <img src={movie.poster} alt={movie.title} />
            {movie.rating && (
              <span className="movie-card-rating">{movie.rating}</span>
            )}
          </div>
          <div className="movie-card-info">
            <h2>{movie.title}</h2>
            <div className="movie-card-meta">
              <p>Release Date: {movie.releaseDate}</p>
              {movie.genre && (
                <>
                  <span className="movie-card-dot" />
                  <span className="movie-card-genre">{movie.genre}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
