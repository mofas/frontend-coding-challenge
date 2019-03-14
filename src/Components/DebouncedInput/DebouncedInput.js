import classnames from 'classnames/bind';
import React from 'react';

import './Input.css';

const getPropsForInput = props =>
  Object.keys(props).reduce((accu, key) => {
    if (key === 'debounceMs') {
      return accu;
    }
    return { ...accu, [key]: props[key] };
  }, {});

// debounce input
export default class DebouncedInput extends React.PureComponent {
  static defaultProps = {
    debounceMs: 250,
    id: null,
    value: '',
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    this.debounceTimer = null;
    this.propsForInput = getPropsForInput(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.propsForInput = getPropsForInput(nextProps);
    this.setState({
      value: nextProps.value
    });
  }

  updateState = ({ target: { value } }) => {
    this.setState({ value });

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.props.onChange({ target: { value } });
    }, this.props.debounceMs);
  };

  render() {
    const { className = '', id } = this.props;

    return (
      <input
        {...this.propsForInput}
        className={`input ${className}`}
        id={id}
        onChange={this.updateState}
        value={this.state.value || ''}
      />
    );
  }
}
