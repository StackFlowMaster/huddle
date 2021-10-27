import React from 'react';

import { View } from 'react-native';

import Text from '/component/Text';

import styles from './ActivityListItem.styles';

import parseActivity from './parseActivity';
import { format } from '/util';

const ActivityListItem = ({ activity }) => {
  const time = format.toRelativeDate(activity.createTimestamp);

  const parsed = parseActivity(activity);

  // Parsed will be null if we don't know how to handle an activity.
  // You should avoid relying on this, and instead filter out unknown
  // activity in `activity.actions.js`
  if (!parsed) return null;

  return (
    <View style={styles.wrapper}>
      {parsed.icon}

      <Text style={styles.text} numberOfLines={2}>
        <Text>{parsed.text}</Text>
        <Text color="medium">
          {' · '}
          {time}
        </Text>
      </Text>
    </View>
  );
};

export default ActivityListItem;
