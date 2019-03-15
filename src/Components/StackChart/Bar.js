import React from 'react';
import { List } from 'immutable';

export default class Line extends React.PureComponent {
  static defaultProps = {
    barWidth: 4,
    xFn: () => {},
    yFn: () => {},
    keys: [],
    data: List([]),
    colorMapFn: List([])
  };

  render() {
    const { props } = this;
    const { barWidth, xFn, yFn, keys, data, colorMapFn } = props;
    return (
      <g className="bar-layer">
        {data.map((d, i) => {
          return (
            <g key={i}>
              {keys.map((key, j) => (
                <rect
                  x={xFn(d) + 1}
                  y={yFn(d.y[key] + d[key])}
                  width={barWidth / 2 - 2}
                  height={yFn(0) - yFn(d[key])}
                  fill={colorMapFn.get(j)}
                />
              ))}
            </g>
          );
        })}
        {/* {keys.map((key, i) => (
          <rect
            key={key}
            // stroke={lineColorMapFn[i]}
            // strokeWidth={strokeWidth}
            // fill={ColorMapFn[i]}
          />
        ))} */}
      </g>
    );
  }
}
