import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';

import Profiles from '/screen/Profiles/Profiles';
import OnboardingCaregiver from '/screen/Onboarding/Caregiver';
import OnboardingEnterInfo from '/screen/Onboarding/EnterInfo';
import AddPhoneNumber from '/screen/Settings/AddPhoneNumber';
import EnterCurrentPin from '/screen/Settings/ChangeYourPin/EnterCurrentPin';
import CreateNewPin from '/screen/Settings/ChangeYourPin/CreateNewPin/CreateNewPin';
import ConfirmNewPin from '/screen/Settings/ChangeYourPin/ConfirmNewPin';
import AddEmail from '/screen/Settings/AddEmail';
import HelpDesk from '/screen/Settings/HelpDesk';
import InviteSomeone from '/screen/Settings/InviteSomeone';
import Settings from '/screen/Settings/Settings';
import ManageProfile from '/screen/ManageProfile';
import CareTeamContacts from '/screen/CareTeamContacts';
import CareTeamConfirm from '/screen/CareTeamConfirm';
import { Acknowledgements, TermsOfUse, PrivacyPolicy } from '/screen/TermsOfUse';
import SettingsVerify from '/screen/Settings/SettingsVerify';

import screens from '/screen';

export default createStackNavigator(
  {
    [screens.Profiles]: Profiles,
    [screens.CreateNewProfile]: {
      screen: OnboardingCaregiver,
      params: { fromProfileStack: true },
    },
    [screens.NewProfilePersonalDetails]: {
      screen: OnboardingEnterInfo,
      params: { fromProfileStack: true },
    },
    [screens.ChangeYourPinEnterCurrent]: EnterCurrentPin,
    [screens.ChangeYourPinCreateNew]: CreateNewPin,
    [screens.ChangeYourPinConfirmNew]: ConfirmNewPin,
    [screens.SettingHelpDesk]: HelpDesk,
    [screens.SettingsAddPhoneNumber]: AddPhoneNumber,
    [screens.SettingsAddEmail]: AddEmail,
    [screens.SettingsAcknowledgements]: Acknowledgements,
    [screens.SettingsInviteSomeone]: InviteSomeone,
    [screens.SettingsPrivacyPolicy]: PrivacyPolicy,
    [screens.SettingsTermsOfUse]: TermsOfUse,
    [screens.SettingsVerify]: SettingsVerify,
    [screens.Settings]: Settings,
    [screens.ManageProfile]: ManageProfile,
    [screens.CareTeamContacts]: CareTeamContacts,
    [screens.CareTeamConfirm]: CareTeamConfirm,
  },
  {
    initialRouteName: screens.Profiles,
    defaultNavigationOptions: BasicHeader,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
