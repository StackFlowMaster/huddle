import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  itemHeader: {
    padding: globalStyles.padding.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    marginRight: 5,
  },
});
