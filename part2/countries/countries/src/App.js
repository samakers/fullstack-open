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
      {filter && (
        <div>
          {filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            <ul>
              {filteredCountries.map((country, index) => (
                <li key={index}>{country.name.common}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
