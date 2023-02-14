import { Content } from "./Content";
import { Header } from "./Header";

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content course={course.parts} />
    </>
  );
};

export { Course };
