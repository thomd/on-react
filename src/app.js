import React from 'react'
import Time from './time'
import Message from './message'

const App = () => (
  <div className="container">
    <div className="row">
      <Message className="col" alert="success" color="green">Hello World</Message>
      <Message className="col" alert="danger" color="red">Goodby World</Message>
    </div>
    <div className="row">
      <Message><Time locale="en-US"/></Message>
    </div>
  </div>
)

export default App
