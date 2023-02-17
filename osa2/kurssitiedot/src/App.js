const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Content = ({ part, exercises }) => {
  return (
    <div>
      <Part parts={part} exercises={exercises} />
    </div>
  );
};

const Part = ({ parts, exercises }) => {
  return (
    <div>
      <p>
        {parts} {exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((prevVal, currentVal) => {
    const test = (prevVal + currentVal.exercises);
    console.log(prevVal, currentVal, test);
    return test;
  }, 0);

  return (
    <div>
      <p>Total of {total} exercises</p>
    </div>
  );
};

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header course={name} />
      {parts.map((part) => (
        <Content key={part.id} part={part.name} exercises={part.exercises} />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course name={course.name} parts={course.parts} />
    </div>
  );
};

export default App;
