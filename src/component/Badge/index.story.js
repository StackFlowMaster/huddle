import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Container from 'storybook/Container';
import Badge from './Badge';
import Avatar from '../Avatar/Avatar';

storiesOf('Badge', module).add('badge-count', () => (
  <Container>
    <View
      style={{ height: 100, width: 100 }}
    >
      <Avatar
        profile={{ firstName: '재석', lastName: '한' }}
        size="large"
      />
      <Badge.Count
        count={100}
        style={{ position: 'absolute', left: 45, top: 0 }}
      />
    </View>
    <View
      style={{ height: 100, width: 100 }}
    >
      <Avatar
        profile={{ firstName: 'Michael', lastName: 'Jackson' }}
        size="large"
      />
      <Badge.Count
        count={88}
        style={{ position: 'absolute', left: 45, top: 0 }}
      />
    </View>
    <View
      style={{ height: 100, width: 100 }}
    >
      <Avatar
        profile={{ firstName: 'Григорий', lastName: 'Яков' }}
        size="large"
      />
      <Badge.Count
        count={8}
        style={{ position: 'absolute', left: 45, top: 0 }}
      />
    </View>
  </Container>
))
  .add('badge-add', () => (
    <View
      style={{ height: 100, width: 100 }}
    >
      <Avatar
        profile={{ firstName: 'Lucky', lastName: 'Man' }}
        size="large"
      />
      <Badge.Add
        style={{
          position: 'absolute', left: 45, top: 0, backgroundColor: 'red',
        }}
      />
    </View>
  ))
  .add('badge-remove', () => (
    <View
      style={{ height: 100, width: 100 }}
    >
      <Avatar
        profile={{ firstName: 'John', lastName: 'Mike' }}
        size="large"
      />
      <Badge.Remove
        style={{
          position: 'absolute', left: 45, top: 0, backgroundColor: 'red',
        }}
      />
    </View>
  ))
  .add('badge-notification', () => (
    <View
      style={{ height: 100, width: 100 }}
    >
      <Avatar
        profile={{ firstName: 'Warse', lastName: 'Geog' }}
        size="large"
      />
      <Badge.Notification
        style={{
          position: 'absolute', left: 45, top: 0, backgroundColor: 'red',
        }}
      />
    </View>
  ))
  .add('badge-custom-size-color', () => (
    <View
      style={{ height: 100, width: 100 }}
    >
      <Avatar
        profile={{ firstName: 'Custom', lastName: 'Size' }}
        size="large"
      />
      <Badge
        count={10}
        size={28}
        style={{ position: 'absolute', left: 45, top: 0 }}
        color="purple"
      />
    </View>
  ));
