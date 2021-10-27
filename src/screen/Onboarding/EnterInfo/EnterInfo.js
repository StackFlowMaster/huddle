import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import { object } from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import Alert from '/overlay/Alert';
import Button from '/component/Button';
import DateInput from '/component/DateInput';
import Text from '/component/Text';
import TextInput from '/component/TextInput';

import screens from '/screen';
import { format, validations } from '/util';
import { actions, selectors } from '/state/onboarding';
import { actions as mixpanelActions, selectors as mixpanelSelectors } from '/state/mixpanel';
import * as events from '/constants/events/Onboarding/selfPersonalDetails';
import api from '/api';
import { REQUIRED_LABEL } from '/constants/config';
import onboardingFlows from '/constants/onboardingFlows';

import showBiometrics from '/navigation/helpers/showBiometrics';

import onboardingStyles from '/screen/Onboarding/Onboarding.styles';
import styles from './EnterInfo.styles';

const initialValues = {
  firstName: '',
  lastName: '',
  dob: '',
};

const validationSchema = object().shape({
  firstName: validations.string.required(REQUIRED_LABEL),
  lastName: validations.string.required(REQUIRED_LABEL),
  dob: validations.date.required(REQUIRED_LABEL),
});

const formatData = (values, loginIdentity = {}) => ({
  ...loginIdentity,
  ...values,
  dob: format.appDateToAPIDate(values.dob),
  custom: loginIdentity,
});

const registrationTypes = {
  invite: 'invite-careteam',
  organic: 'organic',
};

const EnterInfo = React.memo(({ navigation }) => {
  const dispatch = useDispatch();
  const loginIdentity = useSelector(selectors.loginIdentityObjectSelector);
  const flow = useSelector(selectors.flowSelector);
  const masterSuggestionData = useSelector(selectors.suggestionDataSelector);
  const referrer = useSelector(mixpanelSelectors.makeSelectMixpanelReferrer);

  const dependentType = navigation.getParam('dependentType');

  const dateRef = useRef();
  const lastNameRef = useRef();

  const trackRegistration = (type) => {
    const event = type === registrationTypes.invite
      ? events.ACCOUNT_CREATED_INVITE
      : events.ACCOUNT_CREATED;

    dispatch(mixpanelActions.trackEvent(event));

    if (!referrer) {
      dispatch(mixpanelActions.setUserPropOnce({ referrer: type }));
      dispatch(mixpanelActions.setGroup('referrer', type));
    }
  };

  // This will create a new account for the current user
  const createUser = async (values, formActions) => {
    const data = formatData(values, loginIdentity);

    // link CareGiver profile to master profile for Link import Health Summary items
    if (masterSuggestionData && masterSuggestionData.suggestionUniqueName) {
      data.suggestionUniqueName = masterSuggestionData.suggestionUniqueName;
    }

    try {
      await dispatch(actions.register(data));
      if (flow === onboardingFlows.careTeamInvite) {
        trackRegistration(registrationTypes.invite);
        showBiometrics(navigation, true);
      } else {
        trackRegistration(registrationTypes.organic);
        navigation.push(screens.OnboardingCaregiver);
      }
    } catch (e) {
      if (e.message.match(/birthday|dob/i)) {
        formActions.setFieldError('dob', api.userMessages.date.invalid);
      } else {
        Alert.error(api.userMessages.regist.failed);
      }
    }
  };

  // This will create somebody that the current user will care for
  const addProfile = async (values, formActions) => {
    const data = formatData(values);

    const fromProfileStack = navigation.getParam('fromProfileStack');
    const isAddExtraProfileFlow = flow === onboardingFlows.addExtraProfile;
    const addingAdditionalProfile = isAddExtraProfileFlow || fromProfileStack;

    try {
      await dispatch(actions.registerProfile(data, dependentType));

      // If we are adding an additional profile we want to go back to where we were
      // before we initiated adding an extra profile. Otherwise we are adding the
      // new profile during the onboarding flow "Would you like to add anybody else,"
      if (addingAdditionalProfile) {
        navigation.pop(2);
      } else {
        showBiometrics(navigation, true);
      }
    } catch (e) {
      if (e.status === api.errorCodes.INVALID_DATE) {
        formActions.setFieldError('dob', api.userMessages.date.invalid);
      } else {
        Alert.error(api.userMessages.registProfile.failed);
      }
    }
  };

  const handleOnSubmit = async (values, formActions) => {
    dispatch(mixpanelActions.trackEvent(events.CLICK_CONTINUE));

    if (dependentType) {
      await addProfile(values, formActions);
    } else {
      await createUser(values, formActions);
    }

    formActions.setSubmitting(false);
  };

  let title = 'We just need a few details about you';

  if (dependentType) {
    title = "We'll need a few details about them";
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({
        handleChange,
        handleSubmit: handlePress,
        isValid,
        isSubmitting,
        errors,
        values,
      }) => (
        <ScrollView
          contentContainerStyle={onboardingStyles.content}
          keyboardShouldPersistTaps="handled"
          testID="enter-info-form"
        >
          <Text.H2 style={styles.title}>{title}</Text.H2>
          <TextInput
            label="First Name"
            onChangeText={handleChange('firstName')}
            autoCapitalize="words"
            style={styles.input}
            value={values.firstName}
            errorMessage={errors.firstName}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            testID="first-name"
          />

          <TextInput
            label="Last Name"
            onChangeText={handleChange('lastName')}
            autoCapitalize="words"
            style={styles.input}
            value={values.lastName}
            errorMessage={errors.lastName}
            returnKeyType="next"
            getInputRef={(ref) => {
              lastNameRef.current = ref;
            }}
            onSubmitEditing={() => dateRef.current.focus()}
            blurOnSubmit={false}
            testID="last-name"
          />

          <DateInput
            label="Date of Birth"
            onChangeText={handleChange('dob')}
            autoCapitalize="words"
            style={styles.input}
            value={values.dob}
            errorMessage={errors.dob}
            returnKeyType="done"
            getInputRef={(ref) => {
              dateRef.current = ref;
            }}
            onSubmitEditing={() => isValid && handlePress()}
            testID="dob"
          />

          <Button
            text="Continue"
            onPress={handlePress}
            style={styles.button}
            disabled={!isValid}
            loading={isSubmitting}
            testID="enter-info-form-continue"
          />
        </ScrollView>
      )}
    </Formik>
  );
});

EnterInfo.navigationOptions = ({ navigation }) => {
  const hideBack = navigation.getParam('hideBack');

  if (hideBack) {
    return { headerLeft: null };
  }

  return null;
};

export default EnterInfo;
