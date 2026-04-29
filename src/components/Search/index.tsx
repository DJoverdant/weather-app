import {
  MagnifyingGlassIcon,
  BuildingIcon,
  MapPinSimpleIcon,
  CityIcon,
  GlobeHemisphereWestIcon,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { type Geolocation, type Location } from "../../types/geolocation";
import "./styles.css";

interface SearchProps {
  placeholder?: string;
  onSelectLocation: (location: Location) => void;
}

function Search({ placeholder, onSelectLocation }: SearchProps) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<Geolocation>();

  useEffect(() => {
    (async () => {
      if (!searchValue) {
        setOptions(undefined);
        return;
      }

      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}&count=10&language=en&format=json`,
        );

        const json = await response.json();
        setOptions(json);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        setOptions(undefined);
      }
    })();
  }, [searchValue]);

  return (
    <section
      className={searchActive ? "search--active" : "search"}
      onClick={() => setSearchActive(false)}
    >
      <div className="search__input">
        <MagnifyingGlassIcon size={40} style={{ alignSelf: "center" }} />
        <input
          id="query"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            setSearchActive(true);
          }}
        />
      </div>

      {options?.results && options.results.length > 0 && (
        <div
          className={
            searchActive ? "search__results--active" : "search__results"
          }
        >
          {options.results.map((result) => (
            <div
              key={result.id}
              onClick={() => {
                onSelectLocation({
                  name: result.name,
                  latitude: result.latitude,
                  longitude: result.longitude,
                });
              }}
            >
              <p>
                <BuildingIcon size={30} />
                {result.name}
              </p>
              <p>
                <MapPinSimpleIcon size={30} />
                {`${result.latitude} ${result.longitude}`}
              </p>

              {result.admin1 && (
                <p>
                  <CityIcon size={30} />
                  {result.admin1}
                </p>
              )}

              {result.country && (
                <p>
                  <GlobeHemisphereWestIcon size={30} />
                  {result.country}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Search;
