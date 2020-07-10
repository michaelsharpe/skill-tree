import React from 'react';
import {Provider} from 'react-redux';

import store from './Store';
import TalentScreen from './Screens/CalculatorScreen';

function App() {
  return (
    <Provider store={store}>
      <TalentScreen />
    </Provider>
  );
}

export default App;
