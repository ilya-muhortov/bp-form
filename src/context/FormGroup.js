
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  FormGroup
} from '@blueprintjs/core';

import { FormContext } from './Provider';
import FormErrors from './FormErrors';


export class FormGroupContext extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    WidgetComponent: PropTypes.any,
    widgetProps: PropTypes.object
  };

  render() {
    const { name, WidgetComponent, widgetProps } = this.props;
    return (
      <FormContext.Consumer>
        {context => {
          const errors = context.errors[name];
          const value = context.getValue(name);
          return (
            <FormGroup
              {...this.props}
              helperText={errors ? <FormErrors errors={errors} /> : undefined}
            >
              {WidgetComponent && (
                <WidgetComponent
                  name={name}
                  value={value}
                  onChange={(value) => context.setValue(name, value)}
                  {...widgetProps}
                />
              )}
              {this.props.children && this.props.children}
            </FormGroup>
          )
        }}
      </FormContext.Consumer>
    )
  }
}
