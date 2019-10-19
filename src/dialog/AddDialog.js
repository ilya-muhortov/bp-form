
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
    
    .multiline { white-space: pre-wrap; }
  }
`;


export default class AddDialog extends Component {

  static propTypes = {
    item: PropTypes.object,
    url: PropTypes.string.isRequired,
    FormComponent: PropTypes.any.isRequired,
    postSave: PropTypes.func,
    buttonProps: PropTypes.object,
    dialogProps: PropTypes.object,
    formProps: PropTypes.object,
  };

  static defaultProps = {
    item: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      canOutsideClickClose: true
    };

    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handlePostSave = this.handlePostSave.bind(this);
    this.itemChanged = this.itemChanged.bind(this);
  }

  handlePostSave(item) {
    const { postSave } = this.props;
    this.setState({
      isOpen: false
    });
    if (postSave) {
      postSave(item);
    }
  };

  closeDialog() {
    this.setState({
      isOpen: false,
      canOutsideClickClose: true
    })
  }

  openDialog() {
    this.setState({
      isOpen: true
    })
  }

  itemChanged() {
    this.setState({
      canOutsideClickClose: false
    })
  };

  render() {
    const { url, FormComponent, formProps, buttonProps, dialogProps, item } = this.props;
    const { isOpen, canOutsideClickClose } = this.state;

    return (
      <React.Fragment>
        <Button
          icon={IconNames.PLUS}
          intent={Intent.SUCCESS}
          onClick={this.openDialog}
          text={'Добавить'}
          {...buttonProps}
        />

        <StyledDialog
          isOpen={isOpen}
          onClose={this.closeDialog}
          portalClassName={'bp3-portal-flex-start'}
          canOutsideClickClose={canOutsideClickClose}
          {...dialogProps}
        >
          <div className="bp3-dialog-body">
            <FormProvider
              item={item}
              url={url}
              postSave={this.handlePostSave}
              onItemChanged={this.itemChanged}
            >
              <FormContext.Consumer>
              {context => {
                const { loading } = context;
                return (
                  <React.Fragment>
                    <FormComponent {...formProps} />
                    <Button
                      text={'Добавить'}
                      onClick={() => context.save()}
                      intent={Intent.PRIMARY}
                      large={true}
                      loading={loading}
                    />
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
