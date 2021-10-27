import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Text from '/component/Text';
import Icon from '/component/Icon';
import ActivityListItem from '/partial/ActivityListItem';

import styles from './ActivityPreview.styles';
import globalStyles from '/styles';

import screens from '/screen';

const ActivityPreview = ({ activity, navigation }) => {
  const handleViewAllPress = () => {
    navigation.navigate(screens.Activity);
  };

  if (activity.length == 0) {
    return null
  }
  
  return (
    <View>
      <View style={styles.itemHeader}>
        <Text.H3>Activity</Text.H3>
        <TouchableOpacity
          style={styles.viewAll}
          onPress={handleViewAllPress}
        >
          <Text color="medium" style={styles.viewAllText}>View all</Text>
          <Icon name="chevron-right" color={globalStyles.palette.grey01} size={16} />
        </TouchableOpacity>
      </View>

      {activity.map((item) => (
        <ActivityListItem
          key={item.createTimestamp}
          activity={item}
        />
      ))}
    </View>
  );
};

export default ActivityPreview;
