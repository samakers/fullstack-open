import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({
  good,
  neutral,
  bad,
  avg,
  total,
  totalPercentage,
  avgFinal,
}) => {
  console.log(good, neutral, bad, total, avg, avgFinal, totalPercentage);
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={avgFinal} />
          <StatisticLine text="positive" value={totalPercentage} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [avg, setAvg] = useState([]);
  const [avgFinal, setAvgFinal] = useState(0);
  const [positive, setPositive] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);

  const addPositive = positive.reduce(
    (total, currentValue) => total + currentValue,
    0
  );

  //adding value of total collected feedback (good: 1, neutral: 0, bad: -1)
  const addArray = avg.reduce((total, currentValue) => total + currentValue, 0);
  //getting final average
  // const getAvg = addArray / avg.length || 0;
  const getAvg = () => addArray / avg.length || 0;


  const handleGoodClick = () => {
    setAvg(avg.concat(1));
    setAvgFinal(getAvg());
    setPositive(positive.concat(1));
    setGood(good + 1);
    setTotal(total + 1);
    setTotalPercentage((100 * (addPositive + 1)) / (total + 1) || 0);

  };

  const handleNeutralClick = () => {
    setAvg(avg.concat(0));
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setTotalPercentage((100 * addPositive) / total || 0);
  };

  const handleBadClick = () => {
    setAvg(avg.concat(-1));
    setBad(bad + 1);
    setTotal(total + 1);
    setTotalPercentage((100 * addPositive) / total || 0);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        avgFinal={avgFinal}
        avg={avg}
        total={total}
        totalPercentage={totalPercentage}
      />
    </div>
  );
};

export default App;
