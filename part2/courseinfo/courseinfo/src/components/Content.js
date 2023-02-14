import { Part } from "./Part";

const Content = ({ course }) => {
  const totalExercises = course.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);
  return (
    <div>
      {course.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
          id={part.id}
        />
      ))}
      <p style={{ fontWeight: "bold" }}>Total of {totalExercises} exercises</p>
    </div>
  );
};

export { Content };
