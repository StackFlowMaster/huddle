import { createSelector } from 'reselect';

import { biometricAuthEnabledSelector } from '/state/biometricAuthSettings/biometricAuthSettings.selectors';
import { accessTokenSelector } from '/state/auth/auth.selectors';

const registrationCompletedSelector = (state) => state.onboarding.registrationCompleted;
export const onboardingDismissedSelector = (state) => state.onboarding.onboardingDismissed;

export const flowSelector = (state) => state.onboarding.flow;
export const suggestionDataSelector = (state) => state.onboarding.suggestionData || {};

export const loginIdentitySelector = (state) => state.onboarding.loginIdentity;

export const onboardingSelector = createSelector(
  biometricAuthEnabledSelector,
  accessTokenSelector,
  (useBioAuth, accessToken) => ({
    accessToken, useBioAuth,
  }),
);

// We want to show the user the welcome tutorial after the **signup** and only
// the first time they see the huddle home screen
export const showWelcomeTutorialSelector = createSelector(
  registrationCompletedSelector,
  onboardingDismissedSelector,
  (registrationCompleted, dismissed) => registrationCompleted && dismissed,
);

export const loginIdentityObjectSelector = createSelector(
  loginIdentitySelector,
  (identity) => {
    if (!identity) {
      return {};
    }

    return {
      [identity.type]: identity.value,
    };
  },
);
