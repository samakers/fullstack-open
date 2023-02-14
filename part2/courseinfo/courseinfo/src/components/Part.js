const Part = ({ name, exercises, id }) => {
  return (
    <p key={id}>
      {name} {exercises}
    </p>
  );
};

export { Part };
