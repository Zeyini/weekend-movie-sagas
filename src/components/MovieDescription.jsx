import { useSelector } from "react-redux";
// import '../components//MovieList/MovieList.css'
// import'../components/MovieList/MovieList.jsx'

function MovieDescription() {
 

    const movies = useSelector(store => store.movies);

    // if (!movie) {
    //     return null;
    // }
    

    return (
        <>
        <section className="movies">
           

        {/* <h1>{JSON.stringify(movies)}</h1> */}
        {/* <h1>{JSON.stringify(movies)}</h1> */}
        

        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.id === }</h3>
              <img src={movie.poster} alt={movie.title}/>
            </div>
          );
        })}

        </section>
    </>
       
    )
}

export default MovieDescription