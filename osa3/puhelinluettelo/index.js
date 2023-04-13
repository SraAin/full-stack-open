require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const Person = require('./models/person');

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423857',
  },
];

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (request) => JSON.stringify(request.body));

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((person) => {
    response.status(204).end();
  });
});

/*const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  return maxId + 1;
};*/

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (body === undefined) {
    return response.status(400).json({
      error: 'Content missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    response.json(savedPerson);
  });
});

/*app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name and/or number missing'
    })
  } else if (persons.find(p => p.name.includes(body.name))) {
    return response.status(400).json({
      error: 'Name is already in use'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person);

  response.json(person);
})*/

app.get('/info', (request, response) => {
  const date = new Date();
  console.log(date);

  response.end(
    `Phonebook has info for ${persons.length} people 

${date}`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
