import { useState } from 'react';

const Anecdotes = ({anecdote, votes}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>This anecdote has {votes} votes</p>
    </div>
  );
};

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const  Winner = ({votes, highest}) => {
  if (highest === 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{votes}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const votesInitialArr = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([...votesInitialArr]);

  const highestVote = Math.max(...votes);
  const i = votes.indexOf(highestVote);

  console.log(i);

  const selectRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
    // console.log(selected);
  };

  const onVoted = () => {
    const newVote = [...votes]
    newVote[selected] += 1;
    setVotes(newVote);
    // console.log(newVote);
  };

  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={onVoted} text="Vote" />
      <Button handleClick={selectRandomAnecdote} text="Next Anecdote" />
      <Winner votes={anecdotes[i]} highest={highestVote} />
    </div>
  );
};

export default App;
