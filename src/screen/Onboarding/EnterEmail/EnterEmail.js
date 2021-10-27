import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UniquenessError from '/api/errors/UniquenessError';
import SingleValueForm from '/partial/SingleValueForm';
import Alert from '/overlay/Alert';
import screens from '/screen';
import { validations } from '/util';
import { actions, selectors } from '/state/onboarding';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as emailEvents from '/constants/events/Onboarding/email';
import onboardingHelper from '/util/onboardingHelper';
import onboardingFlows from '/constants/onboardingFlows';

const EnterEmail = ({ navigation }) => {
  const flow = useSelector(selectors.flowSelector);
  const dispatch = useDispatch();

  const isSignup = flow === onboardingFlows.signup;
  const subtitle = isSignup
    ? "If you haven't created an account yet, we'll help you get that set up."
    : '';

  const handleCtaPress = () => {
    dispatch(mixpanelActions.trackEvent(emailEvents.CLICK_USE_MOBILE_NUMBER));
    navigation.pop();
  };

  // We always want to go to the verify email form if the form is submitted
  const handleFormSubmit = async ({ value }, formActions) => {
    dispatch(mixpanelActions.trackEvent(emailEvents.CLICK_CONTINUE));

    // If we are in the signup flow call the lookup api to check if the user user
    // already exists. If they do we will change our flow to `login`
    if (isSignup) {
      try {
        // If the lookup call returns a value we have a preRegistered user from link
        // so switch the user to the `linkSignup` flow
        const results = await dispatch(actions.lookup({ email: value }));
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

    dispatch(actions.setLoginIdentity('email', value));
    navigation.push(screens.OnboardingVerify);
  };

  return (
    <SingleValueForm
      onSubmit={handleFormSubmit}
      ctaPress={handleCtaPress}
      ctaIcon="phone"
      ctaText="Use your mobile number instead"
      validation={validations.email}
      title="What is your email?"
      subtitle={subtitle}
      keyboardType="email-address"
      label="Your email address"
      blurOnSubmit={false}
      ctaTestID="use-mobile-number"
    />
  );
};

EnterEmail.navigationOptions = {
  headerLeft: null,
};

export default EnterEmail;
