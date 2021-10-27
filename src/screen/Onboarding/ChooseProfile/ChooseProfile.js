import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import DarkModalHeader from '/navigation/header/DarkModalHeader';
import Text from '/component/Text';
import ProfileItem from './ProfileItem';
import CreateProfileButton from '/screen/Profiles/CreateProfileButton';
import { actions as profilesActions } from '/state/profiles';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as events from '/constants/events/Onboarding/onboardingCompleted';
import onboardingStyles from '/screen/Onboarding/Onboarding.styles';
import styles from './ChooseProfile.styles';
import selector from './ChooseProfile.selector';
import onboardingHelper from '/util/onboardingHelper';
import onboardingFlows from '/constants/onboardingFlows';

import { UseLightStatusBar } from '/util/statusBar';

import screens from '/screen';

const ChooseProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profiles, masterProfile } = useSelector(selector);


  const subtitle = profiles.length === 1
    ? 'Let\'s get started'
    : 'Which profile would you like to view?';

  const handleProfilePress = (profile) => () => {
    dispatch(profilesActions.setActiveProfile(profile.profileCode));

    if (profile.profileCode === masterProfile.profileCode) {
      dispatch(mixpanelActions.trackEvent(events.CLICK_SELF));
    } else {
      dispatch(mixpanelActions.trackEvent(events.CLICK_OTHER));
    }

    onboardingHelper.dismiss(navigation);
  };

  const handleCreateProfilePress = () => {
    onboardingHelper.changeFlow(navigation, onboardingFlows.addExtraProfile);
    navigation.push(screens.OnboardingCaregiver);
  };

  return (
    <View
      style={[onboardingStyles.content, styles.wrapper]}
      testID="choose-profile-form"
    >
      <UseLightStatusBar />
      <DarkModalHeader hideIcon />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text.H2 color="white">
          Welcome to Huddle, {masterProfile.firstName}.
        </Text.H2>

        <Text.H4 style={styles.subtitle} color="white">
          {subtitle}
        </Text.H4>

        {profiles.map((profile) => (
          <ProfileItem
            profile={profile}
            key={profile.profileCode}
            style={styles.profileItem}
            onPress={handleProfilePress(profile)}
          />
        ))}
        <CreateProfileButton onPress={handleCreateProfilePress} />
      </ScrollView>
    </View>
  );
};

ChooseProfile.navigationOptions = {
  header: null,
};

export default ChooseProfile;
