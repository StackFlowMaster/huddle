import values from 'lodash/values';
import screens from '/screen';
import { store } from '/state/store';
import { actions as onboardingActions } from '/state/onboarding';
import onboardingFlows from '/constants/onboardingFlows';

/**
 * This function will switch from the OnboardingStack to the HomeStack.
 * We currently also want to dispatch a redux action which is why you should
 * **always** use this function to switch to the HomeStack instead of
 * navigating in place
 *
 * @param {object} navigation
 */
const dismiss = (navigation) => {
  store.dispatch(onboardingActions.setDismissed());
  navigation.navigate(screens.HomeStack);
};

/**
 * Switch the onboarding flow to the new flow. When the screen that registered this
 * is focused again, we will switch back to what the flow was before we changed.
 *
 * @param {object} navigation
 * @param {string} newFlow
 * A flow defined in `src/constants/onboardingFlows
 */
const changeFlow = (navigation, newFlow) => {
  if (!values(onboardingFlows).includes(newFlow)) {
    /* eslint-disable-next-line no-console */
    console.error(`Invalid onboarding flow provided to changeFlow: "${newFlow}". You should only use predefined value from src/constants/onboardingFlows`);
  }

  const currentState = store.getState().onboarding.flow;
  store.dispatch(onboardingActions.changeFlow(newFlow));

  const listener = navigation.addListener('willFocus', () => {
    store.dispatch(onboardingActions.changeFlow(currentState));
    listener.remove();
  });
};

export default {
  dismiss,
  changeFlow,
};
