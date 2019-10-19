
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { omit } from 'lodash';
import {
  NumericInput
} from '@blueprintjs/core';
import ResetButton from './ResetButton';


export class NumberInputWidget extends Component {

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func.isRequired,
    showResetButton: PropTypes.bool
  };

  static defaultProps = {
    showResetButton: false
  };

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleValueChange = (valueAsNumber, valueAsString) => {
    const { onChange } = this.props;
    if (valueAsString === '') {
      onChange(null);
    }
    else {
      onChange(valueAsNumber);
    }
  };

  getWidgetProps = () => {
    return omit(this.props, Object.keys(NumberInputWidget.propTypes));
  };

  handleReset() {
    this.handleValueChange('');
  }

  render() {
    let { value, showResetButton } = this.props;
    if (value === null || value === undefined) {
      value = '';
    }

    let rightElement = <React.Fragment/>;
    if (showResetButton) {
      rightElement = (
        <ResetButton
          disabled={value.length === 0}
          onClick={this.handleReset}
        />
      );
    }

    return (
      <NumericInput
        value={value}
        buttonPosition={null}
        fill={true}
        min={0}
        onValueChange={this.handleValueChange}
        rightElement={rightElement}
        {...this.getWidgetProps()}
      />
    )
  }
}
