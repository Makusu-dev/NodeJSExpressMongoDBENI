const express = require("express");
const app=express();
const ejs = require('ejs');
const { validationResult, body } = require('express-validator');

//configuration ejs
app.set('view engine','ejs');


const port=3000;
listCities = ['Paris','Lome','Montreal','Nantes']

user= {
  name: "max",
  age: 34
}

// Middleware très important pour les formulaires car il permet de décoder le corps des requêtes
app.use(express.urlencoded({ extended: false }));

// Middleware global s'appliquant à toute l'application
app.use((req, res, next) =>{
  console.log(req.method,req.headers['user-agent']);
  next();
})

// Middleware ne s'appliquant qu'aux routes "/cities/:id" et à leurs dérivés
app.use('/cities/:id', (req, res, next) => {
  console.log("Middleware : vérification de l'id")
  let id = req.params.id;
  if (id > 0 && id <= listCities.length)
    next();
  else
    res.send("Erreur : id de ville inconnu !");
});

// Route initiale retournant "Hello World!"
app.get("/",(req, res)=>{
  res.render('index',{user: user,cities: listCities})
  //res.sendFile("./src/index.html")
  // res.send("Hello World!");
});

// Route globale retournant le tableau de villes
app.get('/cities',(req,res)=>{
  res.render('cities', {cities: listCities});
});

// Route post qui ajoute une ville au tableau de ville
app.post('/cities', body('city').isLength({ min: 3, max: 100}).escape(), (req, res) => {
  // On récupère un objet "validationResult" contenant les erreurs sur le champ
  const result = validationResult(req);
  // Si cet objet est vide, tout s'est bien passé !
  if (result.isEmpty()) {
    const city = req.body.city;
    console.log("City :", city);
    listCities.push(city);
    return res.redirect('/cities');
  }
  // Sinon je renvoie les erreurs
  res.send({errors: result.array()});
});

// Route retournant une ville spécifique
app.get('/cities/:id', (req, res) => {
  let id = req.params.id;
  res.send(listCities[id - 1]);
});

// Route retournant un objet JSON
app.get('/user', (req, res) => {
  res.json(user);
});

// Middleware pour les routes non définies
app.use((req, res, next) => {
  res.status(404).send("404 Page Not Found !");
});


app.listen(port, ()=>{
  console.log(`Server running on port ${port}/`);
});