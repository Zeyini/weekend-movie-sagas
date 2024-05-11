import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';

// import movie description 
import MovieDescription from '../MovieDescription';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}

        {/* Add Movie page */}
        <Route path="/MovieDescription" exact>
        <MovieDescription />
        </Route>        
      </Router>
    </div>
  );
}

export default App;
