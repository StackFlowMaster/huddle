import React, { useState } from 'react';
import { Animated, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import BottomSheet from './BottomSheet';
import BottomSheetRow from './BottomSheetRow';

const DefaultBottomSheet = ({ style }) => {
  const [animation] = useState(new Animated.Value(0));

  Animated.timing(animation, {
    toValue: 1,
    duration: 100,
  }).start();

  return (
    <Container>
      <View style={{ backgroundColor: 'grey', marginBottom: 600 }}>
        <BottomSheet animation={animation} style={style}>
          <BottomSheetRow
            isFirst
            onPress={() => {}}
            label="Bottom Sheet"
          />
          <BottomSheetRow
            icon="FileMedical"
            label="Upload photos"
          />
          <BottomSheetRow
            icon="NoteCreate"
            label="Create note"
          />
          <BottomSheetRow
            icon="Other"
            label="Add other"
          />
        </BottomSheet>
      </View>
    </Container>
  );
};

storiesOf('BottomSheet', module).add('Default', () => (
  <DefaultBottomSheet />
));
