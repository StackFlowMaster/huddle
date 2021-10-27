/* eslint-disable import/prefer-default-export */
import values from 'lodash/values';

import * as types from './activity.types';
import api from '/api';
import { itemsHelper } from '/util';
import activityType, { ignoreCurrentUser } from '/constants/activityTypes';
import { selectors as profilesSelectors } from '/state/profiles';

export const fetchActivity = (profileCode) => async (dispatch, getState) => {
  const masterProfile = profilesSelectors.masterProfileSelector(getState());
  const masterProfileName = `${masterProfile.firstName} ${masterProfile.lastName}`;

  const response = await api.user.fetchActivity(profileCode);
  const allActivity = response.profileActivityList;

  // It is up to the front end to decide which activity to show to a user.
  const isActivityValid = ({ eventType, custom }) => {
    const { accountName } = custom;

    const fromCurrentUser = masterProfileName === accountName;

    // User doesn't want to see certain activity if it was generated
    // by the current user. For example a user should not see that they
    // created an item, but other users **should** see it.
    if (ignoreCurrentUser[eventType] && fromCurrentUser) {
      return false;
    }

    // Do we know how to render the eventType for this activity?
    // If the API adds a new activity type we should add custom parsing logic
    // in the `ActivityListItem/parseActivity.js` handler.
    if (!values(activityType).includes(eventType)) return false;

    return true;
  };

  const activity = allActivity
    .map((activityItem) => {
      let custom = {};
      try {
        custom = JSON.parse(activityItem.custom);
        // eslint-disable-next-line no-empty
      } catch (e) {}

      return ({
        ...activityItem,
        custom,
      });
    })
    .filter(isActivityValid)
    .sort(itemsHelper.orderCreated);

  dispatch({
    type: types.FETCH_ACTIVITY,
    payload: {
      activity,
    },
  });
};
