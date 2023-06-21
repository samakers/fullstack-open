const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3001;

app.use(express.json());
app.use(morgan('tiny'));

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> <br> ${Date()}`
  );
  response.end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const personIndex = persons.findIndex((person) => person.id === id);
  if (personIndex !== -1) {
    persons.splice(personIndex, 1);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  if (request.body.name === "" || request.body.number === "") {
    response.status(400).end();
    return;
  }

  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name === request.body.name) {
      response.status(409).end();
      return;
    }
  }

  const { name, number } = request.body;
  const newPerson = {
    id: Math.floor(Math.random() * 1000000),
    name: name,
    number: number,
  };
  persons.push(newPerson);
  response.send("Person added successfully");
  return;
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
