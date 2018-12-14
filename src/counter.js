import React, { Component } from 'react'
import Radium from 'radium'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  increment() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div className='my-3 p-3' style={styles.base} onClick={this.increment.bind(this)}>{this.state.count}</div>
    )
  }
}

const styles = {
  base: {
    cursor: 'pointer',
    ':hover': {
      background: '#eee'
    }
  }
}

export default Radium(Counter)

