import React from 'react'
import PropTypes from 'prop-types'

export default class DefaultErrorBoundary extends React.Component {

  static propTypes = {
    children: PropTypes.node
  }

  state = {
    hasError: false
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    return hasError ? <div>Something went wrong</div> : children
  }
}
