import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

import screens from '/screen';
import VerificationCodeForm from '/partial/VerificationCodeForm';
import { selectors } from '/state/onboarding';
import { SCREEN_NAME } from '/constants/events/Onboarding/verificationCode';
import { secureStorage } from '/util';
import onboardingHelper from '/util/onboardingHelper';
import onboardingFlows from '/constants/onboardingFlows';
import api from '/api';

const Verify = ({ navigation }) => {
  const flow = useSelector(selectors.flowSelector);
  const loginIdentity = useSelector(selectors.loginIdentitySelector);
  const loginIdentityObject = useSelector(selectors.loginIdentityObjectSelector);

  let nextRoute = screens.OnboardingEnterPin;
  const nextRouteParams = {};

  if (flow === onboardingFlows.login) {
    nextRoute = screens.OnboardingPinLogin;
  }

  const onGetValidationCode = async (validationCode) => {
    secureStorage.setValidationCode(validationCode);

    // If the user is signing up check to see if they have a care team invite and if they
    // do switch them to the care team invite flow
    if (flow === onboardingFlows.signup) {
      const bundle = {
        validationCode,
        ...loginIdentityObject,
      };

      const response = await api.user.getCareInviter(bundle);
      if (get(response, 'careTeamInviterList.length')) {
        // The user was invited to a careTeam, so put them in the `careTeamInvite` flow
        onboardingHelper.changeFlow(navigation, onboardingFlows.careTeamInvite);
      }
    }
  };

  return (
    <VerificationCodeForm
      sendToAddress={loginIdentity.value}
      type={loginIdentity.type}
      onFallbackPress={() => navigation.pop()}
      getValidationCode={onGetValidationCode}
      screenName={SCREEN_NAME}
      nextRoute={nextRoute}
      nextRouteParams={nextRouteParams}
    />
  );
};

Verify.navigationOptions = {
  headerLeft: null,
};

export default Verify;
