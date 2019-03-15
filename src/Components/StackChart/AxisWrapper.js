import React from 'react';
import Axis from './Axis';

export default class AxisWrapper extends React.PureComponent {
  static defaultProps = {
    margin: {},
    actualHeight: 1000,
    xAxis: () => {},
    yAxis: () => {},
    xAxisModifier: () => {},
    yAxisModifier: () => {},
  };

  render() {
    const { props } = this;
    const {
      margin,
      children,
      actualHeight,
      xAxis,
      yAxis,
      xAxisModifier,
      yAxisModifier,
    } = props;

    return (
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {children}
        <Axis
          className="x"
          transform={`translate(0,${actualHeight})`}
          axisFn={xAxis}
          modifier={xAxisModifier}
        />
        <Axis className="y" axisFn={yAxis} modifier={yAxisModifier} />
      </g>
    );
  }
}
