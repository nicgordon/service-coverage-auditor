import _ from 'lodash';

import { ACTION_TYPE } from '../../constants';

const INITIAL_STATE = {
  isRunning: false,
  lastPing: null,
  location: null,
};

const auditReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.AUDIT_START:
      return {
        ...state,
        isRunning: true,
      };

    case ACTION_TYPE.AUDIT_STOP:
      return {
        ...state,
        isRunning: false,
        lastPing: null,
      };

    case ACTION_TYPE.LAST_PING_SET:
      return {
        ...state,
        lastPing: action.lastPing,
      };

    case ACTION_TYPE.LOCATION_SET:
      return {
        ...state,
        location: _.pick(action, ['accuracy', 'latitude', 'longitude']),
      };

    default:
      return state;
  }
};

export default auditReducer;
