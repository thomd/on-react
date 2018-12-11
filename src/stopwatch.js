import React, { Component } from 'react'

class StopWatch extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="d-inline">
        <label>0ms</label>
        <button>Start</button>
        <button>clear</button>
      </div>
    )
  }
}

export default StopWatch
