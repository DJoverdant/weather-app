import { WarningIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { type Weather } from "../../types/weather";
import Modal from "../../components/Modal";
import Input from "../../components/Input";

function Home() {
  const [weatherData, setWeatherData] = useState<Weather>();
  const [searchInput, setSearchInput] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-25.4278&longitude=-49.2731&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,relative_humidity_2m_mean&timezone=America%2FSao_Paulo&past_days=0&forecast_days=7",
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

  return (
    <section className="canva">
      <div className="weather-card">
        <h1>Weather</h1>
        {weatherData && (
          <>
            <p>
              Temperature: <br />
              Max:{`${weatherData.daily.temperature_2m_max[0]}°C`} <br />
              Min:{`${weatherData.daily.temperature_2m_min[0]}°C`}
            </p>
            <p>Humidity: {`${weatherData.daily.relative_humidity_2m_mean[0]}%`}</p>
          </>
        )}
      </div>
      <div className="search">
        <Input placeholder="Search" />
      </div>
      {isError && (
        <Modal
          title="Erro"
          description={errorMessage}
          icon={WarningIcon}
          onConfirm={handleCloseError}
        />
      )}
    </section>
  );
}

export default Home;
