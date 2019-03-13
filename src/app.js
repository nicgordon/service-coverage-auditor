import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import React from 'react';

import HomeScreen from './screens/home';
import NewAuditScreen from './screens/new-audit';
import store from './state/store';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  NewAudit: { screen: NewAuditScreen },
});

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
