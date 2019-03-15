import React from 'react';

export default class Line extends React.PureComponent {
  static defaultProps = {
    keys: [],
    lineData: [],
    lineColorMapFn: [],
    drawLineFunction: () => {},
  };

  render() {
    const { props } = this;
    const { keys, lineData, lineColorMapFn, drawLineFunction } = props;
    return (
      <g className="lines-layer">
        {keys.map((key, i) => (
          <path
            key={key}
            stroke={lineColorMapFn[i]}
            strokeWidth="4"
            fill="transparent"
            d={drawLineFunction(key)(lineData)}
          />
        ))}
      </g>
    );
  }
}
