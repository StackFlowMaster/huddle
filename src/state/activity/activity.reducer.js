import get from 'lodash/get';

import * as types from './activity.types';

const defaultProfileState = {
  activity: [],
};

// defaultState will be keyed by profileCode and contain defaultProfileState per profile
const defaultState = {};

const reduceProfileState = (state = defaultProfileState, action) => {
  switch (action.type) {
    case types.FETCH_ACTIVITY:
      return {
        ...state,
        activity: action.payload.activity,
      };

    case types.ADD_ACTIVITY:
      return {
        ...state,
        activity: [
          action.payload.activity,
          ...state.activity,
        ],
      };

    default:
      return state;
  }
};

// Our entire activity state tree is scoped by profileCode. All actions will accept an
// activeProfileCode in the meta object, which we can use to access a specific sub-tree
export default (state = defaultState, action) => {
  const profileCode = get(action, 'meta.activeProfileCode');
  if (!profileCode) return state;

  const profileState = reduceProfileState(state[profileCode], action);

  return {
    ...state,
    [profileCode]: profileState,
  };
};
