import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Alert from './Alert';

const DefaultAlert = ({ title, description, type }) => (
  <Container>
    <Alert
      title={title}
      description={description}
      type={type}
    />
  </Container>
);

storiesOf('Alert', module).add('general alert', () => (
  <DefaultAlert
    title="Title"
    description="Description"
    type="general"
  />
)).add('warning alert', () => (
  <DefaultAlert
    title="Title"
    description="Description"
    type="warning"
  />
)).add('success alert', () => (
  <DefaultAlert
    title="Title"
    description="Description"
    type="success"
  />
));
