/**
 * The flow that the user is in will change behaviour during the onboarding flow.
 *
 * If you are trying to track down a bug with onboarding a good place to start would
 * be to log the `state.onboarding.flow` value in redux. Are you in the flow you expect to be in?
 */

export default {
  // Signup is the default flow, the user will be in the signup flow unless they take
  // an action that would switch them to another
  signup: 'signup',

  // The user is put into the login flow after they enter their email or phone number,
  // if that phone/email already exists in the DB.
  login: 'login',

  // The resetPin flow is entered when the user hits the CTA on the PinLogin form
  resetPin: 'resetPin',

  // A user is put into the addExtraProfile flow if they go to add a profile from the
  // ChooseProfile screen. When they get to the form initially (after entering their
  // info on the EnterInfo screen) they remain in the signup flow.
  addExtraProfile: 'addExtraProfile',

  // A user is put into the linkSignup flow after they enter their email or phone if
  // the API returns a preRegistered user during the `lookup` call
  linkSignup: 'linkSignup',

  // A user is put into the careTeamInvite flow after they verify their email/phone if
  // the call to the `getCareInviter` returns a result - ie. the user is signing up
  // and has been invited to at least one profile
  careTeamInvite: 'careTeamInvite',
};
