import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import ValueField from './ValueField';

const DefaultValueField = () => (
  <Container>
    <ValueField
      label="Value Field Label"
      value="This is the value of ValueField component"
      onPress={() => {}}
      style={{}}
    />
  </Container>
);

storiesOf('Field', module).add('ValueField', () => (
  <Container>
    <DefaultValueField />
  </Container>
));
