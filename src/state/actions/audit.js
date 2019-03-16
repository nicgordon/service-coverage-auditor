import { ACTION_TYPE } from '../../constants';

const setLastPing = lastPing => ({
  lastPing,
  type: ACTION_TYPE.LAST_PING_SET,
});

const setLocation = ({ accuracy, latitude, longitude }) => ({
  accuracy,
  latitude,
  longitude,
  type: ACTION_TYPE.LOCATION_SET,
});

const startAudit = () => ({
  type: ACTION_TYPE.AUDIT_START,
});

const stopAudit = () => ({
  type: ACTION_TYPE.AUDIT_STOP,
});

export default {
  setLastPing,
  setLocation,
  startAudit,
  stopAudit,
};
