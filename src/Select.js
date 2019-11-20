
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import Select from 'react-select';
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
