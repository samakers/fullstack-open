import axios from "axios";
import { useEffect, useState } from "react";
import personsService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);

  // The newName state is meant for controlling the form input element.
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    // Check if the persons array already contains an object with the same name
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`);
    } else {
      personsService.create(nameObject).then((retrurnedPerson) => {
        setPersons(persons.concat(retrurnedPerson));
        setNewName("");
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this person?")) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={() => setNewName(newName)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person) => (
            <div>
              <li key={person.name}>
                {person.name} {person.number}{" "}
                <button onClick={() => handleDelete(person.id)}>delete</button>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};
export default App;
