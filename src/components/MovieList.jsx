import React from 'react';

function MovieListItem( props ) {
    return (
        <div 
            className='image-container'
            key={props.movie.imdbID}
        >
            <img src={props.movie.Poster} alt={props.movie.Title}></img>
            <div className='overlay'></div>
        </div>
    );
}

export default function MovieList( props ) {
  return (
    <div className='container'>
        <div className='slider'>
            {props.movies.filter((movie) => {
                return movie.Poster !== "N/A"
            }).map((movie) => (
                <MovieListItem
                    movie={movie}
                />
            ))}
        </div>
    </div>
  );
}
