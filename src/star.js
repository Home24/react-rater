import React, { Component } from 'react';
import classnames from 'classnames';
export default class Star extends Component {
  render() {
    let starClasses = classnames('star', {
      'is-disabled': this.props.isDisabled,
      'is-active': this.props.isActive,
      'will-be-active': this.props.willBeActive
    });

    return (
        <span className={starClasses}>★</span>
    )
  }
};

Star.defaultProps = {
  willBeActive: false,
  isActive: false,
  isDisabled: false
};
