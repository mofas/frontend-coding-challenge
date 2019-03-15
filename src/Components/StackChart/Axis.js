import React from 'react';
import { select } from 'd3-selection';

export default class Axis extends React.PureComponent {
  static defaultProps = {
    axisFn: () => {},
    modifier: () => {},
    transform: '',
  };

  componentDidMount() {
    this.update(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  update = props => {
    if (this.root) {
      const ele = select(this.root).call(props.axisFn);
      props.modifier(ele);
    }
  };

  render() {
    const { props } = this;
    return (
      <g
        className="axis"
        transform={props.transform}
        ref={el => {
          this.root = el;
        }}
      />
    );
  }
}
