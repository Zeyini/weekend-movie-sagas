import { useSelector } from "react-redux";
// import '../components//MovieList/MovieList.css'
// import'../components/MovieList/MovieList.jsx'
// import { useLocation } from 'react-router-dom';

function MovieDescription() {
   
console.log();

const selectedMovie = useSelector(store => store.selectedMovie); // Get selected movie from store

    if (!selectedMovie) {
        return '';
      } 
    

    return (
        <>
        <section className="movies">
            <div data-testid='movieItem' key={selectedMovie.id}>
              <img src={selectedMovie.poster} alt={selectedMovie.title}/>
              <h3>{selectedMovie.description}</h3>
            </div>
        </section>
    </>
       
    )
}

export default MovieDescription