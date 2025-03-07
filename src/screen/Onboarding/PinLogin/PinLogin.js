import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Text from '/component/Text';
import PinForm from '/partial/PinForm';
import Alert from '/overlay/Alert';
import FullScreenSpinner from '/partial/FullScreenSpinner';
import { selectors as onboardingSelectors, actions } from '/state/onboarding';
import { actions as authActions } from '/state/auth';
import { selectors as profileSelectors } from '/state/profiles';
import api from '/api';
import ConfirmDialog from '/overlay/ConfirmDialog';

import { actions as mixpanelActions } from '/state/mixpanel';
import { actions as overlayActions } from '/state/overlays';
import * as enterPinEvents from '/constants/events/Login/enterPin';

import screens from '/screen';
import { format } from '/util';
import onboardingHelper from '/util/onboardingHelper';
import onboardingFlows from '/constants/onboardingFlows';
import offlineMode, { login as offlineLogin } from '/util/offlineMode';

const PinLogin = ({ navigation }) => {
  const dispatch = useDispatch();

  const loginIdentity = useSelector(onboardingSelectors.loginIdentitySelector);
  const hasLoginIdentity = !!(loginIdentity.type && loginIdentity.value);
  const currentProfile = useSelector(profileSelectors.currentProfileCodeSelector);

  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCtaPress = () => {
    if (offlineMode.isOffline) {
      Alert.error(api.userMessages.offline.needConnection);
      return;
    }

    dispatch(mixpanelActions.trackEvent(enterPinEvents.CLICK_FORGOT));
    onboardingHelper.changeFlow(navigation, onboardingFlows.resetPin);
    // The user needs a fresh validationCode when they reset their pin code, so make
    // sure that they have gotten a new one during this session by checking if they
    // have enteterd their email/phone number.
    // If we don't have their loginIdentity, get them to verify their phone/email
    if (hasLoginIdentity) {
      navigation.push(screens.OnboardingEnterPin);
    } else {
      navigation.push(screens.OnboardingEnterPhone);
    }
  };

  const handleLogin = async (value) => {
    setVisible(true);
    dispatch(actions.login(format.encryptPinCode(value)))
      .then(() => {
        dispatch(mixpanelActions.trackEvent(enterPinEvents.ENTERED));
        setSuccess(true);

        setTimeout(() => {
          if (!currentProfile) {
            navigation.push(screens.OnboardingChooseProfile);
          } else {
            onboardingHelper.dismiss(navigation);
          }
        }, 750);
      })
      .catch(async (e) => {
        setVisible(false);
        const tooManyTries = e.status === api.errorCodes.LOGIN_TOO_MANY_ATTEMPTS;
        const tokenExpired = e.status === api.errorCodes.TOKEN_EXPIRED;
        const invalidPin = e.status === api.errorCodes.INVALID_PIN;

        if (tooManyTries) {
          dispatch(overlayActions.showOverlay(ConfirmDialog, {
            title: api.userMessages.login.tooManyTries.title,
            description: api.userMessages.login.tooManyTries.description,
            confirmButtonTitle: 'Reset Pin',
            onPress: handleCtaPress,
          }));
        } else if (invalidPin) {
          Alert.error(api.userMessages.pin.invalidPin);
        } else {
          // In all other cases we want to log the user out and get them to do a fresh login.
          // This happens when the JWT or validationCode2 tokens we have stored in local
          // storage are either expired or invalid. An invalid login will most likely represent
          // a dev-only error when we are switching API endpoints without logging out.

          // TODO toadums there are a couple ways to clean this up:
          // 1) The API could provide us a way to check the expiry of these tokens and we could
          //    avoid showing a user the pin login/biometrics if their tokens are expired
          // 2) We could get the user to validate their phone/email after they get this error,
          //    but that would lead to really confusing logic and may not handle every case

          // The generic error is likely a dev error of switching APIs (dev <-> QA <-> prod)
          // without first logging out.
          let { error } = api.userMessages.login;

          // This is hopefully the only error a real user will ever see
          if (tokenExpired) {
            error = api.userMessages.login.expiredSession;
          }

          await dispatch(authActions.logout());
          navigation.replace(screens.Onboarding);
          Alert.error(error);
        }
      });
  };

  const handleOfflineLogin = async (pinCode) => {
    offlineLogin(pinCode, () => {
      onboardingHelper.dismiss(navigation);
    });
  };

  const handleSubmit = async (value) => {
    if (!offlineMode.isOffline) {
      handleLogin(value);
    } else {
      handleOfflineLogin(value);
    }
  };

  return (
    <>
      <PinForm
        title={(
          <Text.Plain>
            Welcome back,
            {'\n'}
            Enter your secure pin
          </Text.Plain>
        )}
        onSubmit={handleSubmit}
        ctaText="I’ve forgotten my secure pin"
        ctaPress={handleCtaPress}
        blurOnSubmit
      />
      <FullScreenSpinner visible={visible} success={success} />
    </>
  );
};

PinLogin.navigationOptions = {
  headerLeft: null,
};

export default PinLogin;
