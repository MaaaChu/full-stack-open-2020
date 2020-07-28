import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{ title }</h1>

const Button = ({ name, handleClick }) => 
  <button onClick={handleClick}>{ name }</button>

const Statistic = ({ text, value }) => <p>{ text } { value }</p>

const Statistics = ({ stats }) => {

  const statList = [
    <Statistic text="good" value={stats.good} />,
    <Statistic text="neutral" value={stats.neutral} />,
    <Statistic text="bad" value={stats.bad} />,
    <Statistic text="all" value={stats.allClicks} />,
    <Statistic text="average" value={stats.average} />,
    <Statistic text="positive" value={stats.positive} />
  ]

  const StatTableRow = ({ statList} ) => {
    return (
      statList.map((item, index) => (
        <tr key={ index }>
          <td>{ item }</td>
        </tr>
      ))
    )
  }

  const StatTable = ({ statList }) => {
    return (
      <table>
        <tbody>
          <StatTableRow statList={ statList } />
        </tbody>
      </table>
    )
  }

  if (stats.allClicks === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <StatTable statList={ statList } />
    </div>
  )
}

const App = () => {

  const title = "Give Feedback"
  const statTitle = "Statistics"

  // save clicks of each button to own state
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ allClicks, setAllClicks ] = useState(0)
  const [ average, setAverage ] = useState(0)
  const [ positive, setPositive ] = useState(0)

  const stats = {
    good, neutral, bad, allClicks, average, positive
  }

  const incrementClickCount = ( click, setClick ) => () => {
    setAllClicks(allClicks + 1)
    setClick(click + 1)
    setAverageScore()
    setPositiveScore()
  }

  const setAverageScore = () => {
    setAverage((good - bad) / (allClicks + neutral))
  }

  const setPositiveScore = () => {
    setPositive(good / allClicks)
  }

  return (
    <div>
      <Header title={ title } />

      <Button name="good" handleClick={incrementClickCount(good, setGood)} />
      <Button name="neutral" handleClick={incrementClickCount(neutral, setNeutral)} />
      <Button name="bad" handleClick={incrementClickCount(bad, setBad)} />

      <Header title={ statTitle } />

      <Statistics stats={ stats } />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)