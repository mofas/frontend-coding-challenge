import React, { useState } from 'react';
import { fromJS } from 'immutable';
import styled from 'styled-components';

import DatePicker from './DatePicker/DatePicker';
import StackChart from './StackChart/StackChart';

import rawData from '../data/valid-invalid.json';

const DatePickerGroup = styled.div`
  margin: 20px auto;
  display: flex;
  width: 640px;
`;

const LegendWrap = styled.div`
  margin: 20px;
`;
const Legend = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 20px;
  background: ${props => props.color};
`;
const data = fromJS(
  rawData.map(d => {
    d.x = new Date(d.time_sec);
    d.ts = d.x.getTime();
    d.total_count = Number(d.total_count);
    d.imcompleted = Number(d.imcompleted);
    return d;
  })
);

const Page1 = () => {
  let [fromTime, setFromTime] = useState(new Date('2018-09-25'));
  let [toTime, setToTime] = useState(new Date('2018-09-26'));
  // console.log(fromTime);
  const fromTimeTs = fromTime.getTime();
  const toTimeTs = toTime.getTime();
  const chartData = data.filter(d => {
    return d.get('ts') > fromTimeTs && d.get('ts') < toTimeTs;
  });

  return (
    <div>
      <DatePickerGroup>
        <DatePicker
          assignedYear="2018"
          assignedMonth="09"
          selectedDate={fromTime}
          onChange={e => setFromTime(e.fullDate)}
        />
        <DatePicker
          assignedYear="2018"
          assignedMonth="10"
          selectedDate={toTime}
          onChange={e => setToTime(e.fullDate)}
        />
      </DatePickerGroup>
      {chartData.count() > 0 ? (
        <StackChart
          keys={fromJS(['total_count', 'imcompleted'])}
          lineColorMapFn={fromJS(['#68b5f5', '#0df'])}
          data={chartData}
        />
      ) : (
        <div>No Data is available</div>
      )}
      <LegendWrap>
        <Legend color="#68b5f5" /> : total_count
        <Legend color="#0df" /> : imcompleted
      </LegendWrap>
    </div>
  );
};

export default Page1;
