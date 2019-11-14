
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextArea } from '@blueprintjs/core';


export class TextWidget extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    const { onChange } = this.props;
    let value = e.target.value;
    onChange(value);
  };

  render() {
    let { value, onChange, otherProps } = this.props;
    if (typeof value !== 'string') {
      value = '';
    }

    return (
      <TextArea
        fill={true}
        value={value}
        onChange={(e) => this.handleChange(e)}
        {...otherProps}
      />
    )
  }
}
