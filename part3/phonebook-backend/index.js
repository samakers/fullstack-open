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
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
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

app.get("/info", async (request, response, next) => {
  try {
    const count = await Person.countDocuments({});
    response.send(`Phonebook has info for ${count} people <br> <br> ${Date()}`);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  if (request.body.name === "" || request.body.number === "") {
    return response.status(400).end();
  }

  const person = new Person({
    person: request.body.name,
    phoneNumber: request.body.number || false,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.errors.person.message });
      } else {
        next(error);
      }
    });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    person: request.body.name,
    phoneNumber: request.body.number || false,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
