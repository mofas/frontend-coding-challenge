import React from 'react';
import numeral from 'numeral';
import { fromJS, List } from 'immutable';
import { timeFormat } from 'd3-time-format';
import { extent } from 'd3-array';
import { scaleTime, scaleLinear } from 'd3-scale';
// import { line, stack, area } from 'd3-shape';
import { line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';

import AxisWrapper from './AxisWrapper';
import Line from './Line';

import './StackChart.css';

const formatTime = timeFormat('%m/%d');

const margin = { top: 10, right: 30, bottom: 40, left: 60 };

const xAxisModifier = ele => {
  ele.selectAll('text').attr('dy', '20px');
};

const yAxisModifier = ele => {
  ele.selectAll('text').attr('dx', '-5px');
};

const yAxisTickFormatDefault = n => numeral(n).format('0a');

export default class StackChart extends React.PureComponent {
  static defaultProps = {
    width: 1000,
    height: 200,
    xKey: 'x',
    keys: List(),
    data: fromJS([[]]),
    lineColorMapFn: List(),
    areaColorMapFn: List(),
    yAxisTickFormat: yAxisTickFormatDefault
  };

  render() {
    const { props } = this;
    const {
      xKey,
      keys,
      data,
      lineColorMapFn,
      yAxisTickFormat,
      width,
      height
    } = props;

    const pdata = data.toJS();

    const actualWidth = width - margin.left - margin.right;
    const actualHeight = height - margin.top - margin.bottom;

    const sumY = pdata.map(d =>
      keys.reduce((acc, key) => (d[key] || 0) + acc, 0)
    );

    const xFn = scaleTime()
      .rangeRound([0, actualWidth])
      .domain(extent(pdata, d => d[xKey]));

    const yFn = scaleLinear()
      .domain([0, Math.max(...sumY) * 1.618])
      .range([actualHeight, 0]);

    let xTicks = pdata.length;
    if (xTicks > 10) xTicks = 10;

    const xAxis = axisBottom()
      .scale(xFn)
      .ticks(xTicks)
      .tickSize(0)
      .tickFormat(formatTime);

    const yAxis = axisLeft()
      .scale(yFn)
      .ticks(4)
      .tickFormat(yAxisTickFormat)
      .tickSize(-actualWidth);

    // const stackFn = stack().keys(keys.toJS());
    // const stackData = stackFn(pdata);

    const drawLineFunction = key =>
      line()
        .x(d => xFn(d[xKey]))
        .y(d => yFn(d[key]));

    // const drawAreaFunction = area()
    //   .x(d => xFn(d.data[xKey]))
    //   .y0(d => yFn(d[0] || 0))
    //   .y1(d => yFn(d[0] + (d[1] || 0)));

    return (
      <div className="component-stack-chart component-chart">
        <svg width={width} height={height}>
          <AxisWrapper
            margin={margin}
            actualHeight={actualHeight}
            xAxis={xAxis}
            yAxis={yAxis}
            xAxisModifier={xAxisModifier}
            yAxisModifier={yAxisModifier}
          >
            <Line
              keys={keys}
              lineData={pdata}
              lineColorMapFn={lineColorMapFn.toJS()}
              drawLineFunction={drawLineFunction}
            />
            {/* <Area
              stackData={stackData}
              areaColorMapFn={areaColorMapFn.toJS()}
              drawAreaFunction={drawAreaFunction}
            /> */}
          </AxisWrapper>
        </svg>
      </div>
    );
  }
}
