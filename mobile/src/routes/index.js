import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/login';
import Main from '../screens/main';
import Routes from '../res/contants';
import CreateStore from '../screens/create-store';
import Details from '../screens/details';

const credentialStack = createStackNavigator(
  {
    [Routes.ROUTE_LOGIN]: { screen: Login },
    [Routes.ROUTE_MAIN]: { screen: Main },
    [Routes.ROUTE_CREATESTORE]: { screen: CreateStore },
    [Routes.ROUTE_DETAILS]: { screen: Details },
  },
  {
    initialRouteName: Routes.ROUTE_LOGIN,
    defaultNavigationOptions: {
      header: () => null,
    },
  }
);

export default createAppContainer(credentialStack);
