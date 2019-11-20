
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import Select from 'react-select';

import { BlueprintSelectStyle } from '../styled';
import { withAsync } from './withAsync';


class AsyncSelect extends Component {

  static propTypes = {
    value: PropTypes.any,
    selectProps: PropTypes.object,
    optionLabel: PropTypes.string,
    optionValue: PropTypes.string
  };

  static defaultProps = {
    optionLabel: 'display',
    optionValue: 'id'
  };

  handleChange = (option) => {
    const { onChange } = this.props;
    if (option) {
      return onChange(this.getOptionValue(option), option);
    }
    return onChange(null, null);
  };

  getOptionLabel = (option) => {
    return option[this.props.optionLabel];
  };

  getOptionValue = (option) => {
    return option[this.props.optionValue];
  };

  render() {
    const { value, selectProps, loading, options, optionValue } = this.props;

    let selectValue = null;
    if (value !== null && value !== undefined) {
      if (value[optionValue]) {
        selectValue = value;
      }
      else {
        selectValue = options.find(o => o[optionValue] === value);
      }
    }

    return (
      <Select
        options={options}
        onChange={(option) => this.handleChange(option)}
        value={selectValue}
        isClearable={!!selectValue}
        placeholder={''}
        isLoading={loading}
        getOptionLabel={(item) => this.getOptionLabel(item)}
        getOptionValue={(item) => this.getOptionValue(item)}
        {...selectProps}
        {...BlueprintSelectStyle}
      />
    );
  }
}

export const AsyncSelectWidget = withAsync(AsyncSelect);
