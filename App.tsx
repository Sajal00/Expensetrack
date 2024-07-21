import React from 'react';
import AppNavigator from './src/AppNavigator/AppNavigator';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
