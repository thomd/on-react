import React from 'react'
import Time from './time'
import Message from './message'

const App = () => (
  <div className="container">
    <Message color="red">Hello World</Message>
    <Message color="blue">Goodby World</Message>
    <Time locale="en-US"/>
  </div>
)

export default App
