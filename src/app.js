import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/home';
import NewAuditScreen from './screens/new-audit';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  NewAudit: { screen: NewAuditScreen },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
