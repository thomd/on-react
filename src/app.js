import React from 'react'
import Message from './message'
import Time from './time'
import Counter from './counter'
import StopWatch from './stopwatch'

const App = () => (
  <div className="container">
    <div className="row">
      <Message className="col" alert="success" color="green">Hello World</Message>
      <Message className="col" alert="danger" color="red">Goodby World</Message>
    </div>
    <div className="row">
      <Message><Time locale="en-US"/></Message>
    </div>
    <div className="row">
      <Message><Counter/></Message>
      <Message><StopWatch/></Message>
    </div>
  </div>
)

export default App
