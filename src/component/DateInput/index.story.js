import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import DateInput from './DateInput';

const DefaultDateInput = () => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <DateInput
        value={value}
        onChangeText={setValue}
        label="Date input"
        style={{ marginTop: 16 }}
      />
    </Container>
  );
};

storiesOf('Inputs', module).add('date', () => (<DefaultDateInput />));
