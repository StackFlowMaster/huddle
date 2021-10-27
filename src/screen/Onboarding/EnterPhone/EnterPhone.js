import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UniquenessError from '/api/errors/UniquenessError';
import SingleValueForm from '/partial/SingleValueForm';
import Alert from '/overlay/Alert';
import screens from '/screen';
import { store } from '/state/store';
import { format, validations } from '/util';
import { actions, selectors } from '/state/onboarding';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as mobileNumberEvents from '/constants/events/Onboarding/mobileNumber';
import onboardingHelper from '/util/onboardingHelper';
import onboardingFlows from '/constants/onboardingFlows';

const EnterPhone = ({ navigation }) => {
  const flow = useSelector(selectors.flowSelector);
  const dispatch = useDispatch();

  const isSignup = flow === onboardingFlows.signup;
  const subtitle = isSignup
    ? "If you haven't created an account yet, we'll help you get that set up."
    : '';

  const handleFormSubmit = async ({ value }, formActions) => {
    dispatch(mixpanelActions.trackEvent(mobileNumberEvents.CLICK_CONTINUE));
    const formatted = format.phone(value);

    // If we are in the signup flow call the lookup api to check if the user user
    // already exists. If they do we will change our flow to `login`
    if (isSignup) {
      try {
        // If the lookup call returns a value we have a preRegistered user from link
        // so switch the user to the `linkSignup` flow
        const results = await dispatch(actions.lookup({ mobile: formatted }));
        if (results) {
          onboardingHelper.changeFlow(navigation, onboardingFlows.linkSignup);
        }
      } catch (e) {
        if (e instanceof UniquenessError) {
          onboardingHelper.changeFlow(navigation, onboardingFlows.login);
        } else {
          Alert.showGenericError();
          formActions.setSubmitting(false);
          return;
        }
      }
    }

    dispatch(actions.setLoginIdentity('mobile', formatted));
    navigation.push(screens.OnboardingVerify);
  };

  // If the user presses the CTA to use their email instead, this flag will be passed into
  // the email form which will tell the email form to pop instead of push if the user hits
  // the "use phone instead" CTA
  const gotoEmailScreen = () => {
    dispatch(mixpanelActions.trackEvent(mobileNumberEvents.CLICK_USE_EMAIL));
    navigation.push(screens.OnboardingEnterEmail);
  };

  return (
    <SingleValueForm
      onSubmit={handleFormSubmit}
      ctaPress={gotoEmailScreen}
      ctaIcon="mail"
      ctaText="Use your email address instead"
      validation={validations.phone}
      title="What is your mobile number?"
      subtitle={subtitle}
      keyboardType="numeric"
      label="Your mobile number"
      blurOnSubmit={false}
      maskProps={{
        type: 'custom',
        options: {
          mask: '(999)-999-9999',
        },
      }}
      ctaTestID="use-email-address"
    />
  );
};

EnterPhone.navigationOptions = () => {
  const { flow } = store.getState().onboarding;

  // If the user sees the EnterPhone screen while in the resetPin flow that means
  // that they have not entered their email/phone number already, and need to get
  // a validationCode. They should be able to go back to the PinLogin form.
  if (flow !== onboardingFlows.resetPin) {
    return {
      headerLeft: null,
    };
  }

  return null;
};

export default EnterPhone;
