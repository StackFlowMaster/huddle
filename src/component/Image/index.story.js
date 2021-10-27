import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Image from './Image';

storiesOf('Image', module).add('Images', () => (
  <Container>
    <Image name="search" color="red" size={25} />
  </Container>
));
