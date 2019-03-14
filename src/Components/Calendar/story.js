import React from 'react';
import { storiesOf, action } from '@storybook/react';

import Calendar from './Calendar';

const today = new Date();

storiesOf('Calendar')
  .addWithInfo(
    'Default',
    '',
    () => (
      <Calendar />
    ),
    { source: true, inline: true },
  )
  .addWithInfo(
    'selectedDate & availableDate',
    '',
    () => (
      <Calendar
        selectedDate={new Date(new Date(today).setDate(2))}
        availableDate={{
          from: new Date(new Date(today).setDate(-3)),
          to: new Date(new Date(today).setDate(6)),
        }}
        onChange={action('onChange')}
      />
    ),
    { source: true, inline: true },
  )
  .addWithInfo(
    'onHover & onChange',
    '',
    () => (
      <Calendar
        onHover={action('onHover')}
        onChange={action('onChange')}
      />
    ),
    { source: true, inline: true },
  )
  .addWithInfo(
    'assignedYear & assignedMonth',
    '',
    () => (
      <Calendar
        assignedYear="2017"
        assignedMonth="3"
      />
    ),
    { source: true, inline: true },
  )
  .addWithInfo(
    'Duration',
    '',
    () => (
      <Calendar
        durationDate={{
          from: new Date(new Date(today).setDate(-5)),
          to: new Date(new Date(today).setDate(5)),
        }}
      />
    ),
    { source: true, inline: true },
  );
