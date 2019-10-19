
import React, { Component } from 'react';
import { IconNames } from '@blueprintjs/icons';
import { Button, Intent } from '@blueprintjs/core';


export default class ResetButton extends Component {
  render() {
    const { onReset, disabled } = this.props;
    return (
      <Button
        icon={IconNames.CROSS}
        intent={Intent.NONE}
        minimal={true}
        disabled={disabled}
        onClick={() => onReset()}
        tabIndex={-1}
      />
    )
  }
}
