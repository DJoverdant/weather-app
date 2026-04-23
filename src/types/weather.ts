export interface Weather {
  current: {
    time: Date;
    temperature_2m: Number;
    relative_humidity_2m: Number;
    is_day: Number;
    rain: Number;
    precipitation: Number;
  };
}
