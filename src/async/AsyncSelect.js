
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Select from 'react-select';
import { isEmpty, filter, isArray } from 'lodash';

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
      onChange(this.getOptionValue(option), option);
    }
    else {
      onChange(null, null);
    }
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
    if (value !== null && value !== undefined && !isArray(value)) {
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


class AsyncMultiSelect extends AsyncSelect {

  handleChange = (options) => {
    const { onChange } = this.props;
    if (options && options.length > 0) {
      onChange(options.map(item => (this.getOptionValue(item))), options)
    }
    else {
      onChange([]);
    }
  };

  render() {
    const { value, selectProps, loading, options } = this.props;

    let selectedValues = [];
    if (value !== null && value !== undefined && value !== []) {
      selectedValues = filter(options, option => {
        return value.indexOf(this.getOptionValue(option)) !== -1;
      });
    }

    return (
      <Select
        options={options}
        onChange={(option) => this.handleChange(option)}
        value={selectedValues}
        isClearable={!!isEmpty(selectedValues)}
        placeholder={''}
        isLoading={loading}
        isMulti={true}
        getOptionLabel={(item) => this.getOptionLabel(item)}
        getOptionValue={(item) => this.getOptionValue(item)}
        {...selectProps}
        {...BlueprintSelectStyle}
      />
    );
  }
}

export const AsyncSelectWidget = withAsync(AsyncSelect);
export const AsyncMultiSelectWidget = withAsync(AsyncMultiSelect);
