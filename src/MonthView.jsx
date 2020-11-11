import React from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';

import { CALENDAR_TYPE_LOCALES, CALENDAR_TYPES } from './shared/const';
import { isCalendarType } from './shared/propTypes';

function getCalendarTypeFromLocale(locale) {
  return (
    Object.keys(CALENDAR_TYPE_LOCALES)
      .find((calendarType) => CALENDAR_TYPE_LOCALES[calendarType].includes(locale))
    || CALENDAR_TYPES.ISO_8601
  );
}

export default function MonthView(props) {
  const {
    locale,
    onMouseLeave,
  } = props;
  const {
    calendarType = getCalendarTypeFromLocale(locale),
    formatShortWeekday,
    onClickWeekNumber,
    showWeekNumbers,
    ...childProps
  } = props;

  function renderWeekdays() {
    return (
      <Weekdays
        calendarType={calendarType}
        formatShortWeekday={formatShortWeekday}
        locale={locale}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  function renderDays() {
    return (
      <Days
        calendarType={calendarType}
        {...childProps}
      />
    );
  }

  const className = 'react-calendar__month-view';

  return (
    <div className={className}>
      {renderWeekdays()}
      {renderDays()}
    </div>
  );
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string,
  onClickWeekNumber: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  wrapTile: PropTypes.func,
};
