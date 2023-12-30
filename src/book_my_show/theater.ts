import Screen from "./screen";

export default class Theater {
  theaterName: string;
  city: string;
  screens: Screen[];

  constructor(theaterName: string, city: string) {
    this.theaterName = theaterName = theaterName;
    this.city = city;
  }

  addScreens(screen: Screen) {
    this.screens.push(screen);
  }

}
