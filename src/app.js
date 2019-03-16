import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import React from 'react';

import AuditHistoryScreen from './screens/audit-history';
import database from './database';
import HomeScreen from './screens/home';
import NewAuditScreen from './screens/new-audit';
import store from './state/store';

const AppNavigator = createStackNavigator(
  {
    AuditHistory: { screen: AuditHistoryScreen },
    Home: { screen: HomeScreen },
    NewAudit: { screen: NewAuditScreen },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

database.prepare();

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
