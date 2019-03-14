import React from 'react';
import classnames from 'classnames';

import './Calendar.css';

const language = {
  ms0: 'January',
  ms1: 'February',
  ms2: 'March',
  ms3: 'April',
  ms4: 'May',
  ms5: 'June',
  ms6: 'July',
  ms7: 'August',
  ms8: 'September',
  ms9: 'October',
  ms10: 'November',
  ms11: 'December',
  d0: 'S',
  d1: 'M',
  d2: 'T',
  d3: 'W',
  d4: 'T',
  d5: 'F',
  d6: 'S',
  thisMonth: 'This month',
  prevMonth: 'Prev',
  nextMonth: 'Next'
};

const DEFAULT_CURRENT_DATE = new Date();
DEFAULT_CURRENT_DATE.setDate(1);

const getMonthFormatted = date => language[`ms${date.getMonth()}`];

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

export default class Calendar extends React.PureComponent {
  // propTypes: {
  //   assignedMonth: React.PropTypes.string,
  //   assignedYear: React.PropTypes.string,
  //   selectedDate: React.PropTypes.object,
  //   availableDate: React.PropTypes.shape({
  //     from: React.PropTypes.object,
  //     // Date instance
  //     // Date instance
  //     to: React.PropTypes.object,
  //   }),
  //   durationDate: React.PropTypes.shape({
  //     from: React.PropTypes.object,
  //     // Date instance
  //     // Date instance
  //     to: React.PropTypes.object,
  //   }),
  //   onChange: React.PropTypes.func,
  // }
  static defaultProps = {
    onChange: () => {},
    onHover: () => {},
    selectedDate: undefined,
    highlightDates: []
  };
  constructor(props) {
    super(props);
    this.state = { currentDate: DEFAULT_CURRENT_DATE, today: new Date() };
  }
  componentWillMount() {
    this.setCurrentDateFromProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.assignedYear !== this.props.assignedYear ||
      nextProps.assignedMonth !== this.props.assignedMonth
    ) {
      this.setCurrentDateFromProps(nextProps);
    }
  }
  setCurrentDateFromProps = props => {
    const targetMonth = parseInt(props.assignedMonth, 10);
    const targetYear = parseInt(props.assignedYear, 10);

    if (
      !isNaN(targetMonth) &&
      !isNaN(targetYear) &&
      targetMonth >= 0 &&
      targetMonth < 13
    ) {
      this.setState({ currentDate: new Date(targetYear, targetMonth - 1, 1) });
    }
  };
  stringifyDay = date =>
    `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  // month between 1 ~ 12
  _monthGenegrator(month, year) {
    const monthArray = [];
    const firstDay = new Date(year, month - 1, 1, 0, 0, 0, 0);
    //  weekDay between 1 ~ 7 , 1 is Monday, 7 is Sunday
    const firstDayInFirstweek = firstDay.getDay() > 0 ? firstDay.getDay() : 7;
    const daysOfMonth = daysInMonth(month, year);
    const prevDaysOfMonth = daysInMonth(month - 1, year);

    let recordDate = 0;

    // record which day obj already genegrate
    // first week row
    monthArray.push(
      this._weekGenerator(
        year,
        month,
        recordDate - firstDayInFirstweek,
        daysOfMonth,
        prevDaysOfMonth
      )
    );

    recordDate = 7 - firstDayInFirstweek;
    // loop for following week row
    while (recordDate < daysOfMonth - 1) {
      monthArray.push(
        this._weekGenerator(year, month, recordDate, daysOfMonth)
      );
      recordDate += 7;
    }

    // set isToday
    if (
      this.state.currentDate.getMonth() === this.state.today.getMonth() &&
      this.state.currentDate.getFullYear() === this.state.today.getFullYear()
    ) {
      const atWeek =
        Math.ceil((this.state.today.getDate() + firstDayInFirstweek - 1) / 7) -
        1;
      const atDay = (this.state.today.getDate() + firstDayInFirstweek - 2) % 7;
      monthArray[atWeek][atDay].isToday = true;
    }
    return monthArray;
  }
  // month between 1~12
  _weekGenerator = (year, month, startDate, daysOfMonth, prevDaysOfMonth) => {
    const { availableDate, durationDate } = this.props;

    const week = [];
    let realDate;
    let outmonth;
    let isBeforeMonth;
    let fullDate;
    let available;
    let inDuration;
    let fromDuration, toDuration;

    for (let i = 1; i <= 7; i++) {
      outmonth = false;
      available = true;
      inDuration = false;
      fromDuration = false;
      toDuration = false;

      if (startDate + i < 0) {
        realDate = prevDaysOfMonth + startDate + i + 1;
        outmonth = true;
        isBeforeMonth = true;
      } else if (startDate + i + 1 > daysOfMonth) {
        realDate = startDate + i - daysOfMonth + 1;
        outmonth = true;
        isBeforeMonth = false;
      } else {
        realDate = startDate + i + 1;
        isBeforeMonth = false;
      }

      if (outmonth && isBeforeMonth) {
        fullDate = new Date(year, month - 2, realDate);
      } else if (outmonth && !isBeforeMonth) {
        fullDate = new Date(year, month, realDate);
      } else {
        fullDate = new Date(year, month - 1, realDate);
      }

      // is available ?
      if (
        availableDate &&
        availableDate.from &&
        fullDate < availableDate.from
      ) {
        available = false;
      }

      if (availableDate && availableDate.to && fullDate > availableDate.to) {
        available = false;
      }

      if (durationDate && durationDate.from && durationDate.to) {
        if (
          fullDate.getTime() > durationDate.from.getTime() &&
          fullDate.getTime() < durationDate.to.getTime()
        ) {
          inDuration = true;
        }
        if (
          this.stringifyDay(fullDate) === this.stringifyDay(durationDate.from)
        ) {
          fromDuration = true;
        }
        if (
          this.stringifyDay(fullDate) === this.stringifyDay(durationDate.to)
        ) {
          toDuration = true;
        }
      }

      week.push({
        outmonth,
        day: i,
        date: realDate,
        available,
        fullDate,
        inDuration,
        fromDuration,
        toDuration
      });
    }
    return week;
  };
  _prevMonth = () => {
    const newCurrentDate = new Date(this.state.currentDate);
    newCurrentDate.setMonth(this.state.currentDate.getMonth() - 1, 1);
    this.setState({ currentDate: newCurrentDate });
  };
  _nextMonth = () => {
    const newCurrentDate = new Date(this.state.currentDate);
    newCurrentDate.setMonth(this.state.currentDate.getMonth() + 1, 1);
    this.setState({ currentDate: newCurrentDate });
  };
  _selectDayEvent = dateObj => () => {
    const selectedDateObj = {
      year: this.state.currentDate.getFullYear(),
      month: this.state.currentDate.getMonth(),
      day: dateObj.date,
      fullDate: dateObj.fullDate
    };
    this.props.onChange(selectedDateObj);
  };
  _hoverDayEvent = dateObj => () => {
    if (dateObj) {
      const selectedDateObj = {
        year: this.state.currentDate.getFullYear(),
        month: this.state.currentDate.getMonth(),
        day: dateObj.date,
        fullDate: dateObj.fullDate
      };
      this.props.onHover(selectedDateObj);
    } else {
      this.props.onHover(null);
    }
  };
  render() {
    const { selectedDate } = this.props;
    const monthObj = this._monthGenegrator(
      this.state.currentDate.getMonth() + 1,
      this.state.currentDate.getFullYear()
    );

    const selectedDateObj = selectedDate
      ? {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth(),
          year: selectedDate.getFullYear()
        }
      : null;

    const $month = monthObj.map((week, i) => {
      const $week = week.map((day, j) => {
        const dateCx = classnames({
          'cal-month-day': true,
          'cal-day-weekend': day.day === 6 || day.day === 7,
          'cal-day-today': day.isToday,
          notAvailable: !day.available,
          selected:
            selectedDateObj &&
            selectedDateObj.day === day.date &&
            selectedDateObj.month === this.state.currentDate.getMonth() &&
            selectedDateObj.year === this.state.currentDate.getFullYear() &&
            !day.outmonth
        });
        const wrapDateCx = classnames('cal-span', 'cal-cell', {
          'cal-day-outmonth': day.outmonth,
          inDuration: day.inDuration,
          fromDuration: day.fromDuration,
          toDuration: day.toDuration
        });
        return (
          <div className={wrapDateCx} key={j}>
            <div
              className={dateCx}
              onClick={this._selectDayEvent(day)}
              onMouseEnter={this._hoverDayEvent(day)}
            >
              {day.date}
            </div>
          </div>
        );
      });
      return (
        <div className="cal-row-fluid cal-week" key={i}>
          {$week}
        </div>
      );
    });

    return (
      <div className="component-calendar">
        <div className="nav-btn prev" onClick={this._prevMonth}>
          <svg
            className="arrow-left arrow-icon"
            x="0px"
            y="0px"
            width="14px"
            height="14px"
            viewBox="0 0 199.404 199.404"
          >
            <polygon points="135.412,0 35.709,99.702 135.412,199.404 163.695,171.119 92.277,99.702 163.695,28.285" />
          </svg>
        </div>
        <div className="calendar-table">
          <div className="calendar-header row">
            <div className="date">
              {getMonthFormatted(this.state.currentDate)}{' '}
              {this.state.currentDate.getFullYear()}
            </div>
          </div>
          <div className="cal-row-fluid cal-row-head">
            <div className="cal-span">{language.d1}</div>
            <div className="cal-span">{language.d2}</div>
            <div className="cal-span">{language.d3}</div>
            <div className="cal-span">{language.d4}</div>
            <div className="cal-span">{language.d5}</div>
            <div className="cal-span">{language.d6}</div>
            <div className="cal-span">{language.d0}</div>
          </div>
          <div className="cal-month-box">{$month}</div>
        </div>
        <div className="nav-btn next" onClick={this._nextMonth}>
          <svg
            className="arrow-right arrow-icon"
            x="0px"
            y="0px"
            width="14px"
            height="14px"
            viewBox="0 0 199.404 199.404"
          >
            <polygon points="63.993,199.404 163.695,99.702 63.993,0 35.709,28.285 107.127,99.702 35.709,171.119" />
          </svg>
        </div>
      </div>
    );
  }
}
