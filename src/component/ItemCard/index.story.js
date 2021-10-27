import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import ItemCard from './ItemCard';

const DefaultItemCard = ({
  style, thumbnailUrl, description, name, onPress,
}) => (
  <Container>
    <ItemCard
      style={style}
      thumbnailUrl={thumbnailUrl}
      icon="File"
      description={description}
      name={name}
      onPress={onPress}
    />
  </Container>
);

const FolderCard = ({
  style, thumbnailUrl, file, firstFile, description, folder, onPress,
}) => (
  <ItemCard
    style={style}
    thumbnailUrl={thumbnailUrl}
    file={file}
    item={firstFile}
    icon="Folder"
    description={description}
    name={folder.displayName}
    onPress={onPress}
  />
);

storiesOf('ItemCard', module).add('File', () => (
  <Container>
    <DefaultItemCard
      thumbnailUrl="https://atlantaseo.marketing/wp-content/uploads/avatar-2.png"
      style={{ backgroundColor: 'purple' }}
      description="Description"
      name="My Favorite Book"
      onPress={() => {}}
    />
  </Container>
))
  .add('Folder', () => (
    <Container>
      <FolderCard
        thumbnailUrl="https://atlantaseo.marketing/wp-content/uploads/avatar-3.png"
        style={{ backgroundColor: 'purple' }}
        description="Description"
        folder={{ displayName: 'My Books' }}
        onPress={() => {}}
      />

    </Container>
  ));
