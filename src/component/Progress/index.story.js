import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Progress from './Progress';

const DefaultProgress = ({ value = 1 }) => (
  <Container>
    <Progress
      progress={value}
    />
  </Container>
);

storiesOf('Progress', module).add('General', () => (
  <Container>
    <DefaultProgress />
    <DefaultProgress value={0.75} />
    <DefaultProgress value={0.5} />
    <DefaultProgress value={0.25} />
    <DefaultProgress value={0} />
  </Container>
));
