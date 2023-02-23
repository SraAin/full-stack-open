const Header = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  // console.log(parts)
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} partName={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ partName, exercises }) => {
  return (
    <div>
      <p>
        {partName} {exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((prevVal, currentVal) => {
    const sum = prevVal + currentVal.exercises;
    //console.log(prevVal, currentVal, test);
    return sum;
  }, 0);

  return (
    <div>
      <strong>Total of {total} exercises</strong>
    </div>
  );
};

const Course = ({ courses }) => {
  // console.log(courses);
  return (
    <div>
      {courses.map((course) => {
        // console.log(course.parts);
        return (
          <div key={course.id}>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
