import api from '/api';
import * as types from '../activity.types';

export default (data) => async (dispatch, getState) => {
  const profileCode = getState().profiles.activeProfileCode;

  await api.user.addActivity(data, profileCode);

  const activity = {
    ...data,
    createTimestamp: (new Date()).toISOString(),
  };

  dispatch({
    type: types.ADD_ACTIVITY,
    payload: {
      activity,
    },
  });
};
