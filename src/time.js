import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Time extends Component {
  constructor(props) {
    super(props)
    this.locale = props.locale || 'de-DE'
    this.state = { time: this.getTime() }
  }

  getTime() {
    return new Date().toLocaleTimeString(this.locale)
  }

  setTime() {
    this.setState({ time: this.getTime() })
  }

  componentDidMount() {
    this.timer = setInterval(this.setTime.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>{this.state.time}</div>
    )
  }
}

Time.propTypes = {
  locale: PropTypes.string
}

export default Time
