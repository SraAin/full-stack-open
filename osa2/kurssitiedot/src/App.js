const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part parts={props.part} exercises={props.exercises} />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.parts} {props.exercises}
      </p>
    </div>
  );
};

/*
const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};
*/

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header course={name} />
      {parts.map(part => 
        <Content key={part.id} part={part.name} exercises={part.exercises} />  
      )}
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
        id: 4
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
