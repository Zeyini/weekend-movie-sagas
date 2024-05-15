import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_GENRES', fetchMovieDetails); // gets movie details 
}

// Gets the detailed data for one movie and puts it into the
// movieDetails reducer:
function* fetchMovieDetails(action) {
  try {
    // Fetch the details about a single movie:
    const idOfMovieToFetch = action.payload
    const detailsResponse = yield axios({
      method: 'GET',
      url: `/api/movies/${idOfMovieToFetch}`
    })

    // Update the movieDetails reducer to hole the object
    // of movie details data we got from the server:
    const detailsData = detailsResponse.data
    console.log('This is the data recieved from the server',detailsData)
    yield put({
      type: 'SET_MOVIE_DETAILS',
      payload: detailsData
    })
    
  } catch (error) {
    console.log('fetchMovieDetails error:', error)
  }
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();
//set movies DETAILS received from server 

const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Reducer to hold the details data for a single
// movie:
// Shaped like:
// { id, title, poster, description, genres: []}
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

//used to store if a movie is selected 
const selectedMovie = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MOVIE':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    selectedMovie,
    movieDetails
    
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
