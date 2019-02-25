import React from 'react'
import Message from './components/Message'
import Time from './components/Time'
import Counter from './components/Counter'
import StopWatch from './components/Stopwatch'
import Amount from './components/Amount'
import { Euro, Pound } from './components/Currency'
import TemperatureCalculator from './components/TemperatureCalculator'

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
    <div className="row">
      <div className="col">
        <h3>Example for Lifting-State-Up: Temperature Calculator</h3>
        <TemperatureCalculator />
      </div>
    </div>
  </div>
)

export default App
