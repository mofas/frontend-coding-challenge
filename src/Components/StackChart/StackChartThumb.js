import React from 'react';
import { fromJS, List } from 'immutable';
import { extent } from 'd3-array';
import { scaleTime, scaleLinear } from 'd3-scale';
import { line, stack, area } from 'd3-shape';

import Line from './Line';
import Area from './Area';

import './StackChart.css';
const margin = { top: 4, right: 4, bottom: 4, left: 4 };

export default class StackChartThumb extends React.PureComponent {
  static defaultProps = {
    width: 120,
    height: 80,
    xKey: 'x',
    keys: List(),
    data: fromJS([[]]),
    lineColorMapFn: List(),
    areaColorMapFn: List(),
  };

  render() {
    const { props } = this;
    const {
      xKey,
      keys,
      data,
      lineColorMapFn,
      areaColorMapFn,
      width,
      height,
    } = props;

    const pdata = data.toJS();

    const actualWidth = width - margin.left - margin.right;
    const actualHeight = height - margin.top - margin.bottom;

    const sumY = pdata.map(d =>
      keys.reduce((acc, key) => (d[key] || 0) + acc, 0));

    const xFn = scaleTime()
      .rangeRound([0, actualWidth])
      .domain(extent(pdata, d => d[xKey]));

    const yFn = scaleLinear()
      .domain([0, Math.max(...sumY) * 1.618])
      .range([actualHeight, 0])
      .nice();

    const stackFn = stack().keys(keys.toJS());
    const stackData = stackFn(pdata);

    const drawLineFunction = key =>
      line().x(d => xFn(d[xKey])).y(d => yFn(d[key]));

    const drawAreaFunction = area()
      .x(d => xFn(d.data[xKey]))
      .y0(d => yFn(d[0] || 0))
      .y1(d => yFn(d[0] + (d[1] || 0)));

    return (
      <div className="component-stack-chart-thumb component-chart">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <Line
              keys={keys}
              lineData={pdata}
              lineColorMapFn={lineColorMapFn.toJS()}
              drawLineFunction={drawLineFunction}
            />
            <Area
              stackData={stackData}
              areaColorMapFn={areaColorMapFn.toJS()}
              drawAreaFunction={drawAreaFunction}
            />
          </g>
        </svg>
      </div>
    );
  }
}
