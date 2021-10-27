import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Text from './Text';

const DefaultText = () => (
  <Container>
    <Text fontSize={14} lineHeight={24} color="black">
      This is a text.
    </Text>
    <Text.H5 color="purple">H5 SUBTITLE</Text.H5>
    <Text.H3 color="purple">H3 SUBTITLE</Text.H3>
    <Text.Row
      weight="medium"
      numberOfLines={1}
    >
      This is the Text-Row component.
    </Text.Row>

    <Text.BodySmall
      weight="medium"
      color="medium"
    >
      Text.BodySmall
    </Text.BodySmall>
  </Container>
);

storiesOf('Text', module).add('General', () => (
  <Container>
    <DefaultText />
  </Container>
));
