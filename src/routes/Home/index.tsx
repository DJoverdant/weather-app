import { WarningIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { type Weather } from "../../types/weather";
import Modal from "../../components/Modal";
import Search from "../../components/Search";

function Home() {
  const [weatherData, setWeatherData] = useState<Weather>();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: get locations upon searching a name in Search component
  // https://geocoding-api.open-meteo.com/v1/search?name=Curitiba&count=10&language=en&format=json

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-25.4278&longitude=-49.2731&daily=temperature_2m_max,temperature_2m_min,uv_index_max,relative_humidity_2m_mean,precipitation_probability_max&current=temperature_2m,relative_humidity_2m,is_day&timezone=America%2FSao_Paulo&past_days=0&forecast_days=7",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        const json = await response.json();
        setWeatherData(json);

        if (!response.ok) {
          setError(true);
          try {
            const errorData = await response.json();
            setErrorMessage(errorData.error);
          } catch {
            setErrorMessage("Error fetching weather data");
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleCloseError = () => {
    setError(false);
  };

  const formattedDates =
    weatherData?.daily.time.map((dateStr) => {
      const date = new Date(dateStr + "T00:00:00");
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    }) ?? [];

  return (
    <section className="canva">
      <div className="weather-card">
        {weatherData && (
          <>
            <div className="weather-card__today">
              <h1>Weather</h1>
              <p>Temperature: {weatherData.current.temperature_2m}°C </p>
              <p>Preciptation: {weatherData.daily.precipitation_probability_max[0]}% </p>
              <p>Humidity: {weatherData.current.relative_humidity_2m}% </p>
            </div>

            {weatherData.daily.time.map((_, index) => (
              <div className="weather-card__days" key={index}>
                <h2>{formattedDates[index]}</h2>
                <p>Max: {weatherData.daily.temperature_2m_max[index]}°C </p>
                <p>Min: {weatherData.daily.temperature_2m_min[index]}°C </p>
                <p>Preciptation: {weatherData.daily.precipitation_probability_max[index]}% </p>
                <p>Humidity: {weatherData.daily.relative_humidity_2m_mean[index]}% </p>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="search-box">
        <Search placeholder="Search" />
      </div>

      {isError && <Modal title="Erro" description={errorMessage} icon={WarningIcon} onConfirm={handleCloseError} />}
    </section>
  );
}

export default Home;
