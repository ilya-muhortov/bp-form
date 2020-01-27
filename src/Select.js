
import PropTypes from 'prop-types';
import { isEmpty, filter } from 'lodash';
import React, { Component } from 'react';
import { StyledSelect, BlueprintSelectStyle } from './styled';


export class SelectWidget extends Component {

  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    large: PropTypes.bool
  };

  static defaultProps = {
    large: false
  };

  handleChange = (option) => {
    const { onChange } = this.props;
    onChange(option ? option.value : null);
  };

  render() {
    const { value, options, onChange, large, ...otherProps } = this.props;

    let selectValue = null;
    if (value !== null && value !== undefined) {
      selectValue = options.find(o => o.value === value);
    }

    return (
      <StyledSelect
        large={large}
        options={options}
        onChange={(option) => this.handleChange(option)}
        value={selectValue}
        isClearable={!isEmpty(selectValue)}
        placeholder={''}
        {...BlueprintSelectStyle}
        {...otherProps}
      />
    );
  }
}


export class SelectMultiWidget extends Component {

  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    large: PropTypes.bool,
    emptyValue: PropTypes.any,
  };

  static defaultProps = {
    large: false,
    emptyValue: []
  };

  handleChange = (options) => {
    const { onChange, emptyValue } = this.props;
    if (options && options.length > 0) {
      onChange(options.map(item => (item.value)))
    }
    else {
      onChange(emptyValue);
    }
  };

  render() {
    const { value, options, onChange, large, ...otherProps } = this.props;

    let selectedValues = [];
    if (value !== null && value !== undefined && value !== []) {
      selectedValues = filter(options, function (o) {
        return value.indexOf(o.value) !== -1;
      });
    }

    return (
      <StyledSelect
        large={large}
        options={options}
        onChange={(options) => this.handleChange(options)}
        value={selectedValues}
        isClearable={!isEmpty(selectedValues)}
        placeholder={''}
        isMulti={true}
        {...BlueprintSelectStyle}
        {...otherProps}
      />
    );
  }
}
