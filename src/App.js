import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import FavoritesList from './components/FavoritesList';
import SearchBox from './components/SearchBox';
import MovieListHeading from './components/MovieListHeading';
import useDebounceEffect from './components/useDebounceEffect';
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
    fetch('https://nfqtg9-8088.csb.app/api/movies')
      .then(x => x.json())
      .then(response => {
        setFavorites(response)
      });
  }

  useEffect(loadFavorites, []);

  useDebounceEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue], 500)

  function onHandleClick(handle, list) {
    const sliderIndex = parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--${list}-slider-index`));
    if (handle === 'leftHandle') {
      document.documentElement.style.setProperty(`--${list}-slider-index`, sliderIndex - 1);
    } else {
      document.documentElement.style.setProperty(`--${list}-slider-index`, sliderIndex + 1);
    }
  }

  function addFavoriteMovie({ imdbID, Title, Poster }) {
    if (!favorites.find(e => e.imdbID === imdbID)) {
      fetch('https://nfqtg9-8088.csb.app/api/movies/new', {
        method: 'POST',
        body: JSON.stringify({
          imdbID,
          Title,
          Poster
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        mode: 'cors'
      })
        .then(x => x.json())
        .then(loadFavorites);
    } 
  };

  function removeFavoriteMovie({ imdbID }) {
    fetch('https://nfqtg9-8088.csb.app/api/movies/' + imdbID, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      mode: 'cors'
    })
      .then(x => x.json())
      .then(loadFavorites);
  };

  return (
    <div className='App'>
      <div className='row'>
        <div className='header'>
          <MovieListHeading heading='Movies' />
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <MovieList 
          movies={movies}
          onHandleClick={onHandleClick}
          addFavoriteMovie={addFavoriteMovie} />
      </div>
      <div className='row'>
      <div className='header'>
          <MovieListHeading heading='Favorites' />
        </div>
        <FavoritesList 
          movies={favorites}
          onHandleClick={onHandleClick}
          removeFavoriteMovie={removeFavoriteMovie} />
      </div>
    </div>
  );
}

export default App;
