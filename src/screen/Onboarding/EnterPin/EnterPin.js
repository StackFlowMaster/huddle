import * as React from 'react';
import { useDispatch } from 'react-redux';

import screens from '/screen';
import PinForm from '/partial/PinForm';
import * as events from '/constants/events/Onboarding/createPin';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { store } from '/state/store';
import onboardingFlows from '/constants/onboardingFlows';

const EnterPin = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    dispatch(trackEvent(events.ENTERED));

    navigation.push(screens.OnboardingConfirmPin, {
      newPin: value,
    });
  };

  return (
    <PinForm
      title="Secure your account with a 6 digit pin"
      subtitle="Make sure you remember your pin, you'll need this to login to your account"
      onSubmit={handleSubmit}
      testID="enter-pin-form"
    />
  );
};

EnterPin.navigationOptions = () => {
  const { flow } = store.getState().onboarding;

  // Let the user go back to the PinLogin form
  if (flow !== onboardingFlows.resetPin) {
    return {
      headerLeft: null,
    };
  }

  return null;
};

export default EnterPin;
