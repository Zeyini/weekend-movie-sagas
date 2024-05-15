const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Sends back an array of all of the movies:
  // Shaped like:
  // [
  //   {
  //     id: 14,
  //     title: 'Toy Story',
  //     poster: 'images/toy-story.jpg',
  //   },
  //   {...},
  //   {...},
  //   {...}
  // ]
  const query = `
  SELECT * FROM "movies"
  ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});
// Sends back a single movie object that includes
// description and associated genres:
  // Shaped like:
    // {
    //   id: 14,
    //   title: 'Toy Story',
    //   poster: 'images/toy-story.jpg',
    //   description: 'Toy Story is a 1995 American...',
    //   genres: [
    //     {id: 1, name: 'Adventure'},
    //     {id: 2, name: 'Animated'},
    //     {id: 4, name: 'Comedy'}
    //   ]
    // }
router.get('/:id', (req, res) => {
  let movieId = req.params.id
  console.log("Movie ID:", movieId);
  const sqlText = `
    SELECT
      movies.id AS movie_id,
      movies.title,
      movies.poster,
      movies.description,
      genres.id AS genre_id,
      genres.name AS genre_name
    FROM movies
      JOIN movies_genres
        ON movies.id = movies_genres.movie_id
      JOIN genres
        ON movies_genres.genre_id = genres.id
      WHERE movies.id = $1;
  `
  
  const sqlValues = [movieId]

  pool.query(sqlText,sqlValues)
    .then((dbRes) => {
      // The array of objects our query returned:
      const joinedData = dbRes.rows
        //  👆 example of how joinedData looks in `transforming_data.md`
console.log('DB RESPONSE with SQL query!',joinedData )
      // Building up the object that'll contain the data
      // we want to send back to the client:
      const detailsObject = {
        id: joinedData[0].movie_id,
        title: joinedData[0].title,
        poster: joinedData[0].poster,
        description: joinedData[0].description
      }
        //  👆 example of how detailsObject looks in `transforming_data.md`


      // Now we need to build the genres array that we want to
      // include in the detailsObject that we're going to send
      // to the client:
      const genres = joinedData.map((row) => {
        return {
          id: row.genre_id,
          name: row.genre_name
        }
      })
        //  👆 example of how genres looks in `transforming_data.md`

      // Add the genres array into the detailsObject object:
      detailsObject.genres = genres
        //  👆 example of how detailsObject looks in `transforming_data.md`

      // Now that we've shaped our data into the object we wanted,
      // we send it to the client:
      res.send(detailsObject)
    })
    .catch((dbErr) => {
      console.log('GET /api/movies/:id error:', dbErr)
      res.sendStatus(500)
    })
})

    // -------------------------------------------------------------------------------------
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
