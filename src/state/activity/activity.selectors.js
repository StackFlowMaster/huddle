/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';
import { selectors as profilesSelectors } from '/state/profiles';

// Get the activity state scoped to the activeProfileCode
const getActivityState = (state) => {
  const activeProfile = profilesSelectors.activeProfileCodeSelector(state);
  return state.activity[activeProfile] || {};
};

const allActivitySelector = (state) => getActivityState(state).activity || [];

export const activitySelector = createSelector(
  allActivitySelector,
  (activity) => activity,
);
