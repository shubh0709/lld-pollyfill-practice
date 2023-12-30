import City from "./city";
import Theater from "./theater";

export default class CityController {
  cityList: City[];
  mapTheaterInCity: Map<City, Theater[]>;

  createCity(name: string) {
    const newCity = new City(name);
    this.cityList.push(newCity);
    return newCity;
  }

  addTheaterInCity(city: City, theater: Theater) {
    if (this.mapTheaterInCity.has(city)) {
      const theaters = this.mapTheaterInCity.get(city);
      if (theaters) {
        theaters.push(theater);
      }
    } else {
      this.mapTheaterInCity.set(city, [theater]);
    }
  }


  get cities(){
    return this.cityList;
  }
}
