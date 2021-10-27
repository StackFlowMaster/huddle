import keys from 'lodash/keys';
import { itemsSelector } from '/state/items/items.selectors';
import addActivity from './addActivity';
import activityTypes from '/constants/activityTypes';

export default (newItem) => (dispatch, getState) => {
  const items = itemsSelector(getState());

  const itemTypes = {
    [newItem.custom.type]: true,
  };

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const sameItem = item.docUniqueName === newItem.docUniqueName;
    const sameType = item.custom.type === newItem.custom.type;

    // If an item already exists of this type we definitely didn't just add our
    // third item type - cause an item already existed of this type!
    if (!sameItem && sameType) {
      return;
    }

    itemTypes[item.custom.type] = true;
  }

  // If we have 3 different types of items, fire off the event
  // Note: the above for loop will bail out if there was previously
  // an item of the same type as the item we are checking
  if (keys(itemTypes).length === 3) {
    dispatch(addActivity({
      description: 'You\'ve added three different types of items!',
      custom: {},
      eventType: activityTypes.docAddThreeTypes,
    }));
  }
};
