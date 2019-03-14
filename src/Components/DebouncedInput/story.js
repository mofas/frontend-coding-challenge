import React from 'react';
import { storiesOf, action } from '@storybook/react';

import DebouncedInput from './DebouncedInput';

storiesOf('DebouncedInput')
  .addWithInfo(
    'Normal',
    '',
    () => (
      <div style={{ width: '300px' }}>
        debounce 80ms

        <DebouncedInput
          debounceMs={80}
          onChange={action('onChange_80')}
          placeholder="placeholder"
        />

        &nbsp;<br />
        debounce 250ms

        <DebouncedInput
          debounceMs={250}
          onChange={action('onChange_250')}
          placeholder="placeholder"
        />
      </div>
    ),
    { source: true, inline: true },
  )
  .addWithInfo(
    'Disabled',
    '',
    () => (
      <div style={{ width: '300px' }}>
        <DebouncedInput
          disabled
          onChange={action('onChange')}
          placeholder="placeholder"
        />


        &nbsp;<br />
        <DebouncedInput
          disabled
          onChange={action('onChange')}
          placeholder="placeholder"
          value="value"
        />
      </div>
    ),
    { source: true, inline: true },
  );
