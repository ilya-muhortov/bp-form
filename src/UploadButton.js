
import PropTypes from 'prop-types';
import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Intent, Position, Toaster, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
 
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  
  input::-webkit-file-upload-button {
    cursor:pointer;
  }
`;

const UploadToaster = Toaster.create({
    position: Position.TOP
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
      uploading: false,
      filesTotal: 0,
      filesUploaded: 0
    }
  }

  setUploading = (value) => {
    this.setState({
      uploading: value
    });
  };

  uploadFiles = async (e) => {
    const { url, data, fileFieldName, onUploaded } = this.props;
    const files = e.target.files;
    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    this.setUploading(true);
    this.setState({
      filesTotal: files.length,
      filesUploaded: 0
    });

    for (const file of files) {
      let formData = new FormData();
      formData.append(fileFieldName, file);
      Object.keys(data).map(key => {
        formData.append(key, data[key])
      });

      const upload = async() => {
        return axios.post(url, formData, config).then(res => {
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
        })
        .then(() => {
          this.setState({
            filesUploaded: this.state.filesUploaded + 1
          });
        });
      };

      await upload();
    }

    this.setUploading(false);
  };

  render() {
    const { buttonProps } = this.props;
    const { uploading, filesTotal, filesUploaded } = this.state;
    return (
      <StyledButton
        icon={uploading ? <Spinner size={16}/> : IconNames.UPLOAD}
        disabled={uploading}
        active={uploading}
        {...buttonProps}
      >
        {uploading && (
          <React.Fragment>{filesUploaded} из {filesTotal}</React.Fragment>
        )}
        {!uploading && (
          <React.Fragment>
            Загрузить
            <input type="file" id="imageButton" multiple onChange={(e) => this.uploadFiles(e)} />
          </React.Fragment>
        )}
      </StyledButton>
    )
  }
}
