export default class Screen {
  num: number;
  seatsCount: number;
  bookedSeats: number[];

  constructor(num: number, seatsCount: number) {
    this.num = num;
    this.seatsCount = seatsCount;
  }

  bookSeat(seatNum: number) {
    this.bookedSeats.push(seatNum);
  }
}
