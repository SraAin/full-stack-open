import { useState, useEffect } from 'react';
import axios from 'axios';

const FilterPerson = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled');
        setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    // console.log('Button clicked', event.target)
    const newObj = {
      name: newName,
      number: newNumber,
    };

    // Ehdollinen operaattori, jolla varmistetaan, että uutta nimeä ei löydy puhelinluettelosta
    persons.find((person) => person.name.includes(newName))
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newObj));

    setNewName('');
    setNewNumber('');

    axios
      .post('http://localhost:3001/persons', newObj)
      .then((response) => {
        console.log(response);
    });
  };

  const searchNames =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        );

  const handleNameChange = (event) => {
    // console.log(event.target.value);
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
      <FilterPerson filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={searchNames} />
    </div>
  );
};

export default App;
