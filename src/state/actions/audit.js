import { ACTION_TYPE } from '../../constants';

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
  setLocation,
  startAudit,
  stopAudit,
};
