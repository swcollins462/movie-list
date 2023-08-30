import React from 'react';

function MovieListItem( props ) {
    return (
        <div 
            className='img-container'
        >
            <img src={props.movie.Poster} alt={props.movie.Title}></img>
            <div className='overlay'></div>
        </div>
    );
}

export default function MovieList({ movies, onHandleClick }) {
  return (
    <div className='container'>
        <button className='handle left-handle' onClick={() => onHandleClick('leftHandle', 'movie')}>
            <div className='text'>&#8249;</div>
        </button>
        <div className='movie-slider'>
            {movies.filter((movie) => {
                return movie.Poster !== "N/A"
            }).map((movie) => (
                <MovieListItem
                    movie={movie}
                    key={movie.imdbID}
                />
            ))}
        </div>
        <button className='handle right-handle' onClick={() => onHandleClick('rightHandle', 'movie')}>
            <div className='text'>&#8250;</div>
        </button>
    </div>
  );
}
