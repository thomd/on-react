import React from 'react'
import PropTypes from 'prop-types'

class StopWatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lapse: 0, running: false }
  }

  run() {
    if (this.state.running) {
      clearInterval(this.timer)
    } else {
      const startTime = new Date() - this.state.lapse
      this.timer = setInterval(() => {
        this.setState({ lapse: new Date() - startTime })
      })
    }
    this.setState({ running: !this.state.running })
  }

  clear() {
    this.setState({ lapse: 0, running: false })
  }

  render() {
    const { lapse, running } = this.state
    return (
      <div>
        <Button onClick={() => this.run()}>{running ? 'Stop' : 'Start'}</Button>
        <Button onClick={() => this.clear()} active={running}>clear</Button>
        <LapseTime>{lapse}</LapseTime>
      </div>
    )
  }
}

function LapseTime(props) {
  return (
    <time>{props.children} ms</time>
  )
}

LapseTime.propTypes = {
  children: PropTypes.number,
}

function Button(props) {
  return (
    <button onClick={props.onClick} className="mr-3 btn btn-primary" disabled={props.active ? 'disabled' : ''}>{props.children}</button>
  )
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool
}

export default StopWatch
