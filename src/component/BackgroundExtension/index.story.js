import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import BackgroundExtension from './BackgroundExtension';

const DefaultBackgroundExtension = ({ style }) => (
  <Container>
    <BackgroundExtension
      style={style}
    />
  </Container>
);

storiesOf('BackgroundExtension', module).add('Default', () => (
  <DefaultBackgroundExtension
    style={{ backgroundColor: 'purple' }}
  />
));
