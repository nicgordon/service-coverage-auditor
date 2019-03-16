import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Location } from 'expo';

import { ACTION_TYPE } from '../../constants';
import auditActions from '../actions/audit';
import database from '../../database';
import delay from '../../utils/delay';
import getDeviceInfo from '../../utils/get-device-info';

let isAuditing = false;
let locationSubscription;

function stopAudit() {
  isAuditing = false;
  if (_.isFunction(_.get(locationSubscription, 'remove'))) {
    locationSubscription.remove();
  }
}

async function audit({ actions, auditRecord, getState, pingEndpoint }) {
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

    // Store the ping in state so we can display it to the user
    actions.audit.setLastPing(time);

    const state = getState();
    const location = _.get(state, 'audit.location');

    await database.createPing({
      auditId: auditRecord.id,
      createdAt: new Date().toISOString(),
      result: _.get(pingResult, 'status') === 200 ? time : 0, // @TODO: This kinda sucks, think about a better schema
      latitude: _.get(location, 'latitude'),
      longitude: _.get(location, 'longitude'),
      locationAccuracy: _.get(location, 'accuracy'),
    });

    // Recursively call this function, after a 5sec delay
    await delay(5000);
    audit({ actions, auditRecord, getState, pingEndpoint });
  } catch (error) {
    console.error(error);
    stopAudit();
    actions.audit.stopAudit();
  }
}

async function startAudit({ actions, getState, pingEndpoint }) {
  let auditRecord;
  try {
    auditRecord = await database.createAudit({
      device: getDeviceInfo(),
      endpoint: pingEndpoint,
      network: '', // @TODO: Use https://github.com/ianlin/react-native-carrier-info for carrier name
      startedAt: new Date().toISOString(),
    });
    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1,
      },
      locationUpdate => {
        actions.audit.setLocation(_.get(locationUpdate, 'coords'));
      },
    );
  } catch (error) {
    console.error(error);
    stopAudit();
    actions.audit.stopAudit();
  }
  audit({ actions, auditRecord, getState, pingEndpoint });
}

const auditor = store => next => action => {
  if (action.type === ACTION_TYPE.AUDIT_START) {
    isAuditing = true;
    const state = store.getState();
    startAudit({
      actions: { audit: bindActionCreators(auditActions, store.dispatch) },
      getState: store.getState,
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
