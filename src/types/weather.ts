export interface Weather {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    precipitation_sum: number[];
    relative_humidity_2m_mean: number[];
  };
}
