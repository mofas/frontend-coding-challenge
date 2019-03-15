import React from 'react';
import numeral from 'numeral';
import { fromJS, List } from 'immutable';
import { timeFormat } from 'd3-time-format';
import { extent } from 'd3-array';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

import AxisWrapper from './AxisWrapper';
import Bar from './Bar';

const formatTime = timeFormat('%m/%d %I:%M');

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
    colorMapFn: List(),
    yAxisTickFormat: yAxisTickFormatDefault
  };

  render() {
    const { props } = this;
    const {
      xKey,
      keys,
      data,
      yAxisTickFormat,
      width,
      height,
      colorMapFn
    } = props;

    let pdata = data.toJS();

    pdata = pdata.map(d => {
      d.y = {};
      let based = 0;
      keys.forEach(key => {
        d.y[key] = based;
        based += d[key];
      });
      return d;
    });
    // console.log(pdata.map(d => d[xKey]));

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
      .ticks(4)
      .tickSize(0)
      .tickFormat(formatTime);

    const yAxis = axisLeft()
      .scale(yFn)
      .ticks(4)
      .tickFormat(yAxisTickFormat)
      .tickSize(-actualWidth);

    const getX = d => xFn(d[xKey]);
    const barWidth = actualWidth / pdata.length;
    // console.log(yFn(0), yFn(10));

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
            <Bar
              keys={keys}
              data={pdata}
              barWidth={barWidth}
              colorMapFn={colorMapFn}
              xFn={getX}
              yFn={yFn}
            />
          </AxisWrapper>
        </svg>
      </div>
    );
  }
}
