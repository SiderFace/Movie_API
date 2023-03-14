const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
const app = express();




app.use(morgan('common'));
app.use(express.static('public'));

//I expect this array is unnecessary, but it was in part of the exercise, so I have it included, for now; unpopulated
let topMovies = [
   { 
   Title: '',
   Director: ''
   },

   { 
   Title: '',
   Director: ''
   },

   { 
   Title: '',
   Director: ''
   },

   {
   Title: '',
   Director: ''
   },

   {
   Title: '',
   Director: ''
   },

   {
   Title: '',
   Director: ''
   },

   {
   Title: '',
   Director: ''
   },

   {
   Title: '',
   Director: ''
   },

   {
   Title: '',
   Director: ''
   },

   {
   Title: '',
   Director: ''
   },
                                                                  
];
 
//get requests
app.get('/', (req, res) => {
   res.send('! Welcome to my Top Movies !');
 });
 
app.get('/secreturl', (req, res) => {
   res.send('This is a secret URL');
 });

//source for movie data
app.get('/movies', (req, res) => {
   res.json(topMovies);
 });

//error-handling middleware defined last in the middleware chain
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
// app.use(methodOverride());
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

//listen
app.listen(8080, () => {
   console.log('Your app is listening on port 8080.');
 });