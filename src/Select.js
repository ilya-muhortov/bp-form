
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import React, { Component } from 'react';
import Select from 'react-select';
import { StyledSelect } from './styled';


export class SelectWidget extends Component {

  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange = (option) => {
    const { onChange } = this.props;
    onChange(option ? option.value : null);
  };

  getWidgetProps = () => {
    return omit(this.props, Object.keys(SelectWidget.propTypes));
  };

  render() {
    const { value, options } = this.props;

    let selectValue = {};
    if (value !== null && value !== undefined) {
      selectValue = options.find(o => o.value === value);
    }

    return (
      <Select
        options={options}
        onChange={(option) => this.handleChange(option)}
        value={selectValue}
        isClearable={true}
        {...StyledSelect}
        {...this.getWidgetProps()}
      />
    );
  }
}
