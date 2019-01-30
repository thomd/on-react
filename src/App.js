import React from 'react'
import Message from './Message'
import Time from './Time'
import Counter from './Counter'
import StopWatch from './Stopwatch'
import Amount from './Amount'
import { Euro, Pound } from './Currency'

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
    <div className="row">
      <div className="col">
        <h3>Example for Render Props: Currency Converter</h3>
        <Amount>
          {amount => (
            <div>
              <Euro amount={amount} />
              <Pound amount={amount} />
            </div>
          )}
        </Amount>
      </div>
    </div>
  </div>
)

export default App
