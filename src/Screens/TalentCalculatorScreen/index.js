import React, {useState, useEffect} from 'react';

import './talentCalculatorScreen.scss';

import TalentTreeGroup from './components/TalentTreeGroup';
import TalentCounter from './components/TalentCounter';

const TalentCalculatorScreen = () => {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <main className="container">
      <div className="calculator">
        <h1>TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h1>

        {windowSize.width <= 1062 && (
          <div className="talent-counter-container">
            <TalentCounter />
          </div>
        )}

        <div className="talent-group-container">
          <TalentTreeGroup />
        </div>

        {windowSize.width > 1062 && (
          <div className="talent-counter-container">
            <TalentCounter />
          </div>
        )}
      </div>
    </main>
  );
};

export default TalentCalculatorScreen;
