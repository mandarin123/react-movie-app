import React from 'react';

const MovieList = (props) => {

    const FavouritesComponent = props.favouritesComponent;

    return (
        <>
            {props.movies.map((movie, index) => 
                <div className='image-container justify-content-start m-4'>
                    <img src={movie.Poster} alt={movie.Title}></img>
                    <div 
                        onClick={() => props.handleFavouritesClick(movie)} 
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <FavouritesComponent />
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieList;
