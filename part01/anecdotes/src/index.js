import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const anecdotesLength = props.anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotesLength).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const generateRandNum = () => Math.floor(Math.random() * anecdotesLength)

  const nextAnecdote = () => setSelected(generateRandNum())

  const findIndexMostVotedAnecdote = votes => {
    let mostVotes = -1
    let mostVotesIndex = 0

    for(let i = 0; i < votes.length; i++) {
      if(votes[i] > mostVotes) {
        mostVotes = votes[i]
        mostVotesIndex = i
      }
    }

    return mostVotesIndex
  }

  const incrementVote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    setMostVotes(findIndexMostVotedAnecdote(copy))
  }

  return (
    <div>
      <Title text="Anecdote of the Day" />
      <DisplayAnecdote anecdotes={ anecdotes } selected={ selected } />
      <DisplayVotes votes={ votes } selected={ selected } />
      <Button handleClick={ incrementVote } text="vote"/>
      <Button handleClick={ nextAnecdote } text="next anecdote"/>

      <Title text="Anecdote with the most votes" />
      <DisplayAnecdote anecdotes={ anecdotes } selected={ mostVotes } />

    </div>
  )
}

const Title = ({ text }) => <h1>{ text }</h1>

const Button = ({ handleClick, text }) => 
    <button onClick={ handleClick }>{ text }</button>

const DisplayAnecdote = ({ anecdotes, selected }) => <p>{ anecdotes[selected] }</p>

const DisplayVotes = ({ votes, selected }) => { 
  const voteCount = votes[selected]

  if(voteCount === 1) {
    return (
      <p>has { voteCount } vote</p>
    )
  }

  return (
    <p>has { voteCount } votes</p>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)