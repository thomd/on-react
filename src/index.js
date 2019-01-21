import React from 'react'
import ReactDOM from 'react-dom'
import DefaultErrorBoundary from './DefaultErrorBoundary'
import App from './App'

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <App />
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app'))
