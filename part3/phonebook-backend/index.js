require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT;
const cors = require("cors");
const Person = require("./models/person");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));
app.use(errorHandler);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Persons.findById(Number(request.params.id))
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> <br> ${Date()}`
  );
  response.end();
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(Number(request.params.id))
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  if (request.body.name === "" || request.body.number === "") {
    return response.status(400).end();
  }

  const person = new Person({
    person: request.body.person,
    phoneNumber: request.body.phoneNumber || false,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    person: request.body.person,
    phoneNumber: request.body.phoneNumber || false,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
