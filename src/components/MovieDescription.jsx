import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'


function MovieDescription() {

  const history = useHistory()

  const selectedMovie = useSelector(store => store.selectedMovie); // Get selected movie from store
  const movieDetails = useSelector(store => store.movieDetails) // get all of the movie details stored in the reducer/store 

  if (!selectedMovie) {
    return '';
  }

console.log('WHAT IS THIISI S ',movieDetails.genres)

  //on click route us home
  function goHome() {
    history.push('/') // route to the MovieList Componenet
  }


  return (
    <>
      <section className="movies">
        <div data-testid="movieDetails" key={selectedMovie.id}>
          <img src={selectedMovie.poster} alt={selectedMovie.title} />
          <h3>{selectedMovie.description}</h3>
          {/* <h4>{JSON.stringify(genres)}</h4> */}
          <button onClick={goHome} data-testid="toList">HOME</button>
        </div>
      </section>
    {/* mapping through the genres array only for the id selected using req.params.id */}
      <ul>
        {
          movieDetails.genres && movieDetails.genres.map((genre) => {
            return (
              <li key={genre.id}>{genre.name}</li>
            )
          })
        }
      </ul>

   {/* <h4>{JSON.stringify(  movieDetails.genres)}</h4>

   <h4>{JSON.stringify( movieDetails)}</h4> */}
    </>

  )
}

export default MovieDescription