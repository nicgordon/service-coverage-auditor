import { ACTION_TYPE } from '../../constants';

const startAudit = () => ({
  type: ACTION_TYPE.AUDIT_START,
});

const stopAudit = () => ({
  type: ACTION_TYPE.AUDIT_STOP,
});

export default {
  startAudit,
  stopAudit,
};
