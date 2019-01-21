import React from 'react'
import Message from './Message'
import Time from './Time'
import Counter from './Counter'
import StopWatch from './Stopwatch'

const App = () => (
  <div className="container">
    <div className="row">
      <Message className="col" alert="success" color="green">Hello World</Message>
      <Message className="col" alert="danger" color="red">Goodby World</Message>
    </div>
    <div className="row">
      <Message><Time locale="en-US"/></Message>
    </div>
    <div className="row mb-3">
      <div className="col">
        <Counter/>
      </div>
    </div>
    <div className="row mb-3">
      <div className="col">
        <StopWatch/>
      </div>
    </div>
  </div>
)

export default App
