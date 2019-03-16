import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Location } from 'expo';

import { ACTION_TYPE } from '../../constants';
import auditActions from '../actions/audit';
import delay from '../../utils/delay';

let isAuditing = false;
let locationSubscription;

function stopAudit() {
  isAuditing = false;
  if (_.isFunction(_.get(locationSubscription, 'remove'))) {
    locationSubscription.remove();
  }
}

async function audit({ actions, pingEndpoint }) {
  if (!isAuditing) {
    return;
  }

  try {
    const start = new Date();
    const pingResult = await global.fetch(pingEndpoint, { method: 'HEAD' });

    // Ignore the last ping if the audit was cancelled
    if (!isAuditing) {
      return;
    }

    const end = new Date();
    const time = end - start;
    console.log(`Result: ${_.get(pingResult, 'ok')}`, `Status: ${_.get(pingResult, 'status')}`, `Time: ${time}ms.`);
    actions.audit.setLastPing(time);
    // @TODO: Store the result in the database

    // Recursively call this function, after a 5sec delay
    await delay(5000);
    audit({ actions, pingEndpoint });
  } catch (error) {
    console.error(error);
    stopAudit();
    actions.audit.stopAudit();
  }
}

async function startAudit({ actions, pingEndpoint }) {
  try {
    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1,
      },
      location => {
        actions.audit.setLocation(_.get(location, 'coords'));
      },
    );
  } catch (error) {
    console.error(error);
  }
  audit({ actions, pingEndpoint });
}

const auditor = store => next => action => {
  if (action.type === ACTION_TYPE.AUDIT_START) {
    isAuditing = true;
    const state = store.getState();
    startAudit({
      actions: {
        audit: bindActionCreators(auditActions, store.dispatch),
      },
      pingEndpoint: _.get(state, 'settings.pingEndpoint'),
    });
  }

  if (action.type === ACTION_TYPE.AUDIT_STOP) {
    isAuditing = false;
    stopAudit();
  }

  return next(action);
};

export default auditor;
