/**
 * Given an activity item from the API, figure out which icon and text we
 * want to render.
 */
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import values from 'lodash/values';

import BaseIcon from '/component/Icon';
import DetailedIcon from '/component/DetailedIcon';
import Avatar from '/component/Avatar';
import { styles as listItemStyles } from '/component/ListItem';

import { selectors as profilesSelectors } from '/state/profiles';
import { selectors as foldersSelectors } from '/state/folders';
import { selectors as itemsSelectors } from '/state/items';
import { selectors as authSelectors } from '/state/auth';
import { pluralizeName, itemsHelper } from '/util';

import styles from './ActivityListItem.styles';
import activityTypes from '/constants/activityTypes';

const Preview = ({ children, hideBackground }) => {
  const iconStyle = [
    listItemStyles.iconWrapper,
    listItemStyles.iconWrapperSquare,
    hideBackground && styles.iconHideBackground,
  ];

  return (
    <View style={iconStyle}>
      {children}
    </View>
  );
};

const ActivityIcon = ({ item }) => {
  const icon = itemsHelper.getItemIcon(item);
  const IconComponent = DetailedIcon[icon];
  return (
    <Preview>
      <IconComponent />
    </Preview>
  );
};

const ActivityAvatar = ({ profile }) => {
  if (profile) {
    return (
      <Preview hideBackground>
        <Avatar profile={profile} />
      </Preview>
    );
  }

  return (
    <Preview>
      <DetailedIcon.Demographic />
    </Preview>
  );
};

export default (activity) => {
  const activeProfile = useSelector(profilesSelectors.activeProfileSelector);

  const userIdentifier = useSelector(authSelectors.userIdentifierSelector);

  const masterProfile = useSelector(profilesSelectors.masterProfileSelector);
  const profiles = useSelector(profilesSelectors.profilesSelector);
  const masterProfileName = `${masterProfile.firstName} ${masterProfile.lastName}`;

  const items = useSelector(itemsSelectors.itemsHashSelector);
  const folderHash = useSelector(foldersSelectors.allFoldersSelector);

  const itemId = get(activity, 'custom.itemNameIdentifier');
  const item = items[itemId];
  const { accountName, itemName, profileName } = activity.custom;

  const fromCurrentUser = masterProfileName === accountName;

  const fromName = fromCurrentUser ? 'You' : `${accountName}`;

  if (activity.eventType === activityTypes.accountCreated) {
    if (fromCurrentUser || 1) {
      console.log(masterProfile, activity);
      return {
        icon: <ActivityAvatar profile={activeProfile} />,
        text: 'You registered for Huddle!',
      };
    }
    return null;
  }

  if (activity.eventType === activityTypes.docCreated) {
    return {
      icon: <ActivityIcon item={item} />,
      text: `${accountName} created ${itemName}`,
    };
  }

  if (activity.eventType === activityTypes.docCount) {
    return {
      icon: <ActivityIcon item={item} />,
      text: `You added the first item for ${profileName}!`,
    };
  }

  if (activity.eventType === activityTypes.careTeamInvite) {
    const target = masterProfileName === profileName
      ? 'your'
      : pluralizeName(profileName);

    const currentUserInvited = activity.custom.accountNameIdentifierBeInvited === userIdentifier;

    const invitedTarget = currentUserInvited
      ? 'you'
      : 'a new caregiver';

    return {
      icon: (
        <Preview>
          <DetailedIcon.Demographic />
        </Preview>
      ),
      text: `${fromName} added ${invitedTarget} to ${target} profile`,
    };
  }

  if (activity.eventType === activityTypes.careTeamAdded) {
    const profile = profiles[activity.custom.profileNameIdentifier];

    const profileText = accountName === profileName
      ? 'their profile'
      : `the profile of ${profileName}`;

    return {
      icon: <ActivityAvatar profile={profile} />,
      text: `${accountName} shared ${profileText} with you`,
    };
  }

  if (activity.eventType === activityTypes.docUpdate) {
    return {
      icon: <ActivityIcon item={item} />,
      text: `${fromName} updated ${itemName}`,
    };
  }

  if (activity.eventType === activityTypes.careTeamAccept) {
    const profile = pluralizeName(profileName);

    return {
      icon: (
        <Preview>
          <DetailedIcon.Demographic />
        </Preview>
      ),
      text: `${fromName} accepted the invite to ${profile} profile`,
    };
  }

  if (activity.eventType === activityTypes.sharingCreate) {
    const sharedFolder = folderHash[itemId];
    let sharedItem;

    if (!sharedFolder) {
      sharedItem = values(items).find((masterItem) => masterItem.folderUniqueName === itemId);
    }

    if (sharedFolder) {
      return {
        icon: (
          <Preview>
            <BaseIcon name="link" />
          </Preview>
        ),
        text: `${accountName} created a shared link for ${sharedFolder.displayName}`,
      };
    }

    if (sharedItem) {
      return {
        icon: <ActivityIcon item={sharedItem} />,
        text: `${accountName} created a shared link for ${sharedItem.displayName}`,
      };
    }

    return null;
  }

  if (activity.eventType === activityTypes.sharingGet) {
    const sharedFolder = folderHash[itemId];
    let text;
    let sharedItem;

    if (sharedFolder) {
      text = `folder ${sharedFolder.displayName}`;
    } else {
      sharedItem = values(items).find((masterItem) => masterItem.folderUniqueName === itemId);
      if (sharedItem) {
        text = `item ${sharedItem.displayName}`;
      }
    }

    if (!text) {
      return null;
    }

    return {
      icon: (
        <Preview>
          <BaseIcon name="link" />
        </Preview>
      ),
      text: `Someone viewed the shared ${text}`,
    };
  }

  if (activity.eventType === activityTypes.linkImport) {
    return {
      icon: (
        <Preview>
          <DetailedIcon.Medication />
        </Preview>
      ),
      text: 'Medications were imported for you',
    };
  }


  if (activity.eventType === activityTypes.docAddThreeTypes) {
    return {
      icon: (
        <Preview>
          <BaseIcon name="star" />
        </Preview>
      ),
      text: 'You added three different types of items!',
    };
  }

  return null;
};
