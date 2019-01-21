import React from 'react'
import PropTypes from 'prop-types'

function Message({className = '', alert = 'dark', ...props}) {
  const css = {
    className: `alert alert-${alert} m-3 ${className}`.trim(),
    style : {
      color: props.color
    }
  }
  return (
    <div {...css}>{props.children}</div>
  )
}

Message.propTypes = {
  alert: PropTypes.oneOf(['primary', 'decondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  className: PropTypes.string,
  color: PropTypes.oneOf(['black', 'red', 'blue', 'green']),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
}

export default Message
