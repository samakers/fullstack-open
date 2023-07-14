require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT;
const cors = require("cors");
const Person = require("./models/person");

// Middleware for handling errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  // Handling CastError for invalid ID format
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  // Handling ValidationError for Mongoose validation errors
  else if (error.name === "ValidationError") {
    const errorMessage = error.message.includes("phoneNumber")
      ? "Invalid phone number format."
      : error.message;
    return response.status(400).json({ error: errorMessage });
  }

  next(error);
};

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("tiny")); // Log HTTP requests to the console
app.use(express.static("build")); // Serve static files from the "build" directory
app.use(errorHandler); // Use the custom error handling middleware

// Route for getting all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Route for getting a specific person by ID
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(Number(request.params.id))
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Route for getting information about the phonebook
app.get("/info", async (request, response, next) => {
  try {
    const count = await Person.countDocuments({});
    response.send(`Phonebook has info for ${count} people <br> <br> ${Date()}`);
  } catch (error) {
    next(error);
  }
});

// Route for deleting a person by ID
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Route for creating a new person
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
        const errorMessage = error.message.includes("phoneNumber")
          ? "Invalid phone number format."
          : error.message;
        return response.status(400).json({ error: errorMessage });
      } else {
        next(error);
      }
    });
});

// Route for updating a person by ID
app.put("/api/persons/:id", (request, response, next) => {
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
