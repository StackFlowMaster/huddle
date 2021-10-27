import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import HeaderButton from '/navigation/header/HeaderButton';
import { selectors } from '/state/activity';
import ActivityListItem from '/partial/ActivityListItem';

import styles from './Activity.styles';

const Activity = () => {
  const activity = useSelector(selectors.activitySelector);

  const renderItem = ({ item }) => <ActivityListItem activity={item} />;

  const keyExtractor = (item) => item.createTimestamp;

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={activity}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

Activity.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <HeaderButton icon="back" onPress={navigation.dismiss} />,
  title: 'Activity',
});
export default Activity;
