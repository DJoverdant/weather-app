import {
  WarningIcon,
  ThermometerIcon,
  ThermometerHotIcon,
  ThermometerColdIcon,
  DropIcon,
  CloudSunIcon,
  CloudRainIcon,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { type Weather } from "../../types/weather";
import { type Location } from "../../types/geolocation";
import Modal from "../../components/Modal";
import Search from "../../components/Search";

function Home() {
  const [weatherData, setWeatherData] = useState<Weather>();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [location, setSelectedLocation] = useState<Location>({
    name: "Curitiba",
    latitude: -25.42778,
    longitude: -49.27306,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,uv_index_max,relative_humidity_2m_mean,precipitation_probability_max&current=temperature_2m,relative_humidity_2m,is_day&timezone=America%2FSao_Paulo&past_days=0&forecast_days=7`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        const json = await response.json();
        setWeatherData(json);
        setLoading(false);

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
  }, [location.latitude, location.longitude]);

  const formattedDates =
    weatherData?.daily.time.map((dateStr) => {
      const date = new Date(dateStr + "T00:00:00");
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    }) ?? [];

  const handleLocationSelection = (location: Location) => {
    setSelectedLocation({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  return (
    <section className="canva">
      {isLoading ? (
        <div className="loading">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      ) : (
        <div className="weather-card">
          {weatherData && (
            <>
              <div className="weather-card__header">
                <h1>
                  <CloudSunIcon size={80} />
                  <span>Weather</span>
                </h1>

                <h2>{location.name}</h2>
              </div>

              <div className="weather-card__today">
                <p>
                  <ThermometerIcon size={30} /> {weatherData.current.temperature_2m}°C
                </p>
                <p>
                  <CloudRainIcon size={30} /> {weatherData.daily.precipitation_probability_max[0]}%
                </p>
                <p>
                  <DropIcon size={30} /> {weatherData.current.relative_humidity_2m}%
                </p>
              </div>

              {weatherData.daily.time.map((_, index) => (
                <div className="weather-card__days" key={index}>
                  <h2>{formattedDates[index]}</h2>
                  <p>
                    <ThermometerHotIcon size={30} /> {weatherData.daily.temperature_2m_max[index]}°C
                  </p>
                  <p>
                    <ThermometerColdIcon size={30} /> {weatherData.daily.temperature_2m_min[index]}
                    °C
                  </p>
                  <p>
                    <CloudRainIcon size={30} />
                    {weatherData.daily.precipitation_probability_max[index]}%
                  </p>
                  <p>
                    <DropIcon size={30} /> {weatherData.daily.relative_humidity_2m_mean[index]}%
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <Search placeholder="Search" onSelectLocation={handleLocationSelection} />

      {isError && (
        <Modal
          title="Erro"
          description={errorMessage}
          icon={WarningIcon}
          onConfirm={() => setError(false)}
        />
      )}
    </section>
  );
}

export default Home;
