import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

const sampleMovies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    releaseDate: '1994-09-22',
    poster: 'https://via.placeholder.com/400x600/1a1a2e/e8b84b?text=Shawshank',
    rating: '9.3',
    genre: 'Drama',
  },
  {
    id: 2,
    title: 'The Godfather',
    releaseDate: '1972-03-15',
    poster: 'https://via.placeholder.com/400x600/1a1a2e/e8b84b?text=Godfather',
    rating: '9.2',
    genre: 'Crime',
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    releaseDate: '1994-10-14',
    poster: 'https://via.placeholder.com/400x600/1a1a2e/e8b84b?text=Pulp+Fiction',
    rating: '8.9',
    genre: 'Crime',
  },
];

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <MovieList movies={sampleMovies} />
    </div>
  );
}

export default App;
