import React from 'react';
import { ScrollView } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import DashboardCard from './DashboardCard';

const DefaultDashboardCard = ({
  title, subtitle, color, showMarginLeft, hideClose, closeWithoutAnimation, onClose,
}) => (
  <Container>
    <DashboardCard
      title={title}
      subtitle={subtitle}
      showMarginLeft={showMarginLeft}
      color={color}
      hideClose={hideClose}
      closeWithoutAnimation={closeWithoutAnimation}
      onClose={onClose}
    />
  </Container>
);

storiesOf('DashboardCard', module).add('Default', () => (
  <ScrollView>
    <DefaultDashboardCard
      title="News"
      subtitle="Corona Virus Danger!"
      showMarginLeft
      color="red"
    />
    <DefaultDashboardCard
      title="Sports"
      subtitle="Real Madrid Wins!"
      showMarginLeft
      color="blue"
      hideClose
    />
    <DefaultDashboardCard
      title="Culture"
      subtitle="The concert starts at 10am!"
      showMarginLeft
      color="purple"
    />
  </ScrollView>
));
