import * as React from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import screens from '/screen';
import Text from '/component/Text';
import ListItem from '/component/ListItem';
import Button from '/component/Button';
import showBiometrics from '/navigation/helpers/showBiometrics';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import * as events from '/constants/events/Onboarding/takeCareOfAnyoneElse';
import { actions, selectors } from '/state/onboarding';
import onboardingFlows from '/constants/onboardingFlows';
import { store } from '/state/store';

import styles from './Caregiver.styles';

const Caregiver = ({ navigation }) => {
  const dispatch = useDispatch();
  const flow = useSelector(selectors.flowSelector);
  const fromProfileStack = navigation.getParam('fromProfileStack');
  const suggestionData = useSelector(selectors.suggestionDataSelector);

  const isAddExtraProfileFlow = flow === onboardingFlows.addExtraProfile;

  const addingAdditionalProfile = isAddExtraProfileFlow || fromProfileStack;

  const handleAction = (dependentType) => async () => {
    switch (dependentType) {
      case 'partner':
        dispatch(trackEvent(events.CLICK_SPOUSE_PARTNER));
        break;

      case 'parent':
        dispatch(trackEvent(events.CLICK_PARENT));
        break;

      case 'child':
        dispatch(trackEvent(events.CLICK_CHILD));
        break;

      case 'other':
        dispatch(trackEvent(events.CLICK_SOMEONE_ELSE));
        break;

      default:
        return;
    }

    if (fromProfileStack) {
      navigation.push(screens.NewProfilePersonalDetails, { dependentType });
    } else if (flow === onboardingFlows.linkSignup && !isEmpty(suggestionData)) {
      try {
        // If we are registering as a caregiver we will be able to automatically
        // create our new profile with the suggestion data
        await dispatch(actions.registerProfile(suggestionData, dependentType));
        showBiometrics(navigation, true);
      } catch (e) {
        // if there is an error, take the user to the form to manually enter info
        // we don't need to explicitly do this navigation, it will happen down below
      }
    } else {
      navigation.push(screens.OnboardingEnterInfo, { dependentType });
    }
  };

  const handleSoloProfilePress = () => {
    dispatch(trackEvent(events.CLICK_JUST_ME));
    if (addingAdditionalProfile) {
      navigation.pop();
    } else {
      showBiometrics(navigation, true);
    }
  };

  let title = 'Can we help you take care of anyone else?';

  if (addingAdditionalProfile) {
    title = 'What is your relationship to this person?';
  }

  if (!isEmpty(suggestionData)) {
    title = `What is your relationship to ${suggestionData.firstName}?`;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      testID="onboarding-caregiver-form"
    >
      <Text.H2 style={[styles.padded, styles.title]}>{title}</Text.H2>

      <ListItem
        icon="RelationshipCouple"
        label="Spouse/Partner"
        onPress={handleAction('partner')}
      />
      <ListItem icon="RelationshipParent" label="Parent" onPress={handleAction('parent')} />
      <ListItem icon="RelationshipChild" label="Child" onPress={handleAction('child')} />
      <ListItem icon="RelationshipOther" label="Someone else" onPress={handleAction('other')} />

      {!addingAdditionalProfile && isEmpty(suggestionData) && (
        <Button
          text="No thanks, just me"
          onPress={handleSoloProfilePress}
          style={[styles.padded, styles.button]}
          type="ghost"
          testID="caregiver-just-me"
        />
      )}

      <Text.BodySmall style={styles.note} color="medium">
        By continuing you certify that you are the parent, legal guardian, or personal
        representative of this patient and have all authority required by state and federal law to
        access this information.
      </Text.BodySmall>
    </ScrollView>
  );
};

Caregiver.navigationOptions = ({ navigation }) => {
  const { flow } = store.getState().onboarding;
  const fromProfileStack = navigation.getParam('fromProfileStack');

  if (!(fromProfileStack || flow === onboardingFlows.addExtraProfile)) {
    return {
      headerLeft: null,
    };
  }

  return null;
};

export default Caregiver;
