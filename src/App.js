import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import FavoritesList from './components/FavoritesList';
import SearchBox from './components/SearchBox';
import './App.css';
import MovieListHeading from './components/MovieListHeading';

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
    fetch("https://nfqtg9-8088.csb.app/api/movies")
      .then(x => x.json())
      .then(response => {
        setFavorites(response)
      });
  }

  useEffect(loadFavorites, []);

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  function onHandleClick(handle, list) {
    const sliderIndex = parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--${list}-slider-index`));
    if (handle === 'leftHandle') {
      document.documentElement.style.setProperty(`--${list}-slider-index`, sliderIndex - 1);
    } else {
      document.documentElement.style.setProperty(`--${list}-slider-index`, sliderIndex + 1);
    }
  }

  return (
    <div className="App">
      <div className='row'>
        <div className='header'>
          <MovieListHeading heading='Movies' />
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <MovieList 
          movies={movies}
          onHandleClick={onHandleClick} />
      </div>
      <div className='row'>
      <div className='header'>
          <MovieListHeading heading='Favorites' />
        </div>
        <FavoritesList 
          movies={favorites}
          onHandleClick={onHandleClick} />
      </div>
    </div>
  );
}

export default App;
