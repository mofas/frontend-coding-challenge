import React from 'react';

export default class Line extends React.PureComponent {
  static defaultProps = {
    keys: [],
    lineData: [],
    strokeWidth: 2,
    lineColorMapFn: [],
    drawLineFunction: () => {}
  };

  render() {
    const { props } = this;
    const {
      keys,
      lineData,
      lineColorMapFn,
      drawLineFunction,
      strokeWidth
    } = props;
    return (
      <g className="lines-layer">
        {keys.map((key, i) => (
          <path
            key={key}
            stroke={lineColorMapFn[i]}
            strokeWidth={strokeWidth}
            fill="transparent"
            d={drawLineFunction(key)(lineData)}
          />
        ))}
      </g>
    );
  }
}
