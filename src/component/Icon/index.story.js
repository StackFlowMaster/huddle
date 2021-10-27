import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Icon from './Icon';

storiesOf('Icon', module).add('Icons', () => (
  <Container>
    <Icon name="search" color="red" size={25} />
    <Icon name="cross" color="black" size={20} />
    <Icon name="plus" color="green" size={20} />
    <Icon name="settings" color="green" size={20} />
    <Icon name="eye" color="green" size={20} />
    <Icon name="location" color="green" size={20} />
    <Icon name="checkmark" color="green" size={20} />
    <Icon name="clipboard" color="green" size={20} />
    <Icon name="calendar" color="green" size={20} />
    <Icon name="download" color="green" size={20} />
  </Container>
));
