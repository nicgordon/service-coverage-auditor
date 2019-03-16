import { applyMiddleware, createStore } from 'redux';

import auditor from './middleware/auditor';
import reducers from './reducers';

export default createStore(reducers, applyMiddleware(auditor));
