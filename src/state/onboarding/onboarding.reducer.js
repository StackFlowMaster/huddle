import * as types from './onboarding.types';
import onboardingFlows from '/constants/onboardingFlows';

const defaultState = {
  flow: onboardingFlows.signup,
  pinCode: null,

  // A hash that is set if the call to `user::lookup` returns data. We
  // will use this as pre-populated user data
  suggestionData: null,

  // Keep track if a user registers
  registrationCompleted: false,

  onboardingDismissed: false,

  // loginIdentity will hold either the mobile number or email the user enters
  // during onboarding. We are storing it in this format, instead of having
  // separate entries from `mobile` and `email`, since a user can only ever use
  // one at a time, and if they enter both an email and mobile number the api
  // will throw an error
  loginIdentity: {
    type: null,
    value: null,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.pinCode,
      };

    case types.SET_LOGIN_IDENTITY:
      return {
        ...state,
        loginIdentity: {
          type: action.payload.type,
          value: action.payload.value,
        },
      };

    case types.CHANGE_FLOW:
      return {
        ...state,
        flow: action.flow,
      };

    case types.LOOKUP_RESULTS:
      return {
        ...state,
        suggestionData: action.payload,
      };

    case types.REGISTER:
      return {
        ...state,
        registrationCompleted: true,
      };

    case types.ONBOARDING_DISMISSED:
      return {
        ...state,
        onboardingDismissed: true,
      };

    default:
      return state;
  }
};
