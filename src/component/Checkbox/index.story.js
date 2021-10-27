import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Checkbox from './Checkbox';

const DefaultCheckBox = ({ label, checked, disabled }) => (
  <Container>
    <Checkbox
      label={label}
      checked={checked}
      disabled={disabled}
    />
  </Container>
);

storiesOf('CheckBox', module).add('checkbox', () => (
  <DefaultCheckBox
    label="This is a sample checkbox"
  />
))
  .add('checkbox-disabled', () => (
    <DefaultCheckBox
      checked
      disabled
      label="This is the disabled checkbox"
    />
  ));
