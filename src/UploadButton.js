
import PropTypes from 'prop-types';
import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Intent, Position, Toaster } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

const UploadToaster = Toaster.create({
    position: Position.TOP,
});

export class UploadButton extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    data: PropTypes.object,
    fileFieldName: PropTypes.string,
  };

  static defaultProps = {
    fileFieldName: 'file'
  };

  constructor(props) {
    super(props);

    this.state = {
      uploading: false
    }
  }

  uploadFile = (e) => {
    const { url, data, fileFieldName, onUploaded } = this.props;
    const files = e.target.files;

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    Array.from(files).forEach(file => {
      let formData = new FormData();
      formData.append(fileFieldName, file);
      Object.keys(data).map(key => {
        formData.append(key, data[key])
      });

      axios.post(url, formData, config).then(res => {
        onUploaded(res.data);
      })
      .catch(error => {
        const response = error.response;
        if (response && response.status === 400) {
          if (response.data && response.data.file) {
            UploadToaster.show({
              intent: Intent.DANGER,
              message: `${file.name} - ${response.data.file[0]}`
            });
          }
        }
      });
    });
  };

  render() {
    const { buttonProps } = this.props;
    return (
      <StyledButton
        icon={IconNames.UPLOAD}
        text={'Загрузить'}
        {...buttonProps}
      >
        <input type="file" id="imageButton" multiple onChange={(e) => this.uploadFile(e)} />
      </StyledButton>
    )
  }
}
