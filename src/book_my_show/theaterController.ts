import Movie from "./movie";
import Theater from "./theater";

export default class TheaterController {
  mapMovieToTheaters: Map<Movie, Theater[]>;
  theaterList: Theater[];

  createTheater(theaterName: string, city: string) {
    const newTheater = new Theater(theaterName, city);
    this.theaterList.push(newTheater);
    return newTheater;
  }

  addMovieToTheater(movie: Movie, theater: Theater) {
    if (this.mapMovieToTheaters.has(movie)) {
      const theaters = this.mapMovieToTheaters.get(movie);
      if (theaters) {
        theaters.push(theater);
      }
    } else {
      this.mapMovieToTheaters.set(movie, [theater]);
    }
  }

  get theaters() {
    return this.theaterList;
  }
}
