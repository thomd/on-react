import React from 'react'
import ReactDOM from 'react-dom'
import DefaultErrorBoundary from './DefaultErrorBoundary'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <App />
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app'))
