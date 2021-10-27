import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import PinInput from './PinInput';

const DefaultPinInput = () => (
  <Container>
    <PinInput blurOnSubmit={() => {}} handleSubmit={() => {}} />
  </Container>
);

storiesOf('PinInput', module).add('default', () => (<DefaultPinInput />));
