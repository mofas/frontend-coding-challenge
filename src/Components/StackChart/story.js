import { storiesOf } from '@storybook/react';
import React from 'react';
import { fromJS, List } from 'immutable';

import StackChart from './StackChart';
import StackChartThumb from './StackChartThumb';


const chartData = fromJS([
  {
    x: 1483200000*1000,
    action: 10,
    click: 325,
  },
  {
    x: 1483286400*1000,
    action: 22,
    click: 164,
  },
  {
    x: 1483372800*1000,
    action: 43,
    click: 623,
  },
  {
    x: 1483459200*1000,
    action: 27,
    click: 286,
  },
  {
    x: 1483545600*1000,
    action: 65,
    click: 845,
  },
  {
    x: 1483632000*1000,
    action: 89,
    click: 368,
  },
  {
    x: 1483718400*1000,
    action: 60,
    click: 865,
  },
]);

storiesOf('StackChart')
  .addWithInfo(
    'StackChart',
    '',
    () => (
      <StackChart
        keys={fromJS(['action'])}
        lineColorMapFn={fromJS(['#68b5f5'])}
        areaColorMapFn={fromJS(['#deecf6'])}
        data={chartData}
      />
    ),
    { source: true, inline: true },
  )
  .addWithInfo(
    'StackChartThumb',
    '',
    () => (
      <StackChartThumb
        keys={fromJS(['click'])}
        lineColorMapFn={fromJS(['#68b5f5'])}
        areaColorMapFn={fromJS(['#deecf6'])}
        data={chartData}
      />
    ),
    { source: true, inline: true },
  );



