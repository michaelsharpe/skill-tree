import React from 'react';

import './calculatorScreen.scss';

import TalentTreeGroup from './components/TalentTreeGroup';
import TalentCounter from './components/TalentCounter';

const TalentScreen = () => (
  <main className="container">
    <div className="calculator">
      <h1>TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h1>

      <div className="talent-group-container">
        <TalentTreeGroup />
      </div>

      <div className="talent-counter-container">
        <TalentCounter />
      </div>
    </div>
  </main>
);

export default TalentScreen;
