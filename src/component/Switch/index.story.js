import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Switch from './Switch';

const DefaultSwitch = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Container>
      <Switch
        label="My Switch"
        value={checked}
        onChange={setChecked}
      />
    </Container>
  );
};

storiesOf('Switch', module).add('General', () => (
  <Container>
    <DefaultSwitch />
  </Container>
));
