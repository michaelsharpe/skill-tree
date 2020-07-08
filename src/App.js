import React from 'react';
import {Provider} from 'react-redux';

import store from './store';
import TalentScreen from './screens/CalculatorScreen';

function App() {
  return (
    <Provider store={store}>
      <TalentScreen />
    </Provider>
  );
}

export default App;
