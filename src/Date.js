
import PropTypes from 'prop-types';
import moment from 'moment';

import React, { Component } from 'react';
import {
  Button,
  PopoverPosition
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';
import { localeUtils } from 'react-day-picker/utils';
import {
  formatMonthTitle,
  formatWeekdayShort,
  getFirstDayOfWeek,
  getMonths,
} from './DateLocale';


export class DateWidget extends Component {

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  onChange = (value) => {
    this.props.onChange(value);
  };

  onParse = (value) => {
    return new Date(value);
  };

  render() {
    let { value, minDate, props } = this.props;

    if (value) {
      value = moment(value).toDate();
    }

    if (minDate) {
      minDate = new Date(minDate);
      if (value && value < minDate) {
        value = undefined;
        this.props.onChange(null);
      }
    }
    else {
      minDate = new Date('1900-01-01');
    }

    return (
      <DateInput
        formatDate={(date) => moment(date).format('DD.MM.YYYY')}
        popoverProps={{
          position: PopoverPosition.BOTTOM_LEFT
        }}
        locale={'ru'}
        localeUtils={{...localeUtils, getFirstDayOfWeek, getMonths, formatMonthTitle, formatWeekdayShort}}
        todayButtonText={'Сегодня'}
        clearButtonText={'Очистить'}
        {...props}
        onChange={(value) => this.onChange(value)}
        value={value}
        placeholder={'дд.мм.гггг'}
        inputProps={{
          autoFocus: this.props.autoFocus,
          ref: this.inputRef
        }}
        parseDate={(str) => this.onParse(str)}
        showActionsBar={true}
        minDate={minDate}
        rightElement={value &&
          <Button
            minimal={true}
            icon={IconNames.CROSS}
            onClick={() => this.onChange(null)}
            tabIndex={'-1'}
          />
        }
      />
    )
  }
}
