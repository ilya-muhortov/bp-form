
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import {
  Checkbox
} from '@blueprintjs/core';


export class CheckboxWidget extends Component {

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
  };

  handleChange = (e) => {
    const { onChange } = this.props;
    const value = e.target.checked;
    onChange(value);
  };

  render() {
    const { label } = this.props;
    let value = this.props.value;
    if (typeof value !== 'boolean') {
        value = false;
    }

    return (
      <Checkbox
        {...this.props}
        checked={value}
        label={label}
        onChange={(e) => this.handleChange(e)}
      />
    )
  }
}
