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

const Notification = ({ message, color }) => {
  const infoMsgStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={infoMsgStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [infoMsg, setInfoMsg] = useState(null);
  const [msgColor, setMsgColor] = useState();

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
            setInfoMsg(`${newName} number has been changed`);
            setMsgColor('green');
            setTimeout(() => {
              setInfoMsg(null);
            }, 5000);
          }).catch(error => {
            setInfoMsg(`Information of ${newName} has already been removed from server`)
            setMsgColor('red');
            setTimeout(() => {
              setInfoMsg(null);
            }, 5000);
            setPersons(persons.filter(p => p.name !== newName))
          })
        : console.log('Number does not change')
      : personService.create(newObj).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setInfoMsg(`Added ${newName}`);
          setMsgColor('green');
          setTimeout(() => {
            setInfoMsg(null);
          }, 5000);
        });

    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`) === true) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setInfoMsg(`Deleted ${name}`);
        setMsgColor('green');
        setTimeout(() => {
          setInfoMsg(null);
        }, 5000);
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
      <Notification color={msgColor} message={infoMsg} />
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
