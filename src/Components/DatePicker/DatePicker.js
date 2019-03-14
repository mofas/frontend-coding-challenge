import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Calendar from '../Calendar/Calendar';
import DebouncedInput from '../DebouncedInput/DebouncedInput';

import './DatePicker.css';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export default class DatePicker extends React.PureComponent {
  static defaultProps = {
    disabled: false,
    placeholder: 'Please select date',
    selectedDate: null,
    style: {},
    className: ''
  };

  constructor(props) {
    super(props);
    this.state = { openCalendar: false };
  }

  componentWillUnmount() {
    window.document.removeEventListener('click', this.handleDoucmentClickEvent);
  }

  getDateFormat = date => {
    const yyyy = date.getFullYear().toString();
    const mm = date.getMonth();
    const dd = date.getDate().toString();
    return `${monthNames[mm]} ${dd[1] ? dd : `0${dd[0]}`}, ${yyyy}`;
  };

  onDateChange = (...args) => {
    window.document.removeEventListener('click', this.handleDoucmentClickEvent);
    this.setState({ openCalendar: false });
    if (this.props.onChange) {
      this.props.onChange(...args);
    }
  };

  handleDoucmentClickEvent = e => {
    // https://facebook.github.io/react/blog/#dom-node-refs
    const contains = ReactDOM.findDOMNode(this.refs.element).contains(e.target);
    // click dp-month or dp-year will misjudget...
    if (!contains && !e.target.classList.contains('mf-calendar')) {
      window.document.removeEventListener(
        'click',
        this.handleDoucmentClickEvent
      );
      this.setState({ openCalendar: false });
    }
  };

  handleOpenCalendar = () => {
    if (!this.props.disabled) {
      this.setState({ openCalendar: true });
      window.document.addEventListener('click', this.handleDoucmentClickEvent);
    }
  };

  open = () => {
    this.handleOpenCalendar();
  };

  render() {
    const {
      disabled,
      className,
      style,
      placeholder,
      selectedDate,
      ...calendarProps
    } = this.props;

    return (
      <div
        className={classnames('component-datepick', className, { disabled })}
        style={style}
      >
        <div onClick={this.handleOpenCalendar}>
          <DebouncedInput
            disabled={disabled}
            value={selectedDate ? this.getDateFormat(selectedDate) : ''}
            type="text"
            placeholder={placeholder}
          />
        </div>
        <div
          className={classnames({
            'calendar-wrap': true,
            show: this.state.openCalendar
          })}
        >
          <Calendar
            {...calendarProps}
            selectedDate={selectedDate}
            ref="element"
            onChange={this.onDateChange}
          />
        </div>
      </div>
    );
  }
}
