export interface Weather {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: boolean;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    relative_humidity_2m_mean: number[];
    precipitation_probability_max: number[];
  };
}
