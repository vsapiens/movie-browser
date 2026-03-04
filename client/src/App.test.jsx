import { render, screen } from '@testing-library/react';
import App from './App';
import MovieList from './components/MovieList';

describe('App', () => {
  test('renders Movie Browser heading', () => {
    render(<App />);
    expect(screen.getByText('Movie Browser')).toBeInTheDocument();
  });

  test('renders search bar', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument();
  });

  test('renders movie titles from sample data', () => {
    render(<App />);
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
    expect(screen.getByText('The Godfather')).toBeInTheDocument();
  });
});

describe('MovieList', () => {
  test('renders movies when given a valid array', () => {
    const movies = [
      { id: 1, title: 'Test Movie', releaseDate: '2024-01-01', poster: 'https://via.placeholder.com/200x300' },
    ];
    render(<MovieList movies={movies} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Release Date: 2024-01-01')).toBeInTheDocument();
  });

  test('shows empty message when movies array is empty', () => {
    render(<MovieList movies={[]} />);
    expect(screen.getByText('No movies to display.')).toBeInTheDocument();
  });

  test('shows empty message when movies is null', () => {
    render(<MovieList movies={null} />);
    expect(screen.getByText('No movies to display.')).toBeInTheDocument();
  });

  test('shows empty message when movies is undefined', () => {
    render(<MovieList />);
    expect(screen.getByText('No movies to display.')).toBeInTheDocument();
  });

  test('renders multiple movies', () => {
    const movies = [
      { id: 1, title: 'Movie A', releaseDate: '2024-01-01', poster: 'https://via.placeholder.com/200x300' },
      { id: 2, title: 'Movie B', releaseDate: '2024-06-15', poster: 'https://via.placeholder.com/200x300' },
    ];
    render(<MovieList movies={movies} />);
    expect(screen.getByText('Movie A')).toBeInTheDocument();
    expect(screen.getByText('Movie B')).toBeInTheDocument();
  });
});
