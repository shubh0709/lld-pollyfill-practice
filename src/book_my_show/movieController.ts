import Movie from "./movie";

export default class MovieController {
  movieList: Movie[];

  createMovie(name: string, duration: number) {
    const newMovie = new Movie(name, duration);
    this.movieList.push(newMovie);
    return newMovie;
  }

  get movies() {
    return this.movieList;
  }
}
