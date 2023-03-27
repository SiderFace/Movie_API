const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
const app = express();
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

//models.js definitions
const Movies = Models.Movie;
const Users = Models.User;

//Connect to the myFlixDB database
mongoose.connect('mongodb://127.0.0.1:27017/myFlixDB');

//Dependencies
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}) );
app.use(morgan('common') );
app.use(express.static('public') );

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');



//Welcome , ping message
app.get('/', (req, res) => {
   res.send("! Welcome to my Top 20 Movies !");
});

//READ - Return a list of ALL movies
app.get('/movies', passport.authenticate('jwt', {session:false}), (req, res) => {
   Movies.find()
      .then((movies) => {
         res.status(201).json(movies);
      })
      .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
      });
});

//READ - Returns data about a single movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
   Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
         res.json(movie);
      })
      .catch((err) => {
         console.error(err);
         res.status(500).send("Error: " + err);
      });
});
   

//READ - Return data about a genre by name
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
   Movies.findOne({ 'Genre.Name': req.params.genreName })
      .then((movie) => {
         res.json(movie.Genre);
      })
      .catch((err) => {
         console.error(err);
         res.status(500).send("Error: " + err);
      });
});
 

//READ - Return data about a director by name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
   Movies.findOne({ 'Director.Name': req.params.directorName })
      .then((movie) => {
         res.json(movie.Director);
      })
      .catch((err) => {
         console.error(err);
         res.status(500).send("Error: " + err);
      });
}); 

// Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.find()
      .then((users) => {
         res.status(201).json(users);
      })
      .catch((err) => {
         console.error(err);
         res.status(500).send("Error: " + err);
      });
});

//CREATE - Allow new users to register
app.post('/users', (req, res) => {
   Users.findOne({Username: req.body.Username})
      .then((user) => {
         if (user) {
            return res.status(400).send(req.body.Username + " already exists");
         } else {
            Users
               .create({
                  Username: req.body.Username,
                  Password: req.body.Password,
                  Email: req.body.Email,
                  Birthday: req.body.Birthday
               })
               .then((user) =>{res.status(201).json(user) })
               .catch((error) => {
                  console.error(error);
                  res.status(500).send("Error: " + error);
               })
         }
      })
      .catch((error) => {
         console.error(error);
         res.status(500).send("Error: " + error);
      });
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.findOne({Username: req.params.Username})
      .then((user) => {
         res.status(200).json(user);
      })
      .catch((err) => {
         console.error(err);
         res.status(500).send("Error: " + err);
      });
});

//UPDATE - Allow users to update their user info
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.findOneAndUpdate({ Username: req.params.Username },
      {$set:{
         Username: req.body.Username,
         Password: req.body.Password,
         Email: req.body.Email,
         Birthday: req.body.Birthday
      }},
      { new: true },
      (err, updatedUser) => {
         if(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
         } else {
            res.json(updatedUser);
         }
      }
   );
});

//CREATE - Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieTitle', passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.findOneAndUpdate(
      {Username: req.params.Username},
      {$push: {FavoriteMovies: req.params.MovieTitle} },
      { new: true },   
      (err, updatedUser) => {
         if (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
         } else {
            res.json(updatedUser);
         }
      }
   );
});

//DELETE - Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.findOneAndUpdate({ Username: req.params.Username },
      {$pull: { FavoriteMovies: req.params.MovieTitle } },
      { new: true },
      (err, updatedUser) => {
         if (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
         } else {
            res.json(updatedUser);
         }
      }
   );
});

//DELETE - Allow existing users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
         if (!user) {
            res.status(400).send(req.params.Username + " was not found");
         } else {
            res.status(200).send(req.params.Username + " was deleted.");
         }
      })
      .catch((err) => {
         console.error(err);
         res.status(500).send("Error: " + err);
      });
});

// app.use(methodOverride());
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send("Something broke!");
});

//listen
app.listen(8080, () => {
   console.log("Your app is listening on port 8080.");
});