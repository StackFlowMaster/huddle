import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Avatar from './Avatar';

const DefaultAvatar = ({ profile, size, preview }) => (
  <Container>
    <Avatar
      profile={profile}
      size={size}
      preview={preview}
    />
  </Container>
);

storiesOf('Avatar', module).add('large avatar', () => (
  <DefaultAvatar
    profile={{
      firstName: 'Devis',
      lastName: 'Chan',
    }}
    size="large"
  />
)).add('medium with avatar image', () => (
  <DefaultAvatar
    profile={{
      firstName: 'Michael',
      lastName: 'Milburn',
      avatar: 'https://www.w3schools.com/w3images/avatar2.png',
    }}
    size="medium"
  />
)).add('regular avatar with Russian Name', () => (
  <DefaultAvatar
    profile={{
      firstName: 'Яков',
      lastName: 'Барсуков',
    }}
    size="regular"
  />
))
  .add('regular avatar with Korean Name', () => (
    <DefaultAvatar
      profile={{
        firstName: '재수',
        lastName: '김',
      }}
      size="regular"
    />
  ))
  .add('regular avatar with preview', () => (
    <DefaultAvatar
      profile={{
        firstName: '재수',
        lastName: '김',
      }}
      size="regular"
      preview="https://media.proprofs.com/images/QM/user_images/2256463/2817980284.jpg"
    />
  ));
