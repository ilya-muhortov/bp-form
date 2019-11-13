
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import React, { Component } from 'react';
import {
  InputGroup
} from '@blueprintjs/core';
import ResetButton from './ResetButton';


export class InputWidget extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    toUpperCase: PropTypes.bool,
    toLowerCase: PropTypes.bool,
    showResetButton: PropTypes.bool
  };

  static defaultProps = {
    showResetButton: false
  };

  handleChange = (e) => {
    const { onChange, toUpperCase, toLowerCase } = this.props;
    let value = e.target.value;
    if (toUpperCase) {
      value = value.toUpperCase();
    }
    else if (toLowerCase) {
      value = value.toLowerCase();
    }
    onChange(value);
  };

  getWidgetProps = () => {
    return omit(this.props, Object.keys(InputWidget.propTypes));
  };

  handleReset = () => {
    const { onChange } = this.props;
    onChange('');
  };

  render() {
    const { showResetButton } = this.props;
    let value = this.props.value;
    if (typeof value !== 'string') {
      value = '';
    }

    let rightElement = <React.Fragment/>;
    if (showResetButton) {
      rightElement = (
        <ResetButton
          onReset={this.handleReset}
          disabled={value.length === 0}
        />
      );
    }
    else if (this.props.rightElement) {
      rightElement = this.props.rightElement;
    }

    return (
      <InputGroup
        value={value}
        onChange={(e) => this.handleChange(e)}
        rightElement={rightElement}
        {...this.getWidgetProps()}
      />
    )
  }
}
