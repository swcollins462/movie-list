import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('avengers');

  function getMovieRequest(searchValue) {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=848edfda`;
    fetch(url)
      .then(x => x.json())
      .then(response => {
        if(response.Search) {
          setMovies(response.Search);
        }
      });
  }

  const loadFavorites = () => {
    fetch("https://nfqtg9-8080.csb.app/api/movies")
      .then(x => x.json())
      .then(response => {
        setFavorites(response)
      });
  }

  useEffect(loadFavorites, []);

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className="App">
      <div className='row'>
        <MovieList movies={movies} />
      </div>
      <div className='row'>
        <MovieList movies={favorites} />
      </div>
    </div>
  );
}

export default App;
