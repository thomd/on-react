import React from 'react'

class TemperatureInput extends React.Component {
  handleChange = ev => {
    //
    // This is called “lifting state up”.
    // We will remove the local state from the TemperatureInput and move it into the Calculator instead.
    //
    this.props.onTemperatureChange(ev.target.value);
  }

  render() {
    const { label, temperature } = this.props;
    return (
      <fieldset>
        <legend>Enter temperature in {label}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

export default TemperatureInput

