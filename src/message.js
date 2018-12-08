import React from 'react'
import PropTypes from 'prop-types'

function Message(props) {
  return (
    <div style={ {color: props.color} }>{props.children}</div>
  )
}

Message.propTypes = {
    color: PropTypes.oneOf(['red', 'blue', 'green']),
    children: PropTypes.string
}

export default Message
