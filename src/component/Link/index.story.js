import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Link from './Link';

const DefaultLink = ({
  onPress,
  icon,
  iconColor,
  text,
  style,
  textStyle,
  testID,
}) => (
  <Container>
    <Link
      onPress={onPress}
      icon={icon}
      iconColor={iconColor}
      text={text}
      style={style}
      textStyle={textStyle}
      testID={testID}
    />
  </Container>
);

storiesOf('Links', module).add('Link', () => (
  <Container>
    <DefaultLink
      icon="plus"
      text="Click this link here"
      textStyle={{ color: 'red' }}
    />
  </Container>
));
