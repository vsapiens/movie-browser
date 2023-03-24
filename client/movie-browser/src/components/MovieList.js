import React from 'react';
import './MovieList.css';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={movie.poster} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.releaseDate}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
