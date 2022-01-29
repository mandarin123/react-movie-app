import React, { useEffect, useState } from 'react';
import './App.css'
import AddFavourites from './components/AddFavourites';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import RemoveFavourites from './components/RemoveFavourites';
import SearchBox from './components/SearchBox';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMoviesRequest = async() => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=97646d85`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  useEffect(() =>{
    getMoviesRequest(searchValue);
  },[searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    setFavourites(movieFavourites);
  },[]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };

  const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='container_sm row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
        <MovieList 
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouritesComponent={AddFavourites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites"/>
      </div>
      <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
        <MovieList 
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouritesComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
