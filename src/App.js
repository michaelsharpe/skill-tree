import React from 'react';
import {Provider} from 'react-redux';

import store from './Store';
import TalentCalculatorScreen from './Screens/TalentCalculatorScreen';

function App() {
  return (
    <Provider store={store}>
      <TalentCalculatorScreen />
    </Provider>
  );
}

export default App;
