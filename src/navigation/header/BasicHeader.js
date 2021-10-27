/**
 * This header is probably going to be used for most headers. It sets some defaults,
 * which are named the same as the react-navigation#navigationOptions. **ANY** of these
 * can be overridden just by passing them into your navigationOptions in your route.
 */
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import get from 'lodash/get';

import HeaderButton, { BUTTON_HEIGHT } from './HeaderButton';

import { CONFIRM_BACK } from '/constants/config';
import { confirmFormNavigation } from '/util/confirmBack';

import globalStyles from '/styles';

/**
 *
 * Create a custom styled header with defaults that match our designs.
 * The `navigationOptions` that are passed in will be merged with the
 * defaults - so you can override any style
 *
 * You do not need to provide any `navigationOption`s - you can simply go:
 * `navigationOptions: BasicHeader` in your components.
 *
 * @param {object} navigationOptions
 * For information see https://reactnavigation.org/docs/en/headers.html
 */
const BasicHeader = (navigationOptions = {}) => ({
  ...navigationOptions,
  headerTintColor: globalStyles.palette.deepBlue,
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    ...navigationOptions.headerStyle,
    // on Android we are setting the StatusBar to be translucent. This makes
    // it behave the same as the iOS StatusBar (think `position: fixed` in
    // web terms). This means that we need to pad the top of the header on
    // Android only. On iOS it is already handled for us by react-navigation
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight + globalStyles.padding.xxs,
        height: BUTTON_HEIGHT + StatusBar.currentHeight + globalStyles.padding.xxs,
      },
    }),
  },
  /**
   * This function will render the header left button. It will render either an
   * X or a back button, and will either dismiss, or pop from the stack.
   *
   * If the screen is the first screen in the stack (a modal), we will show an X and dismiss.
   * Otherwise we will show a chevron and pop the user back to their previous screen
   *
   * It will also check to see if the screen has requested to `CONFIRM_BACK`,
   * and if it has, the user will be prompted to confirm if they want to go back
   */
  headerLeft: ({ onPress, scene, tintColor }) => {
    // onPress is the default action provided by react navigation - typically goBack()
    let backAction = onPress;

    // Is there a `dismiss` action in the navigation?
    const dismiss = get(scene, 'descriptor.options.navigation.dismiss');
    // Does the screen that is rendering this button want the user to confirm if
    // they want to go back?
    const confirmBack = get(scene, `route.params.${CONFIRM_BACK}`);

    // Allow the user to override the back icon
    const overrideIcon = get(scene, 'route.params.icon');

    // Default back chevron
    let icon = overrideIcon || 'back';

    // The initial route in a stack should render an X that calls dismiss()
    if (scene.index === 0 && dismiss) {
      backAction = () => dismiss();
      if (!overrideIcon) {
        icon = 'cross';
      }
    }

    // Does the screen want the user to confirm going back?
    const handlePress = confirmBack
      ? () => confirmFormNavigation(backAction)
      : backAction;

    return (
      <HeaderButton
        icon={icon}
        onPress={handlePress}
        color={tintColor}
      />
    );
  },
  headerLeftContainerStyle: {
    ...navigationOptions.headerLeftContainerStyle,
    paddingLeft: globalStyles.padding.md,
  },
  headerRightContainerStyle: {
    paddingRight: globalStyles.padding.md,
    ...navigationOptions.headerRightContainerStyle,
  },

  // Never show the title on the back button
  headerBackTitle: null,

  // No headers in the design have right buttons as well as a title, so hide
  // the title if we have right buttons
  headerTitleContainerStyle: { display: navigationOptions.headerRight ? 'none' : 'flex' },
});

export default BasicHeader;
