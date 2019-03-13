import { ACTION_TYPE } from '../../constants';

const INITIAL_STATE = {
  isRunning: false,
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
      };

    default:
      return state;
  }
};

export default auditReducer;
