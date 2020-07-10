import React from 'react';
import {connect} from 'react-redux';

import './talentCounter.scss';

import {selectUnlockedTalents, selectCounterTotal} from 'Store/selectors';

export const TalentCounter = ({current, total}) => {
  return (
    <div>
      <p className="counter">
        <span cy-test="counter">{current}</span>&nbsp;/&nbsp;
        <span cy-test="total">{total}</span>
      </p>
      <h2 className="sub-header">Points Spent</h2>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    current: selectUnlockedTalents(state).length,
    total: selectCounterTotal(state),
  };
};

export default connect(mapStateToProps)(TalentCounter);
