import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.increment = this.increment.bind(this)
    this.count = this.count.bind(this)
  }

  increment() {
    this.setState({ count: this.state.count + 1 })
  }

  count(event) {
    if(event.key === '+') {
      this.setState({ count: this.state.count + 1 })
    }
    if(event.key === '-') {
      this.setState({ count: this.state.count - 1 })
    }
  }

  render() {
    return (
      <button className='btn btn-info' onClick={this.increment} onKeyDown={this.count}>{this.state.count}</button>
    )
  }
}

export default Counter
