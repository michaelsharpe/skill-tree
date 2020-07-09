import React from 'react';
import {connect} from 'react-redux';
import {
  selectUnlockedTalents,
  selectCounterTotal,
} from '../../../store/selectors';

export const TalentCounter = ({current, total}) => {
  return (
    <div>
      <h1>Points Spent</h1>
      <p>
        <span cy-test="counter">{current}</span>/
        <span cy-test="total">{total}</span>
      </p>
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
