import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Document from './Document';

const DefaultDocument = ({ document, key }) => (
  <Container>
    <Document
      document={document}
      key={key}
    />
  </Container>
);

storiesOf('Document', module).add('Default', () => (
  <Container>
    <DefaultDocument
      document={{
        mimeType: 'image/png',
        width: 200,
        height: 200,
        uri: 'https://atlantaseo.marketing/wp-content/uploads/avatar-2.png',
      }}
      key="1583334333593"
    />
  </Container>
));
