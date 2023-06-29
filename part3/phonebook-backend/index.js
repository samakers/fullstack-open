require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT;
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

// const persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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
    return response.status(400).end();
  }

  // const existingPerson = persons.find(
  //   (person) => person.name === request.body.name
  // );
  // if (existingPerson) {
  //   return response.status(409).end();
  // }

  //   const { name, number } = request.body;

  //   const newPerson = {
  //     id: Math.floor(Math.random() * 1000000),
  //     name: name,
  //     number: number,
  //   };
  //   persons.push(newPerson);
  //   response.json(newPerson);
  // });

  const person = new Person({
    person: request.body.person,
    phoneNumber: request.body.phoneNumber || false,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
