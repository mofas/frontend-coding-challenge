import React from 'react';

export default class Area extends React.PureComponent {
  static defaultProps = {
    stackData: [],
    areaColorMapFn: [],
    drawAreaFunction: () => {},
  };

  render() {
    const { props } = this;
    const { stackData, areaColorMapFn, drawAreaFunction } = props;
    return (
      <g className="stack-area-layer">
        {stackData.map((d, i) => (
          <path key={i} fill={areaColorMapFn[i]} d={drawAreaFunction(d)} />
        ))}
      </g>
    );
  }
}
