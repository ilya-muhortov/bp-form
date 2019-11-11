
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Alert,
  Intent,
  Button,
  Toaster,
  Position,
  H6,
  H5
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';

const DeleteToaster = Toaster.create({
  position: Position.TOP
});

const StyledAlert = styled(Alert)`
  width: 500px;
  max-width: 500px;
`;

export default class DeleteDialog extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    loadRelatedObjects: PropTypes.bool,
    buttonProps: PropTypes.object
  };

  static defaultProps = {
    loadRelatedObjects: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      loading: false,
      relatedObjects: undefined
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  setLoading = (value) => {
    this.setState({
      loading: value
    });
  };

  handleDelete = () => {
    const { item, onDelete } = this.props;
    const { loading } = this.state;
    if (loading) {
      return;
    }

    this.setLoading(true);

    axios.delete(item.meta.url).then(res => {
      this.closeDialog();
      onDelete(item);
      DeleteToaster.show({
        icon: IconNames.TRASH,
        message: 'Объект успешно удален',
        timeout: 4000
      })
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 403) {
        DeleteToaster.show({
          message: 'У вас недостаточно прав',
          intent: Intent.DANGER,
          timeout: 4000
        })
      }
    }).then(() => {
      this.setLoading(false);
    });
  };

  openDialog = () => {
    this.setState({isOpen: true});
    if (this.props.loadRelatedObjects) {
      axios.get(`${this.props.url}/prepare_delete`).then(res => {
        this.setState({
          relatedObjects: res.data
        })
      });
    }
  };

  closeDialog = () => {
    const { loading } = this.state;
    if (loading) {
      return;
    }

    this.setState({
      isOpen: false
    });
  };

  keydown = (e) => {
    const { isOpen } = this.state;
    if (isOpen) {
      const keyCode = e.key.toUpperCase();
      if (keyCode === 'ENTER') {
        this.handleDelete();
        e.preventDefault();
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keydown, false);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.keydown, false);
  }

  render() {
    const { isOpen, relatedObjects } = this.state;
    const { item, children, buttonProps } = this.props;
    return (
      <React.Fragment>
        <Button
          tabIndex={'-1'}
          icon={IconNames.TRASH}
          minimal={true}
          onClick={this.openDialog}
          {...buttonProps}
        />

        <StyledAlert
          cancelButtonText="Отмена"
          confirmButtonText="Удалить"
          icon={IconNames.TRASH}
          canEscapeKeyCancel={true}
          canOutsideClickCancel={true}
          intent={Intent.DANGER}
          isOpen={isOpen}
          onCancel={this.closeDialog}
          onConfirm={this.handleDelete}
          transitionDuration={200}
        >
          {!children && (
            <React.Fragment>
              <p>Вы уверены, что хотите удалить "<strong>{item.meta.verbose_name}</strong>"?</p>
              <H5>{item.display}</H5>
            </React.Fragment>
          )}
          {children && children}
          {relatedObjects &&
          <React.Fragment>
            {relatedObjects.map((relatedObject, index) =>
              <React.Fragment key={index}>
                <p>Будут затронуты следующие объекты:</p>
                <H6>{relatedObject.label} ({relatedObject.count})</H6>
                <ul className={'bp3-list'}>
                {relatedObject.objects.map((object, index) =>
                  <li key={index}>{object}</li>
                )}
                </ul>
              </React.Fragment>
            )}
          </React.Fragment>
          }
        </StyledAlert>
      </React.Fragment>
    );
  }
}
