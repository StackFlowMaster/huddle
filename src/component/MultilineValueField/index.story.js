import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import MultilineValueField from './MultilineValueField';

const DefaultMultilineValueField = () => (
  <Container>
    <MultilineValueField
      label="Multiline Label"
      value="This is the multiline text"
      onPress={() => {}}
      style={{ marginBottom: 32 }}
      animateBlur
      key="multi_1"
    />
  </Container>
);

storiesOf('Field', module).add('MultilineValueField', () => (
  <Container>
    <DefaultMultilineValueField />
  </Container>
));
