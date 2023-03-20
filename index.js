const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
const app = express();
const uuid = require('uuid');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

//get
app.get('/', (req, res) => {
   res.send('! Welcome to my Top Movies !');
 });


let users = [
   {
      id: 1,
      Name: "Sean Siders",
      Username: "SiderFace",
      Password: "SidersP@55w0rd!",
      Email: "siderface@outlook.com",
      Birthday: "1984-06-30",
      favoriteMovies: ["Cool Hand Luke"]
   },

   {
      id: 2,
      Name: "Audrey Grace",
      Username: "Evee",
      Password: "AGS!2015",
      Email: "AudreyGraceSiders@gmail.com",
      Birthday: "2015-06-29",
      facoriteMovies: ["The Jungle Book"]
   },

   {
      id: 3,
      Name: "John Doe",
      Username: "User123",
      Passwrod: "Pass123!",
      Email: "user@mail.com",
      Birthday: "1776-07-04",
      favoriteMovies: []
   }
];

let movies = [

   {
   Title: "The Thin Red Line", 
   Description: "Adaptation of James Jones' autobiographical 1962 novel, focusing on the conflict at Guadalcanal during the second World War.",
   Genre: {
      Name: "War",
      Description: "A War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama.",
   },
   Director: {
      Name: "Terrance Malick",
      bio: "Terrance Malick is an American filmmaker whose reclusive, sporadic career was marked by films that were celebrated for their poetic beauty.",
      Birthyear: "1943",
      Deathyear: "present",
   },
   year: "1998",
   },

   {
   Title: "Revolver", 
   Description: "Gambler Jake Green enters into a game with potentially deadly consequences.",
   Genre: {
      Name: "Crime",
      Description: "Crime films focus on the exciting elements of both successful and unsuccessful crimes.",
   },
   Director: {
      Name: "Guy Ritchie",
      bio: "Filmmaker Guy Ritchie is known for his modern take on British gangster movies and for being married to pop star Madonna.",
      Birthyear: "1968",
      Deathyear: "present",
   },
   year: "2005",
   },

   {
   Title: "Cool Hand Luke", 
   Description: "A laid back Southern man is sentenced to two years in a rural prison, but refuses to conform.",
   Genre: {
      Name: "Drama",
      Description: "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward.",
   },
   Director: {
      Name: "Stuart Rosenberg",
      bio: "American television and film director who was best known for the 1967 classic Cool Hand Luke.",
      Birthyear: "1927",
      Deathyear: "2007",
   },
   year: "1967",
   },

   {
   Title: "Millenium Actress", 
   Description: "A TV interviewer and his cameraman meet a former actress and travel through her memories and career.",
   Genre: {
      Name: "Fantasy",
      Description: "Fantasy films have fantastic themes; usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. ",
   },
   Director: {
      Name: "Satoshi Kon",
      bio: "Japanese film director, animator, screenwriter and manga artist from Sapporo, Hokkaido and a member of the Japanese Animation Creators Association (JAniCA).",
      Birthyear: "1963",
      Deathyear: "2010",
   },
   year: "2001",
   },

   {
   Title: "Amores Perros",
   Description: "A horrific car accident connects three stories, each involving characters dealing with loss, regret, and life's harsh realities, all in the name of love.",
   Genre: {
      Name: "Thriller",
      Description: "Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety.",
   },
   Director: {
      Name: "Alejandro González Iñárritu",
      bio: "Alejandro González Iñárritu is a Mexican director and producer whose movies—which often featured interconnected stories and a nonlinear narrative—placed him at the forefront of the Mexican film renaissance in the early 21st century.",
      Birthyear: "1963",
      Deathyear: "present",
   },
   year: "2000",
   },

   {
   Title: "The Good, the Bad and the Ugly", 
   Description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
   Genre: {
      Name: "Western",
      Description: "Westerns are primarily set in the American Old West between the late eighteenth century and late nineteenth century and tell the stories of cowboys, settlers, and outlaws exploring the western frontier and taming the Wild West.",
   },
   Director: {
      Name: "Sergio Leone",
      bio: "Sergio Leone was an Italian motion-picture director, who was known primarily for his popularization of the “spaghetti western”, a subgenre of movies that were made in Italy but set in the 19th-century American West.",
      Birthyear: "1929",
      Deathyear: "1989",
   },
   year: "1966",
   },

   {
   Title: "The Royal Tenenbaums", 
   Description: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons.",
   Genre: {
      Name: "Comedy",
      Description: "Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment.",
   },
   Director: {
      Name: "Wes Anderson",
      bio: "Wesley Wales Anderson is an American director and screenwriter known for the distinctive visual aesthetic of his quirky comedies and for his collaboration with screenwriter and actor Owen Wilson.",
      Birthyear: "1969",
      Deathyear: "present",
   },
   year: "2001",
   },

   {
   Title: "Drive,", 
   Description: "A mysterious Hollywood action film stuntman gets in trouble with gangsters when he tries to help his neighbor's husband rob a pawn shop while serving as his getaway driver,",
   Genre: {
      Name: "Arthouse",
      Description: "Characteristics of arthouse action films include stylized action, an arthouse atmosphere, and a disjointed, fragmented narrative with more complexity than the typical action flick.",
   },
   Director: { 
      Name: "Nicolas Winding Refn",
      bio: "Writer, director, and producer Nicolas Winding Refn was born in Copenhagen, Denmark, in 1970, to Anders Refn, a film director and editor, and Vibeke Winding (née Tuxen), a cinematographer.",
      Birthyear: "1970",
      Deathyear: "present",
   },
   year:"2011",
   },

   {
   Title: "The Jungle Book", 
   Description: "Bagheera the Panther and Baloo the Bear have a difficult time trying to convince a boy to leave the jungle for human civilization.",
   Genre: {
      Name: "Musical",
      Description: "Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by dancing.",
   },
   Director: {
      Name: "Wolfgang Reitherman",
      bio: "Wolfgang Reitherman was a German-born American animator who was one of Disney's Nine Old Men.",
      Birthyear: "1909",
      Deathyear: "1985",
   },
   year: "1967",
   },

   {
   Title: "Arrival", 
   Description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecrafts appear around the world.",
   Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies.",
   },
   Director: {
      Name: "Denis Villeneuve", 
      bio: "Denis Villeneuve is a French Canadian film director and writer who was known for his deft hand at making visually inventive, sensitive, and unflinching films that often focus on issues of human trauma and identity.",
      Birthyear: "1967",
      Deathyear: "present",
   },
   year: "2016",
   },
];


//READ - Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
   res.status(200).json(movies);
 });

 //READ - Returns data about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
   const {title} = req.params;
   const movie = movies.find(movie => movie.Title === title);

   if (movie) {
      res.status(200).json(movie);
   } else {
      res.status(400).send("No such movie");
   }
});

//READ - Return data about a genre by name
app.get('/movies/genre/:genreName', (req, res) => {
   const {genreName} = req.params;
   const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

   if (genre) {
      res.status(200).json(genre);
   } else {
      res.status(400).send("No such genre");
   }
});

//READ - Return data about a director by name
app.get('/movies/director/:directorName', (req, res) => {
   const {directorName} = req.params;
   const director = movies.find(movie => movie.Director.Name === directorName).Director;

   if (director) {
      res.status(200).json(director);
   } else {
      res.status(400).send("No such director");
   }
});

//CREATE - Allow new users to register
app.post('/users', (req, res) => {
   const newUser = req.body;

   if (newUser.Name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
   }else {
      res.status(400).send("User needs a Name");
   }
})

//UPDATE - Allow users to update their user info
app.put('/users/:id', (req, res) => {
   const {id} = req.params;
   const updatedUser = req.body;

   let user = users.find(user => user.id == id);
   if (user) {
      user.Name = updatedUser.Name;
      res.status(200).json(user);
   }else{
      res.status(400).send("No such user");
   }
})

//CREATE - Allow users to add a movie to their list of favorites
app.post('/users/:id/:movieTitle', (req, res) => {
   const {id, movieTitle} = req.params;
   let user = users.find(user => user.id == id);

   if (user) {
      user.favoriteMovies.push(movieTitle);
      res.status(200).send(`${movieTitle} has been added to ${id}'s Favorites`);
   }else{
      res.status(400).send("No such movie");
   }
})

//DELETE - Allow users to remove a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
   const {id, movieTitle} = req.params;
   let user = users.find(user => user.id == id);

   if (user) {
      user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
      res.status(200).send(`${movieTitle} has been removed from ${id}'s Favorites`);
   }else{
      res.status(400).send("No such movie");
   }
})

//DELETE - Allow existing users to deregister
app.delete('/users/:id', (req, res) => {
   const {id} = req.params;

   let user = users.find(user => user.id == id);
   if (user) {
      users = users.filter(user => user.id != id);
      res.status(200).send(`User ${id} has been deleted`);
   }else{
      res.status(400).send("No such user");
   }
})


//error-handling middleware defined last in the middleware chain
app.use(bodyParser.urlencoded({
   extended: true
}));

// app.use(methodOverride());
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

//listen
app.listen(8080, () => {
   console.log('Your app is listening on port 8080.');
 });