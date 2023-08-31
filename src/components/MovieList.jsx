import AddFavorites from "./AddFavorites";

function MovieListItem({ movie, addFavoriteMovie }) {
    return (
        <div 
            className='img-container'
            onClick={() => addFavoriteMovie(movie)}
        >
            <img src={movie.Poster} alt={movie.Title}></img>
            <div className='overlay'>
                <AddFavorites />
            </div>
        </div>
    );
}

export default function MovieList({ movies, onHandleClick, addFavoriteMovie }) {
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
                    addFavoriteMovie={addFavoriteMovie}
                />
            ))}
        </div>
        <button className='handle right-handle' onClick={() => onHandleClick('rightHandle', 'movie')}>
            <div className='text'>&#8250;</div>
        </button>
    </div>
  );
}
