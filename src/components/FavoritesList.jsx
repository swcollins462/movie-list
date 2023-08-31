import RemoveFavorites from "./RemoveFavorites";

function FavoritesListItem({ movie, removeFavoriteMovie }) {
    return (
        <div 
            className='img-container'
            onClick={() => removeFavoriteMovie(movie)}
        >
            <img src={movie.Poster} alt={movie.Title}></img>
            <div className='overlay'>
                <RemoveFavorites />
            </div>
        </div>
    );
}

export default function FavoritesList({ movies, onHandleClick, removeFavoriteMovie }) {
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
                    removeFavoriteMovie={removeFavoriteMovie}
                />
            ))}
        </div>
        <button className='handle right-handle' onClick={() => onHandleClick('rightHandle', 'favorites')}>
            <div className='text'>&#8250;</div>
        </button>
    </div>
  );
}
