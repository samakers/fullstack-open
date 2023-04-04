import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const COUNTRIES_URL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(COUNTRIES_URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <label>find countries</label>
      <input></input>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
