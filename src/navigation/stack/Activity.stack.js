import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';

import Activity from '/screen/Activity';

import allScreens from '/screen';

export default createStackNavigator({
  [allScreens.Activity]: Activity,
}, {
  initialRouteName: allScreens.Activity,
  defaultNavigationOptions: BasicHeader,
  headerMode: 'screen',
});
