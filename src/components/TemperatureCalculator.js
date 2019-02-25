import React, { Fragment } from 'react'

import BoilingVerdict from './BoilingVerdict'
import TemperatureInput from './TemperatureInput'

class TemperatureCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { celsius: null, fahrenheit: null };
  }

  toCelsius = fahrenheit => ((fahrenheit - 32) * 5) / 9;
  toFahrenheit = celsius => (celsius * 9) / 5 + 32;

  tryConvert = (temperature, convert) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  };

  setCelsius = temperature => {
    this.setState({
      celsius: temperature,
      fahrenheit: this.tryConvert(temperature, this.toFahrenheit)
    });
  };

  setFahrenheit = temperature => {
    this.setState({
      celsius: this.tryConvert(temperature, this.toCelsius),
      fahrenheit: temperature
    });
  };

  render() {
    const { celsius, fahrenheit } = this.state;
    return (
      <Fragment>
        <TemperatureInput label="Celcius" temperature={celsius} onTemperatureChange={this.setCelsius} />
        <TemperatureInput label="Fahrenheit" temperature={fahrenheit} onTemperatureChange={this.setFahrenheit} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </Fragment>
    );
  }
}

export default TemperatureCalculator
