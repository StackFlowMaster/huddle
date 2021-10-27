import React, { useState } from 'react';
import { Animated, TextInput } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Field from './Field';
import useFormFieldLabel from '/hook/useFormFieldLabel';

const DefaultField = ({
  label, style, handleOnPress, value, labelInEndPosition, errorMessage, onChangeText,
}) => {
  const [focused] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const {
    allowErrorMessage,
    handleTextChange,
  } = useFormFieldLabel({
    onChangeText,
    value,
  });

  return (
    <Field
      label={label}
      style={style}
      onWrapperPress={handleOnPress}
      animation={animation}
      labelInEndPosition={value || labelInEndPosition}
      error={allowErrorMessage(errorMessage)}
    >
      <TextInput
        keyboardType="number-pad"
        onChangeText={handleTextChange}
        errorMessage={allowErrorMessage(errorMessage)}
        placeholder="MM/DD/YYYY"
        value={value}
        maskProps={{
          type: 'datetime',
          options: {
            format: 'MM/DD/YYYY',
          },
        }}
      />
      <Field.Border
        animation={animation}
        active={focused}
        error={errorMessage && errorMessage.length}
      />
    </Field>
  );
};

storiesOf('Field', module).add('Default', () => (
  <Container>
    <DefaultField
      label="Text"
      value="Texts Error"
    />

  </Container>
));
