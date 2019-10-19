
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Intent,
  Button,
  Dialog
} from '@blueprintjs/core';
import styled from 'styled-components';
import { IconNames } from '@blueprintjs/icons';

import { FormContext, FormProvider } from '../context';


const StyledDialog = styled(Dialog)`
  padding-bottom: 0;
  table {
    background: #fff;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    
    .multiline {white-space: pre-wrap}
  }
`;


export default class EditDialog extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    buttonProps: PropTypes.object,
    dialogProps: PropTypes.object,
    FormComponent: PropTypes.any.isRequired,
    formProps: PropTypes.object,
    hideSaveButton: PropTypes.bool
  };

  static defaultProps = {
    hideSaveButton: false
  };

  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      isOpen: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextProps.isOpen) {
      newState.isOpen = true;
    }
    if (nextProps.item) {
      newState.item = nextProps.item;
    }
    if (newState) {
      this.setState(newState)
    }
  }

  handlePostSave = (item) => {
    this.setState({
      isOpen: false
    });
    this.props.onUpdate(item);
  };

  render() {
    const { FormComponent, hideSaveButton, actions, formProps } = this.props;
    return (
      <React.Fragment>
        <Button
          icon={IconNames.EDIT}
          onClick={(e) => this.setState({isOpen: true})}
          small={true}
          minimal={true}
          text={'Изменить'}
          {...this.props.buttonProps}
        />

        <StyledDialog
          isOpen={this.state.isOpen}
          onClose={(e) => this.setState({isOpen: false})}
          portalClassName={'bp3-portal-flex-start'}
          {...this.props.dialogProps}
        >
          <div className="bp3-dialog-body">
            <FormProvider
              item={this.props.item}
              url={this.props.url}
              postSave={this.handlePostSave}
            >
              <FormContext.Consumer>
              {context => {
                const { loading } = context;
                return (
                  <React.Fragment>
                    <FormComponent {...formProps} />
                    {!hideSaveButton && (
                      <Button
                        text={'Обновить'}
                        onClick={() => context.save()}
                        intent={Intent.PRIMARY}
                        large={true}
                        loading={loading}
                      />
                    )}
                    {actions}
                  </React.Fragment>
                )
              }}
              </FormContext.Consumer>
            </FormProvider>
          </div>
        </StyledDialog>
      </React.Fragment>
    )
  }
}
