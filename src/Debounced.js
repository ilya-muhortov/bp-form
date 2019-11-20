
import PropTypes from 'prop-types';
import { debounce, omit } from 'lodash';
import React, { Component } from 'react';
import {
  InputGroup,
  Spinner
} from '@blueprintjs/core';
import ru from 'convert-layout/ru';
import ResetButton from './ResetButton';


export class DebouncedInputWidget extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    delay: PropTypes.number,
    showResetButton: PropTypes.bool,
    convertToRu: PropTypes.bool,
    convertToEn: PropTypes.bool
  };

  static defaultProps = {
    delay: 300,
    showResetButton: false,
    convertToRu: false,
    convertToEn: false
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.prepareValue(this.props.value),
      ignoreKeys: ['ArrowUp', 'ArrowDown'],
      focused: false
    };

    this.debouncedValue = debounce(
      () => this.handleDebounced(),
      this.props.delay
    );

    this.ref = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.focused === false && nextProps.value !== this.state.value) {
      this.setState({
        value: this.prepareValue(nextProps.value)
      });
    }
  }

  handleDebounced = () => {
    const { onChange } = this.props;
    onChange(this.state.value);
  };

  prepareValue = (value) => {
    if (typeof value !== 'string') {
      value = '';
    }
    return value;
  };

  handleChange(event) {
    const { convertToRu, convertToEn } = this.props;
    let value = event.target.value;
    if (convertToRu) {
      value = ru.fromEn(value);
    }
    else if (convertToEn) {
      value = ru.toEn(value);
    }
    this.setState({
      value: value
    });
    this.debouncedValue();
  }

  handleKeyDown(e) {
    if (this.state.ignoreKeys.includes(e.key)) {
      e.preventDefault();
    }
  }

  handleReset() {
    const { onChange } = this.props;
    this.setState({value: ''});
    onChange('');
  }

  handleFocus = () => {
    this.setState({focused: true})
  };

  handleBlur = () => {
    this.setState({focused: false})
  };

  getWidgetProps = () => {
    return omit(this.props, Object.keys(DebouncedInputWidget.propTypes));
  };

  render() {
    const { value } = this.state;
    const { loading, showResetButton } = this.props;

    let rightElement = <React.Fragment/>;
    if (showResetButton) {
      rightElement = (
        <ResetButton
          disabled={value.length === 0}
          onReset={this.handleReset}
        />
      );
    }

    return (
      <InputGroup
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        rightElement={loading ? <Spinner size={16}/> : rightElement}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...this.getWidgetProps()}
      />
    )
  }
}
