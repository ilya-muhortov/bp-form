
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Colors } from '@blueprintjs/core';


export default class FormErrors extends Component {

  static propTypes = {
    errors: PropTypes.array
  };

  render() {
    const { errors } = this.props;
    let message = '';
    if (errors && errors.length > 0) {
      message = errors.join(' ');
    }

    return (
      <React.Fragment>
        {message.length > 0 &&
          <span style={{color: Colors.VERMILION3}}>{message}</span>
        }
      </React.Fragment>
    )
  }
}
