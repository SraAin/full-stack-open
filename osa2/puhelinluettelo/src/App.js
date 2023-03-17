import { useState, useEffect } from 'react';
import personService from './services/persons';

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

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id, person.name)}>
        Delete
      </button>
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    // console.log('Button clicked', event.target)
    const newObj = {
      name: newName,
      number: newNumber,
    };

    const person = persons.find((p) => newName === p.name);
    const chagedNumber = { ...person, number: newNumber };

    persons.find((person) => person.name.includes(newName))
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        ) === true
        ? personService.update(person.id, chagedNumber).then((response) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : response
              )
            );
          })
        : console.log('Number does not change')
      : personService.create(newObj).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        });

    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`) === true) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
      <Persons persons={searchNames} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
