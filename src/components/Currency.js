import React from 'react'

const calc = (amount, currency) => (amount * currency).toFixed(2)

const Currency = (props) => {
  return (
    <div className="input-group mt-3 w-25">
      <div className="input-group-prepend">
        <span className="input-group-text">{props.currency}</span>
      </div>
      <input className="form-control" readOnly value={props.amount} />
    </div>
  )
}

const Euro = ({amount}) => <Currency currency="€" amount={calc(amount, 0.86)} />

const Pound = ({amount}) => <Currency currency="£" amount={calc(amount, 0.76)} />

export {
  Euro,
  Pound
}
