import React, { Component } from 'react'

class Amount extends Component {
  constructor(props) {
    super(props)
    this.state = { amount: 0 }
  }

  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }))
  }

  onDecrement = () => {
    this.setState(state => ({ amount: state.amount > 0 ? state.amount - 1 : 0 }))
  }

  render() {
    return (
      <React.Fragment>
      <div className="input-group w-25">
        <div className="input-group-prepend">
          <span className="input-group-text">$</span>
        </div>
        <input className="form-control" readOnly value={this.state.amount.toFixed(2)}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={this.onIncrement}>+</button>
          <button className="btn btn-outline-secondary" onClick={this.onDecrement}>-</button>
        </div>
      </div>
      {this.props.children(this.state.amount)}
      </React.Fragment>
    );
  }
}

export default Amount
