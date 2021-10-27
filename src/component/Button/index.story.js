import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import { Alert } from 'react-native';
import Button from './index';

storiesOf('Buttons', module).add('primary button', () => (
  <Container>
    <Button onPress={() => Alert.alert('I was pressed')} text="Primary button" />
  </Container>
)).add('secondary button', () => (
  <Container>
    <Button onPress={() => Alert.alert('I was pressed')} type="secondary" text="Secondary button" />
  </Container>
)).add('ghost button', () => (
  <Container>
    <Button onPress={() => Alert.alert('I was pressed')} type="ghost" text="Ghost button" />
  </Container>
))
  .add('danger button', () => (
    <Container>
      <Button onPress={() => Alert.alert('I was pressed')} type="danger" text="Danger button" />
    </Container>
  ))
  .add('small button', () => (
    <Container>
      <Button onPress={() => Alert.alert('I was pressed')} size="small" text="Small button" />
    </Container>
  ))
  .add('large button', () => (
    <Container>
      <Button onPress={() => Alert.alert('I was pressed')} size="large" text="Large button" />
    </Container>
  ));
