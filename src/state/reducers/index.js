import { combineReducers } from 'redux';

import auditReducer from './audit';
import settingsReducer from './settings';

export default combineReducers({
  audit: auditReducer,
  settings: settingsReducer,
});
