import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const COUNTRIES_URL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(COUNTRIES_URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShowButtonClick = (event, index) => {
    setSelectedCountry(filteredCountries[index]);
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {filter.length > 0 ? (
        <div>
          {selectedCountry ? (
            <div>
              <h2>{selectedCountry.name.common}</h2>
              <p>Capital: {selectedCountry.capital}</p>
              <p>Population: {selectedCountry.population}</p>
              <h3>Languages:</h3>
              <ul>
                {Object.values(selectedCountry.languages).map(
                  (language, index) => (
                    <li key={index}>{language}</li>
                  )
                )}
              </ul>
              <img
                src={selectedCountry.flags.png}
                alt={`${selectedCountry.name.common} flag`}
                width="200"
              />
              <button onClick={() => setSelectedCountry(null)}>back</button>
            </div>
          ) : filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            <ul>
              {filteredCountries.map((country, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <li>{country.name.common}</li>
                  <button
                    onClick={(event) => handleShowButtonClick(event, index)}
                  >
                    show
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Type a filter to search for countries</p>
      )}
    </div>
  );
}

export default App;
