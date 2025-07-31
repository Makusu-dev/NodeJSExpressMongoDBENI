const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/cities_app";
const client = new MongoClient(uri, { useNewUrlParser: true });
const db = client.db("cities_app");
client.connect()
  .then(async () => {
    console.log('Connected successfully to server');
    db.createCollection('cities');
    db.createCollection('users');
    await db.dropCollection('users');
    await db.collection('users').drop();
  })
  .catch((err) => {
    console.log('Error connecting to server:', err);
  });


