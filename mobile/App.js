import React from 'react';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import store from './src/redux/redux-store';
import Routes from './src/routes';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="top" />
    </Provider>
  );
};
export default App;
