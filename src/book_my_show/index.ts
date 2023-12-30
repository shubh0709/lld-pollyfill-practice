// API - /home

// what all will cost memory
// user details need to be constantly passed
// selected options need to be passed
//

// get all generic shows and display them

// selected a show --> get its city --> venues/theater --> screens --> seats

// things presetn in DB,
// cities I support
// movies
// venues
// screens

// so to add all of these either I can direclty add them manually through SQL
// or I can do it through code i.e. ask any developer/PM to do through API

// if I try to bypass the DB tehn teh whole movie data needs to be present in memory to access
// the data while booking...

import TheaterController from "./theaterController";
import MovieController from "./movieController";
import Theater from "./theater";
import Movie from "./movie";
import City from "./city";
import CityController from "./cityController";
import Screen from "./screen";

export default class BMS {
  theaterController: TheaterController;
  movieController: MovieController;
  cityController: CityController;
  city: City;
  movie: Movie;
  theater: Theater;

  initialiseBMS() {
    this.theaterController = new TheaterController();
    this.movieController = new MovieController();
    this.cityController = new CityController();
  }

  dummyCreations() {
    const newCity = this.cityController.createCity("Bangalore");
    const newMovie = this.movieController.createMovie("Salaar", 2);
    const newTheater = this.theaterController.createTheater(
      "PVR Forum",
      "Bengaluru"
    );
    const newScreen = new Screen(1, 75);
    newTheater.addScreens(newScreen);
    this.theaterController.addMovieToTheater(newMovie, newTheater);
    this.cityController.addTheaterInCity(newCity, newTheater);
  }

  startBooking() {}
}
