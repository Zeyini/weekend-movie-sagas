import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom'

function MovieList() {

  const history = useHistory()
  const dispatch = useDispatch();
  // access to the state of the movie in the reducer. 
  const movies = useSelector(store => store.movies);



  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const handleImageClick = (movie) => {
    history.push('/MovieDescription') // route to the MovieDescription Componenet
    dispatch({ type: 'SET_SELECTED_MOVIE', payload: movie }) // sending 1 object movie to the reducer/store
    dispatch({ type: 'FETCH_GENRES', payload: movie.id}) // sending the action "FETCH_GENRES' to run fetchMovieDetails function
    // in this function url uses the payload sent over to fetch the movie based on id. 
  }

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {/* used useSelector to access movies and mappign through it and rendering on page1*/}
        {movies.map(movie => {
          return (
            <div key={movie.id} data-testid='movieItem' >
              <h3>{movie.title}</h3>
              {/* passing the movie argument into the handleImageClick function  */}
              <img onClick={() => handleImageClick(movie)} src={movie.poster} alt={movie.title} data-testid="toDetails" />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
