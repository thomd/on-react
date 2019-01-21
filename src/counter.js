import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  increment(event) {
    if(event.type === 'click' || event.type === 'keydown' && event.key === '+') {
      this.setState({ count: this.state.count + 1 })
    }
  }

  render() {
    return (
      <button className='btn btn-info' onClick={this.increment.bind(this)} onKeyDown={this.increment.bind(this)}>{this.state.count}</button>
    )
  }
}

export default Counter
