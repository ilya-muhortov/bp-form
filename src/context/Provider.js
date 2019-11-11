
import git s_ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import React, { Component } from 'react';
import {
  Intent,
  Position,
  Toaster
} from '@blueprintjs/core';
import { default as FormErrors } from './FormErrors';

export const FormContext = React.createContext();

const MessageToaster = Toaster.create({
  position: Position.TOP,
});

export class FormProvider extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    url: PropTypes.string,
    postSave: PropTypes.func,
    postSaveMessage: PropTypes.string,
    showNonFieldErrors: PropTypes.bool,
    showForm: PropTypes.bool,
    onItemChanged: PropTypes.func
  };

  static defaultProps = {
    showNonFieldErrors: true,
    showForm: true
  };

  constructor(props) {
    super(props);

    this.state = {
      item: _.clone(props.item),
      errors: {},
      loading: false
    };

    this.formRef = React.createRef();
  }

  keydown = (e) => {
    const keyCode = e.key.toUpperCase();
    if (keyCode === 'F1') {
      this.save();
    }
  };

  save = () => {
    const { item } = this.state;
    const { postSave, postSaveMessage } = this.props;
    const isNew = item.id ? false : true;

    this.setState({
      errors: {},
      loading: true
    });

    axios({
      method: isNew ? 'POST': 'PUT',
      url: this.props.url ? this.props.url : item.meta.url,
      data: item
    }).then(res => {
      this.setState({
        item: res.data
      });

      if (postSaveMessage) {
        MessageToaster.show({
          message: postSaveMessage,
          intent: Intent.SUCCESS,
          timeout: 2000
        });
      }

      if (postSave && typeof postSave === 'function') {
        postSave(res.data);
      }
    }).catch(err => {
      const response = err.response;
      let errors = {};
      if (response && response.data) {
        errors = response.data;
      }
      this.setState({errors: errors});
    }).then(() => {
        this.setState({loading: false});
    });
  };

  setDateValue = (name, value) => {
    let item = this.state.item;
    if (value && moment(value).isValid()) {
      _.set(item, name, moment(value).format('YYYY-MM-DD'));
    }
    else {
      _.set(item, name, null);
    }
    this.setState({item: item});
  };

  setDateTimeValue = (name, value) => {
    let item = this.state.item;
    if (value && moment(value).isValid()) {
      _.set(item, name, moment(value).format('YYYY-MM-DDTHH:mm:SSZ'));
    }
    else {
      _.set(item, name, null);
    }
    this.setState({item: item});
  };

  setValue = (name, value) => {
    const { onItemChanged } = this.props;
    let item = this.state.item;
    let errors = this.state.errors;
    _.set(item, name, value);
    if (errors[name] && errors[name].length > 0) {
      delete errors[name];
    }
    this.setState({item: item, errors: errors});
    if (onItemChanged) {
      onItemChanged(item);
    }
  };

  getValue = (name) => {
    const item = this.state.item;
    return _.get(item, name);
  };

  render() {
    const { errors } = this.state;
    const { showNonFieldErrors, showForm } = this.props;
    return (
      <FormContext.Provider value={{
        item: this.state.item,
        errors: this.state.errors,
        loading: this.state.loading,
        save: this.save,
        setDateValue: this.setDateValue,
        setDateTimeValue: this.setDateTimeValue,
        setValue: this.setValue,
        getValue: this.getValue
      }}>
        {showForm && (
          <form ref={this.formRef} autoComplete="off">
            {(showNonFieldErrors && errors['non_field_errors']) && (
              <div className={'mb-10'}>
                <FormErrors errors={errors['non_field_errors']} />
              </div>
            )}
            {this.props.children}
          </form>
        )}
        {!showForm && this.props.children}
      </FormContext.Provider>
    );
  }
}
