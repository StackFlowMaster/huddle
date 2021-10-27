import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Text from '/component/Text';
import PinForm from '/partial/PinForm';
import Alert from '/overlay/Alert';

import { selectors, actions as onboardingActions } from '/state/onboarding';
import { actions as mixpanelActions } from '/state/mixpanel';
import { selectors as profileSelectors } from '/state/profiles';

import api from '/api';
import * as events from '/constants/events/Onboarding/confirmPin';
import screens from '/screen';
import { format, secureStorage } from '/util';
import onboardingHelper from '/util/onboardingHelper';
import onboardingFlows from '/constants/onboardingFlows';

const ConfirmPin = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginIdentity = useSelector(selectors.loginIdentityObjectSelector);
  const flow = useSelector(selectors.flowSelector);
  const currentProfile = useSelector(profileSelectors.currentProfileCodeSelector);

  const newPin = navigation.getParam('newPin');

  const handleSubmit = async (value) => {
    dispatch(mixpanelActions.trackEvent(events.ENTERED));

    if (newPin === value) {
      dispatch(mixpanelActions.trackEvent(events.MATCHED));
      dispatch(onboardingActions.setPinCode(value));

      if (flow === onboardingFlows.resetPin) {
        // The only time in the login flow that the user will confirm their pin
        // is if they are resetting their pin

        // Store the new pin in secure storage. I'm not sure why it would fail
        // Doing it in a separate try/catch to isolate the error
        try {
          await secureStorage.setPin(format.encryptPinCode(value));
        } catch (e) {
          Alert.showGenericError();
          return;
        }

        try {
          await dispatch(onboardingActions.resetPin(loginIdentity));

          if (!currentProfile) {
            navigation.push(screens.OnboardingChooseProfile);
          } else {
            onboardingHelper.dismiss(navigation);
          }
        } catch (e) {
          if (e.status === api.errorCodes.RESET_PIN_TOO_MANY_ATTEMPTS) {
            Alert.error(api.userMessages.pin.tooManyTries);
          } else {
            Alert.error(api.userMessages.pin.invalidCredentials);
          }
        }
      } else if (flow === onboardingFlows.linkSignup) {
        // If the user is coming from Link we may have prepopulated data for them, so don't
        // need to take them to the EnterInfo screen
        navigation.push(screens.OnboardingPickSuggestionType);
      } else {
        navigation.push(screens.OnboardingEnterInfo);
      }
    } else {
      dispatch(mixpanelActions.trackEvent(events.FAILED_TO_MATCH));
      Alert.error(api.userMessages.pin.mismatch);
    }
  };

  return (
    <PinForm
      title={(
        <Text.Plain>
          Confirm your
          {'\n'}
          6 digit pin
        </Text.Plain>
      )}
      subtitle="Make sure you remember your pin, you'll need this to login to your account"
      onSubmit={handleSubmit}
      blurOnSubmit
      testID="confirm-pin-form"
    />
  );
};

export default ConfirmPin;
