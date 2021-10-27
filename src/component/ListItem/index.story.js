import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import ListItem from './ListItem';
import Text from '/component/Text';

const DefaultListItem = () => (
  <Container>
    <ListItem
      label="Label 1"
      icon="plus"
      bold
      description="First List Item Description"
      hasNotification
      hideUnderline
    />
    <ListItem
      label="Label 2 with Loading"
      icon="minus"
      loading
      iconProps={{ color: 'red' }}
      hideUnderline
    />
    <ListItem
      label="My Folder"
      icon="folder"
      onPress={() => {}}
    />
    <ListItem
      label="My File"
      icon="file"
      onPress={() => {}}
    />
    <ListItem
      label="Doctor"
      icon="doctor"
      selected
      labelEllipsizeMode="tail"
      onPress={() => {}}
    />
    <ListItem
      label="With Children"
      icon="more"
      hideUnderline
      squarePreview
      onPress={() => {}}
    >
      <Text>Child Text</Text>
    </ListItem>
  </Container>
);

storiesOf('ListItem', module).add('General', () => (<DefaultListItem />));
