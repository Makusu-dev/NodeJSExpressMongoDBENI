const mongoose = require('mongoose');
const { City } = require('./models/City');
const uri = 'mongodb://localhost:27017/Cities';

mongoose.connect(uri).then(() => {
  console.log('Connexion réussie !');
}).catch(err => console.log(err));

async function getAllCities() {
  try {
    const data = await City.find();
    return data;
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

async function getCityByName(cityName) {
  try {
    const data = await City.findOne({ name: cityName });
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getCitiesByCountry(cityCountry) {
  try {
    const data = await City.find({ country: cityCountry });
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function addCity(city) {
  try {
    const newCity = new City(city);
    newCity.save().then(() => console.log("Ville ajoutée !"));
  } catch (err) {
    console.log(err);
  }
}

async function modifyCity(oldCity, newCity) {
  try {
    let city = await City.findOne(oldCity);
    city.name = newCity.name;
    city.country = newCity.country;
    city.region = newCity.region;
    city.description = newCity.description;
    await city.save();
  } catch (err) {
    console.log(err);
  }
}

async function deleteCity(cityName, cityCountry) {
  try {
    // await City.findOneAndDelete({ name: cityName, country: cityCountry });

    let city = await City.findOne({ name: cityName, country: cityCountry });
    if (city) {
      console.log(city);
      await city.deleteOne();
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCities,
  getCitiesByCountry,
  getCityByName,
  addCity,
  modifyCity,
  deleteCity
}