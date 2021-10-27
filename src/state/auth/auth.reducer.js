import * as types from './auth.types';

const defaultState = {
  profileCode: null,
  accessToken: null,
  userIdentifier: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };

    case types.SET_CURRENT_PROFILE:
      return {
        ...state,
        profileCode: action.profileCode,
      };

    case types.LOGOUT:
      return defaultState;

    case types.SET_USER_IDENTIFIER:
      return {
        ...state,
        userIdentifier: action.payload.userIdentifier,
      };

    default:
      return state;
  }
};
