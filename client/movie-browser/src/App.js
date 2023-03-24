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
    poster: 'https://via.placeholder.com/200x300',
  },
  {
    id: 2,
    title: 'The Godfather',
    releaseDate: '1972-03-15',
    poster: 'https://via.placeholder.com/200x300',
  },
  // Add more sample movies as needed
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
