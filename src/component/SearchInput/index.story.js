import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import SearchInput from './SearchInput';

const DefaultSearchInput = () => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <SearchInput
        value={value}
        onChangeText={setValue}
        label="Search input"
        style={{ marginTop: 16 }}
      />
    </Container>
  );
};

storiesOf('SearchInput', module).add('default', () => (<DefaultSearchInput />));
