import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {
  selectAllTalentTrees,
  selectUnlockedTalents,
  selectCounterTotal,
} from '../../../store/selectors';

import TalentTree from './TalentTree';
import {
  loadTalentTrees,
  updateTalent,
} from '../../../store/calculator/calculator.actions';

export const TalentTreeGroup = ({
  loadTalentTrees,
  talentTrees,
  updateTalent,
  counter,
}) => {
  useEffect(() => {
    loadTalentTrees();
  }, [loadTalentTrees]);

  return talentTrees.map(talentTree => (
    <TalentTree
      talentTree={talentTree}
      key={talentTree.id}
      updateTalent={updateTalent}
      counter={counter}
    />
  ));
};

const mapStateToProps = state => {
  return {
    talentTrees: selectAllTalentTrees(state),
    counter: {
      current: selectUnlockedTalents(state).length,
      total: selectCounterTotal(state),
    },
  };
};

const mapDispatchToProps = {loadTalentTrees, updateTalent};

export default connect(mapStateToProps, mapDispatchToProps)(TalentTreeGroup);
