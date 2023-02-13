import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodClick = () => setGood(good + 1)

  const addNeutralClick = () => setNeutral(neutral + 1)

  const addBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handeClick={addGoodClick} title='Good' />
      <Button handeClick={addNeutralClick} title='Neutral' />
      <Button handeClick={addBadClick} title='Bad' />
      <Statistics goodClicks={good} neutralClicks={neutral} badClicks={bad} />
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handeClick}>{props.title}</button>
    </div>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {props.goodClicks} </p>
      <p>Neutral: {props.neutralClicks} </p>
      <p>Bad: {props.badClicks} </p>
    </div>
  )
}

export default App
