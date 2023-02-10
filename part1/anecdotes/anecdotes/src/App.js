import { useState } from "react";

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(8).fill(0));

  const getRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const saveVote = () => {
    //save points state to new array as to not mutate the state directly
    const pointsCopy = [...points];
    //iterate the index of the selected anecdote within the copy of the array by 1
    pointsCopy[selected] += 1;
    //set the number of votes 
    setPoints(pointsCopy);
  };

  const highestVotedIndex = points.reduce((highestIndex, votes, index) => {
    return votes > points[highestIndex] ? index : highestIndex;
  }, 0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button onClick={saveVote} name={"vote"} />
      <Button onClick={getRandomAnecdote} name={"next anecdote"} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[highestVotedIndex]}
      <br />
      has {points[highestVotedIndex]} votes
    </div>
  );
};

export default App;
