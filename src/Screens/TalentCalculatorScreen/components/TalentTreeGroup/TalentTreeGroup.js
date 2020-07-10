import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import './talentTreeGroup.scss';

import {
  selectAllTalentTrees,
  selectUnlockedTalents,
  selectCounterTotal,
} from 'Store/selectors';

import TalentTree from '../TalentTree';
import {
  loadTalentTrees,
  updateTalent,
} from 'Store/talentCalculator/talentCalculator.actions';

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
