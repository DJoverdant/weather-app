import { WarningIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { type Weather } from "../../types/weather";
import Modal from "../../components/Modal";

function Home() {
  const [weather, setWeatherData] = useState<Weather[]>([]);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-25.4278&longitude=-49.2731&current=temperature_2m,relative_humidity_2m,is_day,rain,precipitation&timezone=America%2FSao_Paulo&past_days=0&forecast_days=7",
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
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <section id="canva">
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
