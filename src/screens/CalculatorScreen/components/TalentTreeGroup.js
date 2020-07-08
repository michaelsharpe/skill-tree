import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {selectTalentTree} from '../../../store/selectors';

import TalentTree from './TalentTree';
import {loadTalentTrees} from '../../../store/calculator/calculator.actions';

export const TalentTreeGroup = ({loadTalentTrees, talentTrees}) => {
  useEffect(() => {
    loadTalentTrees();
  }, [loadTalentTrees]);

  return talentTrees.map(talentTree => (
    <TalentTree talentTree={talentTree} key={talentTree.id} />
  ));
};

const mapStateToProps = state => {
  return {
    talentTrees: Object.values(state.calculator.talentTrees).map(tree =>
      selectTalentTree(state.calculator, tree.id),
    ),
  };
};

const mapDispatchToProps = {loadTalentTrees};

export default connect(mapStateToProps, mapDispatchToProps)(TalentTreeGroup);
