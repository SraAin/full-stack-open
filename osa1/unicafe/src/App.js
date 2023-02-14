import { useState } from 'react';

const App = () => {
  // State hooks
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);

  // Muutetaan hooksien tilan arvoa
  const goodClick = () => {setGood(good + 1); setAverage(average + 1)};
  const neutralClick = () => {setNeutral(neutral + 1); setAverage(average + 0)};
  const badClick = () => {setBad(bad + 1); setAverage(average - 1)};

  // Laskentoja
  const allClicks = good + neutral + bad;
  const avgReview = average / allClicks;
  const positiveReviews = good / allClicks * 100;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handeClick={goodClick} title="Good" />
      <Button handeClick={neutralClick} title="Neutral" />
      <Button handeClick={badClick} title="Bad" />
      <Statistics
        goodClicks={good}
        neutralClicks={neutral}
        badClicks={bad}
        allClicks={allClicks}
        average={avgReview}
        positive={positiveReviews}
      />
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handeClick}>{props.title}</button>
    </div>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {props.goodClicks} </p>
      <p>Neutral: {props.neutralClicks} </p>
      <p>Bad: {props.badClicks} </p>
      <p>All: {props.allClicks} </p>
      <p>Average: {props.average} </p>
      <p>Positive: {props.positive} % </p>
    </div>
  );
};

export default App;
