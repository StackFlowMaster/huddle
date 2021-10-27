import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import PhoneInput from './PhoneInput';

const DefaultPhoneInput = () => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <PhoneInput
        value={value}
        onChangeText={setValue}
        label="Phone input"
        style={{ marginTop: 16 }}
      />
    </Container>
  );
};

storiesOf('Inputs', module).add('phone', () => (<DefaultPhoneInput />));
