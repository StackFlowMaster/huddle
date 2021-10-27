import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import TextInput from './TextInput';

const DefaultTextInput = () => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <TextInput
        value={value}
        onChangeText={setValue}
        label="Default input"
        style={{ marginTop: 16 }}
      />
    </Container>
  );
};

const LargeTextInput = () => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={{ marginTop: 16 }}
        label="Large Input"
        size="large"
      />
    </Container>
  );
};

storiesOf('Inputs', module).add('default', () => (<DefaultTextInput />)).add('large', () => (<LargeTextInput />));
