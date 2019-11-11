
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CheckboxWidget } from '../Checkbox';
import {withAsync} from './withAsync';


class AsyncCheckbox extends Component {

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

  constructor(props) {
    super(props);

    this.state = {
      checked: []
    };

    const { value } = this.props;
    if (value) {
      this.state.checked = value;
    }
  }

  getOptionLabel = (option) => {
    return option[this.props.optionLabel];
  };

  getOptionValue = (option) => {
    return option[this.props.optionValue];
  };

  handleChange = (option, value) => {
    let { checked } = this.state;
    const { onChange } = this.props;

    if (value === true) {
      checked.push(option.id);
    }
    else {
      const index = checked.indexOf(option.id);
      checked.splice(index, 1);
    }

    this.setState({
      checked: checked
    });

    onChange(checked);
  };

  isChecked = (option) => {
    const { checked } = this.state;
    return checked.indexOf(this.getOptionValue(option)) !== -1;
  };

  render() {
    const { value, selectProps, loading, options, optionValue } = this.props;

    return (
      <React.Fragment>
        {options.map(option =>
          <CheckboxWidget
            key={option.id}
            value={this.isChecked(option)}
            onChange={(value) => this.handleChange(option, value)}
            label={this.getOptionLabel(option)}
          />
        )}
      </React.Fragment>
    );
  }
}

export const AsyncCheckboxWidget = withAsync(AsyncCheckbox);
