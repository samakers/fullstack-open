import axios from "axios";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import personsService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState("");

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

    const existingPerson = persons.find((person) => person.name === newName);

    // Check if the persons array already contains an object with the same name
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, nameObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setErrorMessage(`${returnedPerson.name} number has been changed.`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }
    } else {
      personsService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotificationStyle('green');
        setErrorMessage(`${returnedPerson.name} has been added.`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm("Are you sure you want to remove this person?")) {
      console.log('Deleting person with id:', id);
      personsService.remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationStyle('green');
          setErrorMessage(`${personToDelete.name} has now been removed from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error)
          setNotificationStyle('red');
          setErrorMessage(`${personToDelete.name} has already been removed from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
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
      <Notification message={errorMessage} notificationStyle={notificationStyle}/>
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
