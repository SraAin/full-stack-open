import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    // console.log('Button clicked', event.target)
    const newObj = {
      name: newName,
    };

    checkForDublicates(newObj, newName);
    setNewName('');
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const checkForDublicates = (newObj, newName) => {
    persons.map((person) => {
      return newName === person.name
        ? alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(newObj));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
