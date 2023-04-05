import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

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

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {filter.length > 0 ? (
        <div>
          {filteredCountries.length === 1 ? (
            <div>
              <h2>{filteredCountries[0].name.common}</h2>
              <p>Capital: {filteredCountries[0].capital}</p>
              <p>Population: {filteredCountries[0].population}</p>
              <h3>Languages:</h3>
              <ul>
                {Object.values(filteredCountries[0].languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
              <img src={filteredCountries[0].flags.png} alt={`${filteredCountries[0].name.common} flag`} width="200" />
            </div>
          ) : (
            filteredCountries.length > 10 ? (
              <p>Too many matches, specify another filter</p>
            ) : (
              <ul>
                {filteredCountries.map((country, index) => (
                  <li key={index}>{country.name.common}</li>
                ))}
              </ul>
            )
          )}
        </div>
      ) : (
        <p>Type a filter to search for countries</p>
      )}
    </div>
  );
  
  
}

export default App;
