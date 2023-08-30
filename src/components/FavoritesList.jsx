import React from 'react';

function FavoritesListItem( props ) {
    return (
        <div 
            className='img-container'
        >
            <img src={props.movie.Poster} alt={props.movie.Title}></img>
            <div className='overlay'></div>
        </div>
    );
}

export default function FavoritesList({ movies, onHandleClick }) {
  return (
    <div className='container'>
        <button className='handle left-handle' onClick={() => onHandleClick('leftHandle', 'favorites')}>
            <div className='text'>&#8249;</div>
        </button>
        <div className='favorites-slider'>
            {movies.filter((movie) => {
                return movie.Poster !== "N/A"
            }).map((movie) => (
                <FavoritesListItem
                    movie={movie}
                    key={movie.imdbID}
                />
            ))}
        </div>
        <button className='handle right-handle' onClick={() => onHandleClick('rightHandle', 'favorites')}>
            <div className='text'>&#8250;</div>
        </button>
    </div>
  );
}
