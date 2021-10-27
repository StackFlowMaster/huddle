import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    paddingVertical: globalStyles.padding.sm,
    paddingHorizontal: globalStyles.padding.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  iconHideBackground: {
    backgroundColor: 'transparent',
  },
});
